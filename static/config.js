var config = {
    "v": "1",
    "user": {
        "name": "",
        "birthday": "",
        "language": "ES",
    },
    "settings": {
        "location": {
            "lat": null, // -34.5417
            "lng": null  //-58.6153
        },
        "spaceBarUse": false,
        "layouts": ["welcome", "nextweeks"],
        "theme": "default",
        "backgroundImage": null
    },
    "events": [
        {
            day: "2020-08-17",
            description: "",
            holiday: true
        },
        {
            day: "2020-10-12",
            description: "Puente turistico",
            holiday: true
        },
        {
            day: "2020-11-23",
            description: "Puente turistico",
            holiday: true
        },
        {
            day: "2020-12-07",
            description: "Puente turistico",
            holiday: true
        },
        {
            day: "2020-12-08",
            description: "Concepcion de Maria",
            holiday: true
        },
        {
            day: "2020-12-25",
            description: "Navidad",
            holiday: true
        },
        {
            day: "2020-08-25",
            description: "Data Enginner"
        },
        {
            day: "2020-08-03",
            description: "Tarjeta"
        }
    ]
}

var phrases = [
    {
        "start": "0",
        "end": "sunrise_hs",
        "phrases": [
            "`Sunrise in <strong>${h_to_sunrise}</strong>h <strong>${m_to_sunrise}</strong>m`"
        ]
    },
    {
        "start": "sunrise_hs",
        "end": "sunset_hs - 3",
        "phrases": [
            "Focus",
            "Block distractions",
            "Get up and move",
            "Mantain a good posture",
            "We do not remember days, we remember moments."
        ]
    },
    {
        "start": "sunset_hs - 4",
        "end": "sunset_hs",
        "phrases": [
            "`Remaining daylight <strong>${h_to_sunset}</strong>h <strong>${m_to_sunset}</strong>m. Go for a walk.`",
            "`Remaining daylight <strong>${h_to_sunset}</strong>h <strong>${m_to_sunset}</strong>m. Get some sunlight.`"
        ]
    },
    {
        "start": "sunset_hs",
        "end": "21.5",
        "phrases": [
            "Exercise",
            "Create something",
            "What did you learn today?",
            "Read 2 pages a book"
        ]
    },
    {
        "start": "21.5",
        "end": "23.99",
        "phrases": [
            "Start turning the screens off",
            "Take a shower",
            "Go to sleep"
        ]
    }
]

var themes = {
    "default": {
        name: "Default",
        userAvailable: true,
        thumbnail: "mountain1",
        palette: undefined,
        logic: [
            {
                start: "0",
                end: "23.99",
                theme: [{ bgdImage: "sunset1", props: "lightColors" }, { bgdImage: "mountain1", props: "lightColors" }]
            }
        ]
    },
    "light": {
        name: "Light",
        userAvailable: true,
        thumbnail: undefined,
        palette: ["#fafce0", "#edf0be", "#21a5b6a9", "#05668D"],
        logic: [
            {
                start: "0",
                end: "23.99",
                theme: [{ bgdImage: undefined, props: "light" }]
            }
        ]
    },
    "dark": {
        name: "Dark",
        userAvailable: true,
        thumbnail: undefined,
        palette: ["#202020", "#202020", "#2c2c2c", "#2c2c2c"],
        logic: [
            {
                start: "0",
                end: "23.99",
                theme: [{ bgdImage: undefined, props: "dark" }]
            }
        ]
    }
    //"beach": [],
    //"mountain": [],
}

