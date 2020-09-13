init()

function init() {
    if (!getData("ac_user")) { localStorage.setItem("ac_user", JSON.stringify(config["user"])) }
    if (!getData("ac_settings")) { localStorage.setItem("ac_settings", JSON.stringify(config["settings"])) }
    if (!getData("ac_events")) { localStorage.setItem("ac_events", JSON.stringify(config["events"])) }

    // language
    var userLang = navigator.language || navigator.userLanguage;
    window.text = texts[getData("ac_user")["language"]]["text"]
    setPhrases()
    setThemes()
}

function getData(key) {
    if (localStorage.getItem(key) != null) {
        return JSON.parse(localStorage.getItem(key))
    }
    return

}

function getText(key) {
    try {
        return text[key]
    } catch (e) {
        console.log("not found")
        return "(not found)"
    }
}