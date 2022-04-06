const body = document.querySelector("body")
const display = document.querySelector("#display")
const display2 = document.querySelector("#display2")
const rowView = document.querySelector("#row-view")
const colView = document.querySelector("#column-view")
const logOut = document.querySelector("#log-out")
const usernameNav = document.querySelector("#username-nav")
//------pilnuje by pop up o złym ekranie nie pokazał się 2 razy
let popUpShow = true

//------------- funkcja do przenoszenia do panelu logowania
logOut.addEventListener("click", () => {
    localStorage.clear()
    window.location.href = "index.html"
})
//------------ funkcja do zmieniania układu strony z kolumny tabel do 2 kolumn tabel
function changeView(classToAdd) {
    const displays = document.querySelectorAll(".disp")
    displays.forEach((element) => {
        element.classList.remove("col-12")
        element.classList.remove("col-5")
        element.classList.add(classToAdd)
    })
}

rowView.addEventListener("click", () => {
    changeView("col-12")
    closePopUp()
})
colView.addEventListener("click", () => {
    changeView("col-5")
    openPopUp()
})
//-----------------zamykanie i otwieranie pop-up'a o nie ładnie wyglądającym widoku
function closePopUp() {
    document.querySelector("#pop-up").style.display = "none"
}
function openPopUp() {
    if (popUpShow) {
        document.querySelector("#pop-up").style.display = "block"
    }
}
document.querySelector(".bi-x-circle-fill").addEventListener("click", () => {
    popUpShow = false
    closePopUp()
})

//---------------dawanie danych użytkownika do navbaru
usernameNav.innerHTML += localStorage.getItem("user_firstname") + " " + localStorage.getItem("user_lastname")
// async function wes()
// {
//     let res = await fetch("sample4.json")
//     res = res.json()
//     await console.log(res)
// }
// wes()

let res = {
    people: [
        {
            firstName: "Joe",
            lastName: "Jackson",
            gender: "male",
            age: 28,
            number: "7349282382",
        },
        {
            firstName: "James",
            lastName: "Smith",
            gender: "male",
            age: 32,
            number: "5678568567",
        },
        {
            firstName: "Emily",
            lastName: "Jones",
            gender: "female",
            age: 24,
            number: "456754675",
        },
        {
            firstName: "Adam",
            lastName: "fabeta",
            gender: "female",
            age: 68,
            number: "420420420",
        },
    ],
}

//------dane w JSON z których ma zrobić tabele, element w którym ma to wyświetlić
function createTable(data, output) {
    const table = document.createElement("table")
    //----dodaje wyglad tablicy------
    table.classList.add("table")
    table.classList.add("table-dark")
    table.classList.add("table-striped")
    table.classList.add("table-hover")
    // console.log(data.people)
    //--------tworzy to takie menu od tablicy--------
    function createHeader(element) {
        const thead = document.createElement("thead")
        const tr = document.createElement("tr")
        for (let key in element) {
            // console.log(element[key])
            const th = document.createElement("th")
            th.innerText = key
            tr.append(th)
        }
        thead.append(tr)
        table.append(thead)
    }
    createHeader(data.people[0])
    //-------------dodaje dane do tablicy
    const tbody = document.createElement("tbody")
    data.people.forEach((element) => {
        const tr = document.createElement("tr")
        for (let key in element) {
            const td = document.createElement("td")
            td.innerText = element[key]
            tr.append(td)
        }
        tbody.append(tr)
    })
    table.append(tbody)
    //-------dodaje scope="col" do komórek w nagłówku tablicy
    table.querySelectorAll("th").forEach((element) => {
        element.setAttribute("scope", "col")
    })
    //----------dodaje scope="row" do pierwszej komórki wierszy tablicy z wyjątkiem nagłówka
    table.querySelectorAll("tr").forEach((element) => {
        if (!(element.querySelector("td") === null)) {
            element.querySelector("td").setAttribute("scope", "row")
        }
    })
    output.append(table)
}
createTable(res, display)
createTable(res, display2)
createTable(res, document.querySelector("#display3"))
createTable(res, document.querySelector("#display4"))
