var date = new Date();
const today = new Date()
let root = document.documentElement;
let app = document.getElementById("app");

try {
    window.layouts = [new Welcome(), new DayBlocks(), new NextWeeks()]
    window.current_layout = 0;
} catch(e) {handleError(e, {location: "index start"})}


window.onload = function () {
    renderApp()
};

function renderApp() {
    try {
        // Onboarding - space bar message
        if (!getData("ac_settings")["spaceBarUse"]) $(".container-space-bar").html(`${text["pressSpace"]} <span class="container-space-bar__space-bar blink">${text["space"]}</span> ${text["forNextView"]}`).show()

        // render
        layouts[0].render(".main")
        window.theme = themes[getData("ac_settings")["theme"]]
        changeTheme(theme)

        // space bar - next layout
        document.body.onkeyup = function (e) {
            try {
                if (e.keyCode == 32 && !$(".modal-event").length && !$(".main-next").length) {

                    setData("ac_settings", "spaceBarUse", true); $(".container-space-bar").hide();

                    $("#app").append("<div class='main-next'></div>")
                    current_layout = current_layout == layouts.length - 1 ? 0 : current_layout + 1
                    layouts[current_layout].render(".main-next")
                    $(".main").on("animationend", function () {
                        $(".main").remove()
                        $(".main-next").attr("class", "main")
                    });
                    $(".main").addClass("main--slide-out")
                    $(".main-next").addClass("main--slide-in")

                }
                if (e.keyCode == 27 && !isHidden($("#modal")[0])) {
                    $("#modal").hide()
                }
            } catch(e) {handleError(e, {location:"render app onkeyup"})}
        }

        // setting btn
        $(".container-settings-btn__btn").click(function (e) {
            try {
                var language = getData("ac_user")["language"]
                var flags = []
                for (var key in texts) {
                    if (texts.hasOwnProperty(key)) {
                        var flag_node = `<img data-id='${key}' class='modal-settings__language__flag' src='img/flags/${texts[key]["flag"]}' />`
                        flags.push(flag_node)
                    }
                }
                flags = flags.join('')

                var theme_user = getData("ac_settings")["theme"]
                var themes_options = []
                for (var key in themes) {
                    if (themes.hasOwnProperty(key)) {
                        var t_style = ""
                        if (themes[key]["thumbnail"]) {
                            t_style = `style="background-image:url('${background_images[themes[key]["thumbnail"]].base64}');"`
                        } else if (themes[key]["palette"].length) {
                            t_style = `style="background: linear-gradient(180deg, ${themes[key]["palette"][0]} 0%, ${themes[key]["palette"][0]} 33%, ${themes[key]["palette"][1]} 33%, ${themes[key]["palette"][1]} 66%, ${themes[key]["palette"][2]} 66%, ${themes[key]["palette"][2]} 100%);"`
                        }
                        var theme_node = `<div data-id='${key}' class='modal-settings__theme-container'><div ${t_style} class='modal-settings__theme'>${themes[key]["name"]}</div></div>`
                        if (themes[key]["userAvailable"]) themes_options.push(theme_node)
                    }
                }
                themes_options = themes_options.join('')

                $("#modal .modal-content").html(`
                        <div class="modal-settings">
                            <header>
                            <div class="modal-settings__row">
                                <div class="col-6 left txt-left modal-settings_title"><i class="material-icons">settings</i>&nbsp;${getText("settings")}</div>
                                <div class="col-6 right txt-right"><i class="material-icons modal-settings__btn-close">close</i></div>
                            </div>
                            </header>
                            <section>
                                <div class="modal-settings__section-title">${getText("theme")}</div>
                                <div class="modal-settings__row">
                                ${themes_options}
                                </div>
                            </section>
                            <section>
                                <div class="modal-settings__section-title">${getText("language")}</div>
                                <div class="modal-settings__row">
                                ${flags}
                                </div>
                            </section>
                            <footer>
                                <div class="modal-settings__row">
                                    <div class="col-6 left txt-left"></div>
                                    <div class="col-6 right txt-right"><input class="primary-button" value="${getText("save")}" type="submit" /></div>
                                </div>
                            </footer>
                        </div>
                `)

                // selected flag
                $(".modal-settings__language__flag[data-id='" + language + "']").addClass("modal-settings__language__flag--selected")
                $(".modal-settings__language__flag").click(function (e) {
                    $(".modal-settings__language__flag").removeClass("modal-settings__language__flag--selected")
                    $(e.target).addClass("modal-settings__language__flag--selected")
                })

                // selected theme
                $(".modal-settings__theme-container[data-id='" + theme_user + "']").addClass("modal-settings__theme-container--selected")
                $(".modal-settings__theme-container").click(function (e) {
                    $(".modal-settings__theme-container").removeClass("modal-settings__theme-container--selected")
                    $(e.target).closest(".modal-settings__theme-container").addClass("modal-settings__theme-container--selected")
                })

                $(".modal-settings input[type='submit']").click(function () {
                    setData("ac_user", "language", $(".modal-settings__language__flag--selected").attr("data-id"))
                    setData("ac_settings", "theme", $(".modal-settings__theme-container--selected").attr("data-id"))
                    $("#modal").hide();
                    init()
                    renderApp()
                })

                $(".modal-settings .modal-settings__btn-close").click(function () {
                    $("#modal").hide();
                })
                $(".modal-content").css("width", "50%"); $("#modal").show()
            } catch(e) {handleError(e, {location:"render app setttings onclick"})}
        })
    } catch(e) {handleError(e, {location:"render app main"})}
}


