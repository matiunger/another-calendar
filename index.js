var middle_days = 25;
var right_days = 25;
var past_days = 0;
var days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var feriados = [
    {day: "2020-07-09 01:00",
    motive:"Día de la independencia"},
    {day: "2020-07-10 01:00",
    motive:"Puente turistico"}
]

var date = new Date ();
const today = new Date()
let root = document.documentElement;


window.onload = function() {
    root.style.setProperty('--background-image', "url('')");
    
    new Clock("#clock")
    new Sunhours(today, "#sunhours")
    new Name("#welcome")
    //data

    var user_data = getData("ac_user")

    
    // calendar
    date.setDate(date.getDate() - past_days);
    fillDays(middle_days, ".column.middle")
    fillDays(right_days, ".column.right")

    $("#nav-next").click(function () {
        $(".column.middle").html("")
        $(".column.right").html("")
        date.setDate(date.getDate() - right_days);
        fillDays(middle_days, ".column.middle")
        fillDays(right_days, ".column.right")
    })
    $("#nav-prev").click(function () {
        $(".column.middle").html("")
        $(".column.right").html("")
        date.setDate(date.getDate() - right_days - 2*middle_days);
        fillDays(middle_days, ".column.middle")
        fillDays(right_days, ".column.right")
    })
};

