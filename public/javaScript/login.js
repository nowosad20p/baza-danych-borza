localStorage.clear()
localStorage.setItem("user_id", "1")
localStorage.setItem("user_firstname", "Adam")
localStorage.setItem("user_lastname", "Kowalski")

async function getLogins() {
    let res = await fetch("/api/logins")
    res = await res.json()
    console.log(res)
}
getLogins()
