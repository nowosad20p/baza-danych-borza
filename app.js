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
        console.log(rows)
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
            console.log(rows)
            res.send(rows)
            return
        }
    )
})
//-------wyslanie info o kategoriach
app.get("/api/categories", (req, res) => {
    console.log("Got a cats request.")
    poolBase.query(
        `select Kategorie_wezwania.nazwa_kategorii "Nazwa Kategorii",count(Wezwania.id_wezwania) as "Ilość wezwań" 
        FROM wezwania RIGHT JOIN Kategorie_wezwania ON Kategorie_wezwania.id_kategorii=wezwania.id_kategorii GROUP BY nazwa_kategorii `,
        function (err, rows) {
            if (err) throw err
            console.log(rows)
            res.send(rows)
            return
        }
    )
})