var background_images = {
    "sunset1": {
        author: "No name",
        url: "https://www.pexels.com/photo/nature-sky-sunset-the-mountains-66997/",
        uri: "img/pexels-no-name-66997.jpg",
        base64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAaCAIAAABKLomcAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAABV1JREFUSMdtVl2OM8cRI1k9+tn9nM+xkwfDb0bykAvkBjlpzuUrBIm9u1rNdJF5GEm7NjwoQNWQNCyyq1lN/vNfEEGBBAEQfITuX+G23JPPTwIAuS2Q+2JP8gjDQYwENpKBEihIH3ifsfWA50dld5wPYDyq+YyKG6qNEAwixCB34AHdgSWAd36fsCWSAEJi55wbuxsgCXB/+U40Cfygq1vuB2MPLOPG+DfkPrD54E18Vvkjv4kE4kExTKLPUu91CDZMmAPLApJ6YBPSH5AmfycnfgN8l30HYJDwAxVJoMCBiCbIgWVAQvGT4PzYcvFTQ/E3W/g75vkEnM/C7kUgAQhY+58GDwMShvAg/RmYhO7sP7/9jySHjTZsOGgDhLFvO0ASCIPsTAaOC0q3uAFL4uPZgSOBzAdwAubR1Duz2SDQQBrELUTkLlBCEhbggfMCCaNYooSipIN4IBeybq3DSCEDGEgSoIEZzMC2nWwzIUIEKYGA+VltBAhvlVID5wNLqqriIi3FIT2Jz+KJPACDEAAypAEDDXSwJdfg6mzGnJ7QZFqYVju248R369j1/zhgGXo6DOkwdBafxbN4Ep+kJ/EsHogDMYhxby0nHcxgM67Bu3G1tsI6cG1dnEvy7lw703bgxPb+caugA3t8e14O4tPQs/SN+EV4Es/CWTyKR2IRF3xgI7HTyWZcjauxmlu4o770Hn5zVmsFtmRztk633Z1mMAGMn061FI+jztJT8Yv4RTgTJ+EkHogjMJgCau+zEEkn7WzOaqzBFl4bl+nXrX/d8oJc4CtxdS7JxX5rX2evs9fZc7bb428nLMU9DqVz8UyexBNxUo7AEVjiSoRwPxZ3d2pjGlsyg9W4Fi7CK/NGX9DXzhvy2n6Z/dZ+d97i1/iCrMr4qeYoLZWqqsooLaWDeGts4AAcwBHLFkIiIXBrmjba6GQ6m7CK16F1y/vE+/Tr1r8ovxKX5rvx2nopvDTeG+NHrwMcqIKUKkioQhVV5LgFBqRwJ30zjb1tvLcOpjMbk+ihuXCbvs5+W/G18FJ43fq9c+m8Cr9uuSDj67yWNCK5qqSULLlkSZJYZEki6mYn93lA7mcshJ1GZjwTA61s8kE+jJySJ/vivtjvzCv9jL6kx7lnhQNVaUWyZLFFERTF3cdECpB4y/eBlIdxu+EJT2aXXW52s81Y9FAW+WAP9Eif3ONPvi7QIAusUKFMSCHNvQwBIsCkiEUYRJGF7H66e7iTacxgC9b2tXu0NXvXwTHo3QClLOXx3fq2FBdzlEqsoERGES21NaMJOkAgYEEO4qIMomIlSNLpzmbMcGI/1nhv1+ps8Ywd7H7b+7Z4PK8vh9KhuBRGcWj3bKKEyKTJBidkkID2dhNLEEAEbbunW6u5mQ0ZNNHwRBrVOBobuDnvM2OzpsfP/3k7Fp4HnwYW8VB8XvjloOMi6n73KIXKPqNKHOIojmIRFCC2tFLvc7zN9TJntybUGI1zY21cm6vZwWq8OK/O+PfPr4v4ZfDLgqN4Hvz+xB+e9NeTvl34tKiGatR50WkRxZTg2q0sGJEmsNuh7Q25Kpvg4TBMNI3pueGyYTVnuBlu8Pu//4NVo+pQLHERz4u+O/CHE3888y9HHIqj8OejvjuXxAmM4pGoQSxjY73PXK9zW73NrI339tphwMTTc3pOrzNvW956dxuunfHf//0CDdRIFShQlIZ4Hvxm8ElWLOE8dF6KgqESj8hgTG7Q6syZdjpscAbtAGGSfSjFsduZ93HpgMvXb0lZlVrAhzEI5P3iQKgwlv3Sn1owliKJ7NPde2Mjt18i6L5fASZ6wg0b2KdyIwH1f8hbRErjo/RxAAAAAElFTkSuQmCC"
    },
    "mountain1": {
        author: "No name",
        url: "",
        uri: "img/clouded-hills.jpg",
        base64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAXCAIAAAD2sJpCAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAABxlJREFUGBkFwTuPpFcRBuC3qs4536W75+IZz7Jay+tdaS0wQkJGQkjgDJEiREzGnyAlIecPEJPwCwgcISQnlhyAQICttb327lx6pvu7nEtV8Tz0mz9/cr3Wpepa29pUTddmO/YniQ+1HUq7XspRNaupOcwiwcwjnOHVvKo1NTc3NTTzamhKjncux58+PX9xsfn7F7fvng1jF4vax5/fAfjfN3NdNYxRUO2u2AxSUHVyoh54UA9ESbgSZ3glVzgcOyGQ76urupvBnB0BxEFWBYlvUrrapLd33X/uloeiHz2/uD6WMbKbJfLbVdUMQNj18S0nESaLX8wFbo8S96Yd/Nk2fnp97KulQFA5NA1uAd6cI1TZYUTmP3u0/fHjk5f7+a+f7793Mfz8+cXNlP/yr+tff/fqR09O4RYYd1P+5Ov7V8d6M1e4Ax5IZExwogR/bxN3govEveAs8S5JZIbjNPGzXRL3L/bzXPVyjN856cbAQn7eh/fORmF6tZ9/+f3Hl9vu67tJzX/30fNnb22q6v20DoE+O+RP79aSFSDEAPagxFcD3zKNgkeJp9KGxI8GuZnL2uqz8+HtTXw0BnJj+PsXg5pvOnn3fDQzM8ulECxIeOd8VLNSa2L/4NGmtfYwzftpybXVqmcdfXDW/Xtfp2IiFEHhJ5f9WaJDteenyVXv1zZG/uohN/BbY3hxMZiqEF4flhh4jEJwc2PADHOuTdvYdUMMpTV3z2U9TnNTfbM/HNfKTLlq33U7xi/eGZ7v4t9u6rZPv3pxEZIwEZ13dMg6Bnp72+2X8vR8uNrGiyEF9tp8LZVcEzPc1XVec2COIgCYKAUptU55XXK5fZjuDtP9tLzeH49rac3UvYvpdDtenZ++uBw/fHd473JHhACRg9pWKLdWlGI1JkqBI7O5NgMzq3uX5Ljm+3nZ9tHUuhCmnJdS4R5zLq2tpTocQFNtagCCcIqRiJnoYjdc7gYQEdm8LGvTcDWGpWpVayRVbUs+NXszrycd90K7SEKIIURhAj0s+bjWpZRcKsxFKDBNyzqXelyzmQuzk3AI23EYzNaqTb2LspT65fVtbkZgCeKgADO4mWltWpuu2dQsN1UNuy4IeC61E+qEWGTo4v20rFXHLpnpmGISvnk4LrnOuZWmTQ0OdQJzba5Oal4UqCbNi5q7cdUQJNyuNTII3gkF4qpw2N3h+M+bu5ev37RSSynvP7n64bPHAO6O0+1hLrVdnoy7PlU1Nd8M/XbopzUflnJYcmlqjj7FGLU0zVXdMPbxZOxy1Vf385w1NtAfP/7sfEi9cBB+c//wjy9ff3Nzd/twmOfZtLGD3IWx7VMXmIhSDMwsRH0KZ2MfhZ9enT29PD8s6zf741yaO/oYdn10x34uZrbpQlWH+3GtN9NamkUR+vD3f3p8sjnvUx/4v6++fXN/mJY51zYKu0OAjiFEBIeZu/cpjH1KwsRMxO7Y9OnJxWnfxdLAElLgPobLbQ/g24elC+HqZDgdEhOWolOua9VjbpR++wfAIjyRw03N3MxUE9lOABADTBDAHOxODpAHocgQJiICmFhiDDEmZpEgROzgIcUuBnNkBYHGLhBzCDFIAEvoUOEupuRmALm7e2J0oFqbmgV2AAYSAAADkbBUJ0JkIhAzAA7CXSwxBOfQnJrBiUBsQANV8zGlTsSZi7MRh1SmZK2W0pE1kFgttXFI57utw7LboWptOog7sxE7kA0RMMcMABAmIQrMpbUuCDMbyapELI14McpmWV19EebAzCEohVDyuprVpluxnnSe87w293ne322CM4fT7dZQD3cPp+fnU3WOgcGTejUARExoDhAR9UIgBlNgFpYgQhzEyZQEro7aLDuwFgLC2to22JMTCzBY66yeRLufNDFqqfPaajkIlJrafg5FPQ1DoJ4YxCZJqa9m1cnNY5eYWY2mQg70QpskHYt4WEDe0AwMNGM3hF//oA6ibLVUX9fy7U01+DrqcbKV9bz3XHIp5qr7xRiG6ZCDOLzV5uYsAVo5SNcjNz69SHXBKaJK6sQtbtbmW9LTPuW1LMZx3C481NCF668fUsBS6prtcKjHtZ3uGO7rqlHQmrfamuo8aReJYCUrctkM3ExLUS1rZIw70YxW7PbLyRQiCFEQJfX3mwDXVgsti9cqdQ9O22HYhJdfTXNud4eiVVXNzV+ahZ40O9RSz6rG5FB3puPSWHzopA+i1ULHPJJWne6rmROBCLW4OzgoEZkuIXEKZA4iKtncQWHuhxBu75faNC/NmgPGAjLT2WHuhjI3IrDA1OfVCB6EI/n+YV2WBnIiQE3V3dzVAQIcIHMjInfUxao7iIiJnBwQcWEOPR1bc6sCODlihJLV1Qju5hAQwVrTBhBxZCFvTVXN1OAOAsHggIPggLsB5DByAEQAuTkRO9wdIRKTkPv/AZuSJWHHq8D7AAAAAElFTkSuQmCC"
    }
}

