setPhrases ()
function setPhrases () {
    window.phrases = [
    {
        "start": "0",
        "end": "sunrise_hs",
        "phrases": [
            getText("p_sunriseIn")
        ]
    },
    {
        "start": "sunrise_hs",
        "end": "sunset_hs - 5",
        "phrases": [
            getText("p_focus"),
            getText("p_blockDistraction"),
            getText("p_getUp"),
            getText("p_mantainPosture"),
            getText("p_rememberMoments")
        ]
    },
    {
        "start": "sunset_hs - 5",
        "end": "sunset_hs",
        "phrases": [
            getText("p_goWalk"),
            getText("p_remainingDaylight")
        ]
    },
    {
        "start": "sunset_hs",
        "end": "21.5",
        "phrases": [
            getText("p_exercise"),
            getText("p_createSomething"),
            getText("p_learn"),
            getText("p_read")
        ]
    },
    {
        "start": "21.5",
        "end": "23.99",
        "phrases": [
            getText("p_turnOff"),
            getText("p_shower"),
            getText("p_goSleep")
        ]
    }
]
}

