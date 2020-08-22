var date = new Date ();
const today = new Date()
let root = document.documentElement;
let app = document.getElementById("app");

init()
window.onload = function() {
    renderApp()
};

function init() {

    if (!getData("ac_user")) { localStorage.setItem("ac_user", JSON.stringify(config["user"])) }
    if (!getData("ac_settings")) { localStorage.setItem("ac_settings", JSON.stringify(config["settings"])) }
    if (!getData("ac_events")) { localStorage.setItem("ac_events", JSON.stringify(config["events"])) }

    window.layouts = [new Welcome(), new NextWeeks()]
    window.current_layout = 0; 

    // language
    var userLang = navigator.language || navigator.userLanguage; 
    window.text = texts[getData("ac_user")["language"]]["text"]
    
    // background
    //root.style.setProperty("--background-image", "url('https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg')")


}
function renderApp () {
    
    // space bar message
    if (!getData("ac_settings")["spaceBarUse"]) $(".container-space-bar").html(`${text["pressSpace"]} <span class="container-space-bar__space-bar blink">${text["space"]}</span> ${text["forNextView"]}`).show()

    // render
    layouts[0].render(".main")
    window.theme = themes[getData("ac_settings")["theme"]]
    changeTheme(theme)

    // space bar
    document.body.onkeyup = function(e){
        if(e.keyCode == 32 && !$(".modal-event").length && !$(".main-next").length) {

            setData ("ac_settings", "spaceBarUse", true); $(".container-space-bar").hide();

            $("#app").append("<div class='main-next'></div>")
            current_layout = current_layout == layouts.length-1 ? 0 : current_layout+1
            layouts[current_layout].render(".main-next")
            $(".main").on("animationend", function() {
                $(".main").remove()
                $(".main-next").attr("class", "main")
            }); 
            $(".main").addClass("main--slide-out")
            $(".main-next").addClass("main--slide-in")
                 
        }
    }

    $(".container-settings-btn__btn").click(function (e) {

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
                if (themes[key]["image"] != "" && themes[key]["image"] != undefined) {
                    t_style = `style="background-image:url('${themes[key]["image"]}');"`
                } else if (themes[key]["palette"].length) {
                    t_style = `style="background: linear-gradient(180deg, ${themes[key]["palette"][0]} 0%, ${themes[key]["palette"][0]} 25%, ${themes[key]["palette"][1]} 25%, ${themes[key]["palette"][1]} 50%, ${themes[key]["palette"][2]} 50%, ${themes[key]["palette"][2]} 75%, ${themes[key]["palette"][3]} 75%, ${themes[key]["palette"][3]} 100%);"`
                }
                var theme_node = `<div data-id='${key}' class='modal-settings__theme-container'><div ${t_style} class='modal-settings__theme'></div></div>`
                if (themes[key]["userAvailable"]) themes_options.push(theme_node)
            }
        }
        themes_options = themes_options.join('')

        $(".main").append(`
                <div class="modal-settings">
                    <header>
                    <div class="modal-settings__row">
                        <div class="col-6 left txt-left modal-settings_title"><i class="material-icons">settings</i>&nbsp;Settings</div>
                        <div class="col-6 right txt-right"><i class="material-icons modal-settings__btn-close">close</i></div>
                    </div>
                    </header>
                    <section>
                        <div class="modal-settings__section-title">Language</div>
                        <div class="modal-settings__row">
                        ${flags}
                        </div>
                    </section>
                    <section>
                        <div class="modal-settings__section-title">Theme</div>
                        <div class="modal-settings__row">
                        ${themes_options}
                        </div>
                    </section>
                    <footer>
                        <div class="modal-settings__row">
                            <div class="col-6 left txt-left"></div>
                            <div class="col-6 right txt-right"><input value="${text["save"]}" type="submit" /></div>
                        </div>
                    </footer>
                </div>
        `)
        
        // selected flag
        $(".modal-settings__language__flag[data-id='"+language+"']").addClass("modal-settings__language__flag--selected")
        $(".modal-settings__language__flag").click(function (e) {
            $(".modal-settings__language__flag").removeClass("modal-settings__language__flag--selected")
            $(e.target).addClass("modal-settings__language__flag--selected")
        })

        // selected theme
        $(".modal-settings__theme-container[data-id='"+theme_user+"']").addClass("modal-settings__theme-container--selected")
        $(".modal-settings__theme-container").click(function (e) {
            $(".modal-settings__theme-container").removeClass("modal-settings__theme-container--selected")
            $(e.target).closest(".modal-settings__theme-container").addClass("modal-settings__theme-container--selected")
        })

        $(".container-settings-btn__btn").hide()
        $(".modal-settings input[type='submit']").click(function () {
            setData("ac_user", "language", $(".modal-settings__language__flag--selected").attr("data-id"))
            setData("ac_settings", "theme", $(".modal-settings__theme-container--selected").attr("data-id"))
            $(".modal-settings").remove()
            $(".container-settings-btn__btn").show()
            init()
            renderApp()
        })

        $(".modal-settings .modal-settings__btn-close").click(function () {
            $(".modal-settings").remove()
            $(".container-settings-btn__btn").show()
        })
        $(".modal-settings").show()

    })
}


function parseDate(str) {
    var parts = str.split('-');
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
}

function checkTime (i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
const isPastDay = (someDate) => {
    return (someDate - today) < 0
}

const isWeekend = (someDate) => {
    return someDate.getDay() == 0 || someDate.getDay() == 6
}
const isHoliday = (someDate) => {
    for (var i=0; i < holidays.length; i++) {
        var holiday = new Date (holidays[i].day)
        if (isSameday(holiday, someDate)) {
            return true;
            break;
        }
    }
    
    return false
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

const isLastMonthDay = (someDate) => {
    var auxDate = new Date(someDate);
    auxDate.setDate(auxDate.getDate()+1);
    return someDate.getMonth() < auxDate.getMonth()
}

const isFirstMonthDay = (someDate) => {
    //var auxDate = new Date( someDate - 24*60*60*1000);
    var auxDate = new Date(someDate);
    auxDate.setDate(auxDate.getDate()-1);
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

function getData (key) {
    if (localStorage.getItem(key) != null) {
        return JSON.parse(localStorage.getItem(key))
    }
    return

}

function filterObjects (array, filter) {

    return array.filter(function(item) {
        for (var key in filter) {
          if (item[key] === undefined || item[key] != filter[key])
            return false;
        }
        return true;
    });
      
}

function setData (location, key, value) {
    var data = getData (location) || {}
    data[key] = value
    localStorage.setItem(location, JSON.stringify(data))
}

const yyyymmdd2Date = (someDate) => {
    return new Date(someDate.substring(0,4),parseInt(someDate.substring(4,6))-1,parseInt(someDate.substring(6,8)));
}

function changeTheme (theme) {
    var theme_props = theme["properties"]
    for (var key in theme_props) {
        if (theme_props.hasOwnProperty(key)) {
            root.style.setProperty(key, theme_props[key]);
        }
    }
}


Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('');
  };

  Date.prototype.toShortISO = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            "-",
            (mm>9 ? '' : '0') + mm,
            "-",
            (dd>9 ? '' : '0') + dd
           ].join('');
  };


