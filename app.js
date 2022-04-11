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
