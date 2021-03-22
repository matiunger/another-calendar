function tagPageview(path) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        "event" : "pageview",
        "pagePath" : path
    })
}

function tagEvent(event, params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        "event" : "pageview",
        "pagePath" : "/welcome"
    })
}
function tagError(params) {
    params["event"] = "app_error"
    window.dataLayer.push(params)
}

function setProperties(event, params) {
    window.dataLayer.push({
        "event" : "setProperties",
        "version" : "/welcome",
        "theme" : "/welcome",
        "language" : "/welcome"
    })
}