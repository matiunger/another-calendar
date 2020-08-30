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
        "userAvailable":true,
        "palette": ["#fafce0", "#edf0be", "#21a5b6a9","#05668D"],
        "image": "",
        "properties": {
            "--background-image-small": "",
            "--background-image": "",
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
        }
    },
    "sunset" : {
        "userAvailable":true,
        "palette": [],
        "image": "img/pexels-no-name-66997.jpg",
        "properties": {
            "--background-image-small": "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAaCAIAAABKLomcAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAABV1JREFUSMdtVl2OM8cRI1k9+tn9nM+xkwfDb0bykAvkBjlpzuUrBIm9u1rNdJF5GEm7NjwoQNWQNCyyq1lN/vNfEEGBBAEQfITuX+G23JPPTwIAuS2Q+2JP8gjDQYwENpKBEihIH3ifsfWA50dld5wPYDyq+YyKG6qNEAwixCB34AHdgSWAd36fsCWSAEJi55wbuxsgCXB/+U40Cfygq1vuB2MPLOPG+DfkPrD54E18Vvkjv4kE4kExTKLPUu91CDZMmAPLApJ6YBPSH5AmfycnfgN8l30HYJDwAxVJoMCBiCbIgWVAQvGT4PzYcvFTQ/E3W/g75vkEnM/C7kUgAQhY+58GDwMShvAg/RmYhO7sP7/9jySHjTZsOGgDhLFvO0ASCIPsTAaOC0q3uAFL4uPZgSOBzAdwAubR1Duz2SDQQBrELUTkLlBCEhbggfMCCaNYooSipIN4IBeybq3DSCEDGEgSoIEZzMC2nWwzIUIEKYGA+VltBAhvlVID5wNLqqriIi3FIT2Jz+KJPACDEAAypAEDDXSwJdfg6mzGnJ7QZFqYVju248R369j1/zhgGXo6DOkwdBafxbN4Ep+kJ/EsHogDMYhxby0nHcxgM67Bu3G1tsI6cG1dnEvy7lw703bgxPb+caugA3t8e14O4tPQs/SN+EV4Es/CWTyKR2IRF3xgI7HTyWZcjauxmlu4o770Hn5zVmsFtmRztk633Z1mMAGMn061FI+jztJT8Yv4RTgTJ+EkHogjMJgCau+zEEkn7WzOaqzBFl4bl+nXrX/d8oJc4CtxdS7JxX5rX2evs9fZc7bb428nLMU9DqVz8UyexBNxUo7AEVjiSoRwPxZ3d2pjGlsyg9W4Fi7CK/NGX9DXzhvy2n6Z/dZ+d97i1/iCrMr4qeYoLZWqqsooLaWDeGts4AAcwBHLFkIiIXBrmjba6GQ6m7CK16F1y/vE+/Tr1r8ovxKX5rvx2nopvDTeG+NHrwMcqIKUKkioQhVV5LgFBqRwJ30zjb1tvLcOpjMbk+ihuXCbvs5+W/G18FJ43fq9c+m8Cr9uuSDj67yWNCK5qqSULLlkSZJYZEki6mYn93lA7mcshJ1GZjwTA61s8kE+jJySJ/vivtjvzCv9jL6kx7lnhQNVaUWyZLFFERTF3cdECpB4y/eBlIdxu+EJT2aXXW52s81Y9FAW+WAP9Eif3ONPvi7QIAusUKFMSCHNvQwBIsCkiEUYRJGF7H66e7iTacxgC9b2tXu0NXvXwTHo3QClLOXx3fq2FBdzlEqsoERGES21NaMJOkAgYEEO4qIMomIlSNLpzmbMcGI/1nhv1+ps8Ywd7H7b+7Z4PK8vh9KhuBRGcWj3bKKEyKTJBidkkID2dhNLEEAEbbunW6u5mQ0ZNNHwRBrVOBobuDnvM2OzpsfP/3k7Fp4HnwYW8VB8XvjloOMi6n73KIXKPqNKHOIojmIRFCC2tFLvc7zN9TJntybUGI1zY21cm6vZwWq8OK/O+PfPr4v4ZfDLgqN4Hvz+xB+e9NeTvl34tKiGatR50WkRxZTg2q0sGJEmsNuh7Q25Kpvg4TBMNI3pueGyYTVnuBlu8Pu//4NVo+pQLHERz4u+O/CHE3888y9HHIqj8OejvjuXxAmM4pGoQSxjY73PXK9zW73NrI339tphwMTTc3pOrzNvW956dxuunfHf//0CDdRIFShQlIZ4Hvxm8ElWLOE8dF6KgqESj8hgTG7Q6syZdjpscAbtAGGSfSjFsduZ93HpgMvXb0lZlVrAhzEI5P3iQKgwlv3Sn1owliKJ7NPde2Mjt18i6L5fASZ6wg0b2KdyIwH1f8hbRErjo/RxAAAAAElFTkSuQmCC')",
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
        }
    },
    "dark" : {
        "userAvailable":true,
        "palette": ["#202020","#202020", "#2c2c2c","#2c2c2c"],
        "image": "",
        "properties": {
            "--background-image-small": "",
            "--background-image": "",
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
}