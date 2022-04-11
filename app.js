console.log("Started server")

//------biblioteki
const mysql = require("mysql")
const express = require("express")

//-------app
const app = express()
app.use(express.static("public"))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

//--------port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening at port ${port}`))

//-------połączenie z bazą danych
let poolBase = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "ioio",
})

//-------wyslanie loginów
app.get("/api/logins", (req, res) => {
    console.log("Got a login request.")
    poolBase.query("SELECT id_operatora, imie_operatora, nazwisko_operatora from operatorzy", function (err, rows) {
        if (err) throw err
        // console.log(rows)
        res.send(rows)
        return
    })
})
//-------wyslanie info o kotach i psach
app.get("/api/cats", (req, res) => {
    console.log("Got a cats request.")
    poolBase.query(
        `SELECT "Kot" Zwierze, count(id_wezwania) "Ilość wezwań" from wezwania WHERE id_kategorii = 5 || id_kategorii = 13 group by (Zwierze) UNION SELECT "Pies" Zwierze, count(id_wezwania) from wezwania WHERE id_kategorii = 19 || id_kategorii = 14 group by (Zwierze)`,
        function (err, rows) {
            if (err) throw err
            // console.log(rows)
            res.send(rows)
            return
        }
    )
})
//-------wyslanie info o kategoriach
app.get("/api/categories", (req, res) => {
    console.log("Got a kategorie request.")
    poolBase.query(
        `select Kategorie_wezwania.nazwa_kategorii "Nazwa Kategorii",count(Wezwania.id_wezwania) as "Ilość wezwań" 
        FROM wezwania RIGHT JOIN Kategorie_wezwania ON Kategorie_wezwania.id_kategorii=wezwania.id_kategorii GROUP BY nazwa_kategorii `,
        function (err, rows) {
            if (err) throw err
            // console.log(rows)
            res.send(rows)
            return
        }
    )
})
//-------wyslanie caly personel
app.get("/api/wholepersonel", (req, res) => {
    console.log("Got a whole personel request.")
    poolBase.query(
        `SELECT concat(imie_ratownika," ",nazwisko_ratownika)as "Imie i nazwisko", nr_telefonu as "numer telefonu", "ratownik"as rola FROM Ratownicy
        UNION ALL 
        SELECT concat(imie_lekarza," ",nazwisko_lekarza), nr_telefonu, "lekarz" FROM Lekarze
        UNION ALL 
        SELECT concat(imie_operatora," ",nazwisko_operatora), nr_telefonu, "operator" FROM Operatorzy
        UNION ALL 
        SELECT concat(imie_pacjenta," ",nazwisko_pacjenta), nr_telefonu, "pacjent" FROM Pacjenci`,
        function (err, rows) {
            if (err) throw err
            // console.log(rows)
            res.send(rows)
            return
        }
    )
})
//-------wyslanie ilość wezwań dla każdego personelu
app.get("/api/personeldone", (req, res) => {
    console.log("Got a personel done request.")
    poolBase.query(
        `SELECT concat(imie_lekarza," ",nazwisko_lekarza)as "Imie i nazwisko", count(Wezwania.id_wezwania)as "Ilość wezwań", "Lekarz" as rola FROM lekarze INNER JOIN Wezwania on Wezwania.id_lekarza=Lekarze.id_lekarza GROUP BY Lekarze.id_lekarza
        UNION ALL
        SELECT concat(imie_ratownika," ",nazwisko_ratownika),count(ratownicy_wezwanie.id_wezwania),"Ratownik"  FROM Ratownicy INNER JOIN ratownicy_wezwanie ON ratownicy_wezwanie.id_ratownika=ratownicy.id_ratownika INNER JOIN wezwania on wezwania.id_wezwania = ratownicy_wezwanie.id_wezwania GROUP BY Ratownicy.id_ratownika;`,
        function (err, rows) {
            if (err) throw err
            // console.log(rows)
            res.send(rows)
            return
        }
    )
})
