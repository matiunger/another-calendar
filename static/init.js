init()

function init() {
    // gets app data or creates it from config
    try {
        if (!getData("ac_user")) { localStorage.setItem("ac_user", JSON.stringify(config["user"])) }
        if (!getData("ac_settings")) { localStorage.setItem("ac_settings", JSON.stringify(config["settings"])) }
        if (!getData("ac_events")) { localStorage.setItem("ac_events", JSON.stringify(config["events"])) }
    } catch (e) { handleError(e, {location: "init get data or set config"}) }

    // sets language and global text variable
    try {
        var browserLang = navigator.language || navigator.userLanguage;
        var lang = getData("ac_user")["language"] ? getData("ac_user")["language"] : browserLang.substring(0,2).toUpperCase()
        window.text = texts[lang]["text"]
    } catch (e) { 
        window.text = texts["EN"]["text"]
        handleError(e)
    }

    // sets phrases and themes when changing language
    try {
        setPhrases()
        setThemes()
    } catch (e) {}
}

function getData(key) {
    try {
        if (localStorage.getItem(key) != null) {
            return JSON.parse(localStorage.getItem(key))
        }
        return
    } catch (e) { handleError(e); return }
}

function getText(key) {
    try {
        return text[key]
    } catch (e) {
        console.log("not found")
        return "(not found)"
    }
}

function handleError (error, data) {
    console.error(error)
    var location = "(not set)"
    if (data) {
        console.log(data)
        location = data.location
    }
    tagError({
        "error_message" : error.message,
        "error_location" : location
    })
}