const fillDays = (total_days, container) => {
    
    var txt_class = total_days < 32 ? "txt-m" : "txt-s"
    
    for (var i=1; i <= total_days; i++) {
        // style
        var style = `height: ${100/total_days}%;`
        var classes = "day-row "+txt_class
        if (isPastDay(date)) classes += " past-day"
        if (isWeekend(date) || isFeriado(date)) classes += " weekend"
        var h_month = "";
        if (isLastMonthDay(date)) {
            classes += " last-month-day"
        } else if (isFirstMonthDay(date)) {
            classes += " first-month-day"
            var h_month = `<span class='month'>${getMonth(date)} ${date.getFullYear().toString()}</span>`
        }

        // content
        var h_week_day = "<span class='weekday'>"+getWeekDay(date)+"</span>"+"<span class='day'>"+checkTime(date.getDate())+"</span>"
        var h_content = "<span class='content'>";
        //if (isFeriado(date)) h_content += `<i class='material-icons md-18'>beach_access</i>`
        
        h_content += "</span>"
        $(container).append("<div class='"+classes+"' style='"+style+"'>"+h_week_day+h_content+h_month+"</div>")
        date.setDate(date.getDate() + 1);
    }
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
const isFeriado = (someDate) => {
    for (var i=0; i < feriados.length; i++) {
        var feriado = new Date (feriados[i].day)
        if (isSameday(feriado, someDate)) {
            return true;
            break;
        }
    }
    
    return false
}

const getWeekDay = (someDate) => {
    return days[someDate.getDay()];
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


function getData (key) {
    if (localStorage.getItem(key) != null) {
        return JSON.parse(localStorage.getItem(key))
    } else {
        localStorage.setItem(key, "{}")
        return {}
    }

}
function setData (location, key, value) {
    var data = getData (location)
    data[key] = value
    localStorage.setItem(location, JSON.stringify(data))
}



// WIDGETS

class Name {
    constructor(selector) {
        this.selector = selector
        var user_data = getData("ac_user")
        this.user_name = user_data["name"]
        if (this.user_name) {
            this.renderWelcome()    
        } else {
            this.renderInput()
        }
    }

    renderWelcome() {
        document.querySelector(this.selector).innerHTML = `<h2>Hey, <span class="welcome-name">${this.user_name}</span></h2>`
        var me = this
        document.querySelector(this.selector+" .welcome-name").addEventListener("click", function () {
            me.renderInput()
        })
    }
    renderInput() {
        var me = this
        document.querySelector(this.selector).innerHTML = `
            <h2>Hey, whats your name?</h2>
            <input type="text" name="name" class="name"></input>
        `
        var input = document.querySelector(this.selector+" input[name='name']")
        if (this.user_name) input.value = this.user_name
        input.focus()
        input.addEventListener("focusout", function () { me.validateInput() })
        input.addEventListener("keypress", function (e) { if (e.keyCode == 13) me.validateInput() })  
    }
    validateInput() {
        var input_name = document.querySelector(this.selector+" input[name='name']").value
        if (input_name != "") {
            this.user_name = input_name
            setData ("ac_user", "name", input_name)
            this.renderWelcome()
        }
    }

}


class Clock {
    constructor(selector) {
        this.selector = selector
        this.updateClock ()
        var me = this
        this.clock_interval = setInterval(function () {
            me.updateClock ()
        }, 1000);
    }

    updateClock() {
        var now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();
        var s = now.getSeconds();
        m = this.checkTime(m);
        s = this.checkTime(s);
        document.querySelector(this.selector).innerHTML = h + ":" + m + "<span class='seconds'>" + s + "</span>";
    }
    checkTime (i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }
}

class Sunhours {

    // TODO: Add moon phases
    constructor(date, selector) {
        this.selector = selector
        this.date = date
        this.timezone = -date.getTimezoneOffset()/60
        this.lat = -34.5417;
        this.lng = -58.6153;
        var me = this
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                me.lat = position.coords.latitude;
                me.lng = position.coords.longitude;
                me.getSunrise ()
                me.getSunset ()
            }, this.geoError);
        }
        this.render()
        this.sunhours_interval = setInterval(function () {
            me.render()
        }, 60*1000);
        this.getMoonPhase()
    }

    fyear() {
        var year = this.date.getFullYear();
        var start = new Date(year, 0, 0);
        var diff = this.date - start;
        var day = Math.floor(diff / (1000 * 60 * 60 * 24));
        var total_days = (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) ? 366 : 365;
        return (2*Math.PI*(day -1 + (0-12)/24) / total_days)
    }

    decl () {
        return 0.006918 - 0.399912*Math.cos(this.fyear()) + 0.070257*Math.sin(this.fyear()) - 0.006758*Math.cos(2*this.fyear()) + 0.000907*Math.sin(2*this.fyear()) - 0.002697*Math.cos(3*this.fyear()) + 0.00148*Math.sin(3*this.fyear())
    }

    eqtime () {
        return 229.18*(0.000075 + 0.001868*Math.cos(this.fyear()) - 0.032077*Math.sin(this.fyear()) - 0.014615*Math.cos(2*this.fyear())- 0.040849*Math.sin(2*this.fyear()))
    }

    ha() {
        return Math.acos( Math.cos(90.833*Math.PI/180)/Math.cos(this.lat*Math.PI/180)/Math.cos(this.decl()) -Math.tan(this.lat*Math.PI/180)*Math.tan(this.decl()) )
    }

    getSunrise () {
        var hs = (720-4*(this.lng+this.ha()*180/Math.PI)-this.eqtime())/60+this.timezone
        var h = Math.floor(hs)
        var m = Math.round((hs-h)*60)
        return [hs, this.checkTime(h)+":"+this.checkTime(m)]
    }
    getSunset () {
        var hs = (720-4*(this.lng-this.ha()*180/Math.PI)-this.eqtime())/60+this.timezone
        var h = Math.floor(hs)
        var m = Math.round((hs-h)*60)
        return [hs, this.checkTime(h)+":"+this.checkTime(m)]
    }

    getRemainingDaylight () {
        var now = new Date()
        var hs = (now.getHours()+now.getMinutes()/60)
        if (hs < this.getSunrise()[0]) {
            var rh = Math.floor(this.getSunrise()[0]- hs)
            var rm = Math.floor((this.getSunrise()[0]- hs - rh)*60)
            return `Sunrise in <strong>${rh}</strong>h <strong>${rm}</strong>m`
        } else if (hs < this.getSunset()[0]) {
            var rh = Math.floor(this.getSunset()[0]- hs)
            var rm = Math.floor((this.getSunset()[0]- hs - rh)*60)
            return `Remaining daylight in <strong>${rh}</strong>h <strong>${rm}</strong>m`
        } else {
            return `Go to sleep`
        }
        var h = Math.floor(hs)
        var m = Math.round((hs-h)*60)
        return [hs, this.checkTime(h)+":"+this.checkTime(m)]
    }

    geoError() {
        console.log("no geo")
    }
    checkTime (i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }

    render () {
        var now = new Date()
        document.querySelector(this.selector).innerHTML = `
        <div class="hours">
            <div class="hour" style="left:${100*this.getSunrise()[0]/24}%;"><i class="material-icons icon">wb_sunny</i> ${this.getSunrise()[1]}</div>
            <div class="hour" style="left:${100*this.getSunset()[0]/24}%;"><i class="moon-icon icon"><span class="moon"></span></i>${this.getSunset()[1]}</div>
        </div>
        <div class="sunhours-container-lines">
            <!-- <div class="now-line" style="left:${100*(now.getHours()+now.getMinutes()/60)/24}%"></div> -->
            <div class="sunhours-lines" style="left:${100*this.getSunrise()[0]/24}%; width:${100*(this.getSunset()[0]-this.getSunrise()[0])/24}%;"></div>
        </div>
        <div class="nightbar">
            <div class="nowbar" style="width:${100*(now.getHours()+now.getMinutes()/60)/24}%;"></div>
            <div class="daybar" style="left:${100*this.getSunrise()[0]/24}%; width:${100*(this.getSunset()[0]-this.getSunrise()[0])/24}%;"></div>
        </div>
        <div class="info">${this.getRemainingDaylight()}</div>`;

    }

    getMoonPhase() {

        var year = this.date.getFullYear()
        var month = this.date.getMonth()+1
        var day = this.date.getDate()
        if (month < 3) { year--; month += 12;}

        var a = Math.floor(year/100)
        var b = Math.floor(a/4)
        var c = 2-a+b
        var e = Math.floor(365.25 * (year + 4716))
        var f = Math.floor(30.6001 * (month+1))

        var jd = c + day + e + f - 1524.5;
        var cycles = (jd-2451549.5)/29.53
        var moon_i = cycles - Math.floor(cycles)

        if (moon_i < 0.5) {
            moon_i = 2*moon_i
        } else {
            moon_i = 2*moon_i - 2
        }

        root.style.setProperty('--moon-i', moon_i);

    }

}