function isHidden(el) {
    try {
        var style = window.getComputedStyle(el);
        return (style.display === 'none')
    } catch(e) {handleError(e, {location:"isHidden"})}
}

function parseDate(str) {
    var parts = str.split('-');
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}
const isPastDay = (someDate) => {
    return (someDate - today) < 0
}

const isWeekend = (someDate) => {
    return someDate.getDay() == 0 || someDate.getDay() == 6
}
const isHoliday = (someDate) => {
    try {
        for (var i = 0; i < holidays.length; i++) {
            var holiday = new Date(holidays[i].day)
            if (isSameday(holiday, someDate)) {
                return true;
                break;
            }
        }

        return false
    } catch(e) {handleError(e, {location:"isHoliday"})}
}

const getShortWeekDay = (someDate) => {
    return text["weekDaysShort"][someDate.getDay()];
}

const getWeekDay = (someDate) => {
    return text["weekDays"][someDate.getDay()];
}

const getMonth = (someDate) => {
    return text["months"][someDate.getMonth()];
}
const getShortMonth = (someDate) => {
    return text["monthsShort"][someDate.getMonth()];
}

const isLastMonthDay = (someDate) => {
    var auxDate = new Date(someDate);
    auxDate.setDate(auxDate.getDate() + 1);
    return someDate.getMonth() < auxDate.getMonth()
}

const isFirstMonthDay = (someDate) => {
    //var auxDate = new Date( someDate - 24*60*60*1000);
    var auxDate = new Date(someDate);
    auxDate.setDate(auxDate.getDate() - 1);
    return someDate.getMonth() > auxDate.getMonth()
}

const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
}
const isSameday = (someDate, someDate2) => {
    return someDate.getDate() == someDate2.getDate() &&
        someDate.getMonth() == someDate2.getMonth() &&
        someDate.getFullYear() == someDate2.getFullYear()
}
const dateDiff = (someDate, someDate2) => {
    return Math.ceil(Math.abs(someDate2 - someDate) / (1000 * 60 * 60 * 24));
}

function filterObjects(array, filter) {
    try {
        return array.filter(function (item) {
            for (var key in filter) {
                if (item[key] === undefined || item[key] != filter[key])
                    return false;
            }
            return true;
        });
    } catch(e) {handleError(e, {location:"filterObjects"})}
}

function setData(location, key, value) {
    try {
        var data = getData(location) || {}
        data[key] = value
        localStorage.setItem(location, JSON.stringify(data))
    } catch(e) {handleError(e, {location:"setData"})}
}

const yyyymmdd2Date = (someDate) => {
    return new Date(someDate.substring(0, 4), parseInt(someDate.substring(4, 6)) - 1, parseInt(someDate.substring(6, 8)));
}

function changeTheme(theme) {
    try {
        var logic = theme.logic

        var sunrise_hs = window.sunhours.sunrise_hs
        var sunset_hs = window.sunhours.sunset_hs

        for (let index = 0; index < logic.length; index++) {
            const elem = logic[index]
            const h_start = eval(elem["start"])
            const h_end = eval(elem["end"])

            var now = new Date()
            var hs = (now.getHours() + now.getMinutes() / 60)

            if (hs > h_start && hs < h_end) {

                var random_index = Math.round(Math.random() * (elem["theme"].length - 1))
                var theme = elem["theme"][random_index]
                var theme_props = themes_properties[theme.props].properties
                var bgd_image = background_images[theme.bgdImage]

                $("body").removeClass("full-background")

                // theme props, colors
                for (var key in theme_props) {
                    if (theme_props.hasOwnProperty(key)) {
                        root.style.setProperty(key, theme_props[key]);
                    }
                }
                //load background image
                $(".container-photoby").hide()
                if (bgd_image) {
                    root.style.setProperty("--background-image-small", `url('${bgd_image.base64}')`);
                    var img = new Image();
                    //var bgdImg = theme_props[key].match(/(?:\(['|"]?)(.*?)(?:['|"]?\))/) != null ? theme_props[key].match(/(?:\(['|"]?)(.*?)(?:['|"]?\))/)[1] : undefined;
                    img.onload = function () {
                        root.style.setProperty("--background-image", `url('../${bgd_image.uri}')`);
                        $("body").addClass("full-background")
                        $(".container-photoby a").attr("href", bgd_image.url)
                        $(".container-photoby a").text(bgd_image.author)
                        $(".container-photoby").show()
                    };
                    img.src = bgd_image.uri
                }
            }
        }
    } catch(e) {handleError(e, {location:"change theme"})}
}


Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('');
};

Date.prototype.toShortISO = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        "-",
    (mm > 9 ? '' : '0') + mm,
        "-",
    (dd > 9 ? '' : '0') + dd
    ].join('');
};


