const select = document.querySelector(".form-select")
//------- domyślny użytkownik jeśli server nie działa
localStorage.clear()
localStorage.setItem("user_id", "1")
localStorage.setItem("user_firstname", "Adam")
localStorage.setItem("user_lastname", "Kowalski")
let listOfLogins
async function getLogins() {
    //------ pobiera dane operatorów z serwera
    const res = await fetch("/api/logins")
    listOfLogins = await res.json()
    //----------------- dodawanie opcji do selecta
    listOfLogins.forEach((element) => {
        const option = document.createElement("option")
        option.value = element.id_operatora
        option.innerText = element.imie_operatora + " " + element.nazwisko_operatora
        select.append(option)
    })
    changeLocalStorageData(listOfLogins)
    return
}
getLogins()
//------ ustawia dane w local storage
async function changeLocalStorageData(data) {
    localStorage.clear()
    localStorage.setItem("user_id", select.value)
    localStorage.setItem("user_firstname", data[select.value - 1].imie_operatora)
    localStorage.setItem("user_lastname", data[select.value - 1].nazwisko_operatora)
}

select.addEventListener("change", () => {
    changeLocalStorageData(listOfLogins)
})
//-------- funkcjolaność przycisku zaloguj
document.querySelector("input").addEventListener("click", () => {
    window.location.href = "panel.html"
})
