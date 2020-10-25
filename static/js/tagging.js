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