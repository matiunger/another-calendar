var date = new Date ();
const today = new Date()
let root = document.documentElement;
let app = document.getElementById("app");

if (!getData("ac_user")) { localStorage.setItem("ac_user", JSON.stringify(config["user"])) }
if (!getData("ac_settings")) { localStorage.setItem("ac_settings", JSON.stringify(config["settings"])) }
if (!getData("ac_events")) { localStorage.setItem("ac_events", JSON.stringify(config["events"])) }

var layouts = [new Welcome(), new NextWeeks()]
var current_layout = 0; 

// theme
theme = themes[getData("ac_settings")["theme"]]
changeTheme(theme)

// background
//root.style.setProperty("--background-image", "url('https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg')")


window.onload = function() {
    //
    
    // data

    if (!getData("ac_settings")["spaceBarUse"]) $(".container-space-bar").show()

    // render
    layouts[0].render(".main")

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

    
};


var week_days_short = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
var week_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



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
    return week_days_short[someDate.getDay()];
}

const getWeekDay = (someDate) => {
    return week_days[someDate.getDay()];
}

const getMonth = (someDate) => {
    return months[someDate.getMonth()];
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
    for (var key in theme) {
        if (theme.hasOwnProperty(key)) {
            root.style.setProperty(key, theme[key]);
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


