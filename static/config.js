var config = {
    "v": "1",
    "user": {
        "name": "",
        "birthday": "",
        "language": "ES",
    },
    "settings" : {
        "location" : {
            "lat": null, // -34.5417
            "lng": null  //-58.6153
        },
        "spaceBarUse" : false,
        "layouts": ["welcome", "nextweeks"],
        "theme": "sunset",
        "backgroundImage": null
    },
    "events": [
        {day: "2020-08-17",
        description:"",
        holiday: true},
        {day: "2020-10-12",
        description:"Puente turistico",
        holiday: true},
        {day: "2020-11-23",
        description:"Puente turistico",
        holiday: true},
    {day: "2020-12-07",
    description:"Puente turistico",
    holiday: true},
    {day: "2020-12-08",
    description:"Concepcion de Maria",
    holiday: true},
    {day: "2020-12-25",
    description:"Navidad",
    holiday: true},
    {day: "2020-08-25",
    description:"Data Enginner"},
    {day: "2020-08-03",
    description:"Tarjeta"}
    ]
}

var themes = {
    "classic" : {
        "--background-image": "url('')",
        "--color-background": "#fafce0",
        "--color-surface": "#edf0be",
        "--color-on-background": "#202020",
        "--color-on-background-shadow": "#ffffff83",
        "--font-main": "'Ubuntu', sans-serif",
        "--font-secondary":  "'Open Sans', sans-serif",
        "--font-3": "'Comfortaa', cursive",
        "--color-dark": "#0280906b",
        "--color-light": "#21a5b69c",
        "--color-on-dark-light": "#ffffffb2",
        "--color-primary": "#05668D",
        "--color-secondary": "#21a5b6a9",
        "--color-tertiary": "#313131",
        "--color-tertiary-shadow": "#ffffff80",
        "--color-on-surface": "#2b2b2b",
        "--color-on-primary": "#1d1d1d",
        "--color-on-secondary": "#000000"
    },
    "sunset" : {
        "--background-image": "url('../img/pexels-no-name-66997.jpg')",
        "--color-background": "#3b1003",
        "--color-surface": "#ffffff28",
        "--color-on-background": "#ffffff",
        "--color-on-background-shadow": "#00000083",
        "--font-main": "'Ubuntu', sans-serif",
        "--font-secondary":  "'Open Sans', sans-serif",
        "--font-3": "'Comfortaa', cursive",
        "--color-dark": "#ffffff33",
        "--color-light": "#ffffff42",
        "--color-on-dark-light": "#ffffffb2",
        "--color-primary": "#ff9900",
        "--color-secondary": "#ffffff86",
        "--color-tertiary": "#ffffff",
        "--color-tertiary-shadow": "#202020b6",
        "--color-on-surface": "#2b2b2b",
        "--color-on-primary": "#1d1d1d",
        "--color-on-secondary": "#242424"
    },
    "dark" : {
        "--background-image": "url('')",
        "--color-background": "#202020",
        "--color-surface": "#2c2c2c",
        "--color-on-background": "#bdbdbd",
        "--color-on-background-shadow": "#00000083",
        "--font-main": "'Ubuntu', sans-serif",
        "--font-secondary":  "'Open Sans', sans-serif",
        "--font-3": "'Comfortaa', cursive",
        "--color-dark": "#028090be",
        "--color-light": "#21a4b6be",
        "--color-on-dark-light": "#ffffffb2",
        "--color-primary": "#028090",
        "--color-secondary": "#21a4b6be",
        "--color-tertiary": "#ffffff",
        "--color-tertiary-shadow": "#202020b6",
        "--color-on-surface": "#2b2b2b",
        "--color-on-primary": "#1d1d1d",
        "--color-on-secondary": "#e7e7e7"
    }
}