var themes_properties = {
    "light": {
        userAvailable: true,
        palette: ["#fafce0", "#edf0be", "#21a5b6a9", "#05668D"],
        image: "",
        properties: {
            "--background-image-small": "",
            "--background-image": "",
            "--color-background": "#fafce0",
            "--color-surface": "#edf0be",
            "--color-on-background": "#202020",
            "--color-on-background-shadow": "#ffffff83",
            "--font-main": "'Ubuntu', sans-serif",
            "--font-secondary": "'Open Sans', sans-serif",
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
    "lightColors": {
        userAvailable: true,
        palette: [],
        image: "img/pexels-no-name-66997.jpg",
        properties: {
            //"--background-image-small": "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAaCAIAAABKLomcAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAABV1JREFUSMdtVl2OM8cRI1k9+tn9nM+xkwfDb0bykAvkBjlpzuUrBIm9u1rNdJF5GEm7NjwoQNWQNCyyq1lN/vNfEEGBBAEQfITuX+G23JPPTwIAuS2Q+2JP8gjDQYwENpKBEihIH3ifsfWA50dld5wPYDyq+YyKG6qNEAwixCB34AHdgSWAd36fsCWSAEJi55wbuxsgCXB/+U40Cfygq1vuB2MPLOPG+DfkPrD54E18Vvkjv4kE4kExTKLPUu91CDZMmAPLApJ6YBPSH5AmfycnfgN8l30HYJDwAxVJoMCBiCbIgWVAQvGT4PzYcvFTQ/E3W/g75vkEnM/C7kUgAQhY+58GDwMShvAg/RmYhO7sP7/9jySHjTZsOGgDhLFvO0ASCIPsTAaOC0q3uAFL4uPZgSOBzAdwAubR1Duz2SDQQBrELUTkLlBCEhbggfMCCaNYooSipIN4IBeybq3DSCEDGEgSoIEZzMC2nWwzIUIEKYGA+VltBAhvlVID5wNLqqriIi3FIT2Jz+KJPACDEAAypAEDDXSwJdfg6mzGnJ7QZFqYVju248R369j1/zhgGXo6DOkwdBafxbN4Ep+kJ/EsHogDMYhxby0nHcxgM67Bu3G1tsI6cG1dnEvy7lw703bgxPb+caugA3t8e14O4tPQs/SN+EV4Es/CWTyKR2IRF3xgI7HTyWZcjauxmlu4o770Hn5zVmsFtmRztk633Z1mMAGMn061FI+jztJT8Yv4RTgTJ+EkHogjMJgCau+zEEkn7WzOaqzBFl4bl+nXrX/d8oJc4CtxdS7JxX5rX2evs9fZc7bb428nLMU9DqVz8UyexBNxUo7AEVjiSoRwPxZ3d2pjGlsyg9W4Fi7CK/NGX9DXzhvy2n6Z/dZ+d97i1/iCrMr4qeYoLZWqqsooLaWDeGts4AAcwBHLFkIiIXBrmjba6GQ6m7CK16F1y/vE+/Tr1r8ovxKX5rvx2nopvDTeG+NHrwMcqIKUKkioQhVV5LgFBqRwJ30zjb1tvLcOpjMbk+ihuXCbvs5+W/G18FJ43fq9c+m8Cr9uuSDj67yWNCK5qqSULLlkSZJYZEki6mYn93lA7mcshJ1GZjwTA61s8kE+jJySJ/vivtjvzCv9jL6kx7lnhQNVaUWyZLFFERTF3cdECpB4y/eBlIdxu+EJT2aXXW52s81Y9FAW+WAP9Eif3ONPvi7QIAusUKFMSCHNvQwBIsCkiEUYRJGF7H66e7iTacxgC9b2tXu0NXvXwTHo3QClLOXx3fq2FBdzlEqsoERGES21NaMJOkAgYEEO4qIMomIlSNLpzmbMcGI/1nhv1+ps8Ywd7H7b+7Z4PK8vh9KhuBRGcWj3bKKEyKTJBidkkID2dhNLEEAEbbunW6u5mQ0ZNNHwRBrVOBobuDnvM2OzpsfP/3k7Fp4HnwYW8VB8XvjloOMi6n73KIXKPqNKHOIojmIRFCC2tFLvc7zN9TJntybUGI1zY21cm6vZwWq8OK/O+PfPr4v4ZfDLgqN4Hvz+xB+e9NeTvl34tKiGatR50WkRxZTg2q0sGJEmsNuh7Q25Kpvg4TBMNI3pueGyYTVnuBlu8Pu//4NVo+pQLHERz4u+O/CHE3888y9HHIqj8OejvjuXxAmM4pGoQSxjY73PXK9zW73NrI339tphwMTTc3pOrzNvW956dxuunfHf//0CDdRIFShQlIZ4Hvxm8ElWLOE8dF6KgqESj8hgTG7Q6syZdjpscAbtAGGSfSjFsduZ93HpgMvXb0lZlVrAhzEI5P3iQKgwlv3Sn1owliKJ7NPde2Mjt18i6L5fASZ6wg0b2KdyIwH1f8hbRErjo/RxAAAAAElFTkSuQmCC')",
            //"--background-image": "url('../img/pexels-no-name-66997.jpg')",
            "--color-background": "#3b1003",
            "--color-surface": "#ffffff28",
            "--color-on-background": "#ffffff",
            "--color-on-background-shadow": "#00000083",
            "--font-main": "'Ubuntu', sans-serif",
            "--font-secondary": "'Open Sans', sans-serif",
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
    "dark": {
        userAvailable: true,
        palette: ["#202020", "#202020", "#2c2c2c", "#2c2c2c"],
        image: "",
        properties: {
            "--background-image-small": "",
            "--background-image": "",
            "--color-background": "#202020",
            "--color-surface": "#2c2c2c",
            "--color-on-background": "#bdbdbd",
            "--color-on-background-shadow": "#00000083",
            "--font-main": "'Ubuntu', sans-serif",
            "--font-secondary": "'Open Sans', sans-serif",
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