var middle_days = 33;
var right_days = 33;
var past_days = 3;
var days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var feriados = [
    {day: "2020-07-09 01:00",
    motive:"Día de la independencia"},
    {day: "2020-07-10 01:00",
    motive:"Puente turistico"}
]

var date = new Date ();
const today = new Date()

window.onload = function() {
    new Clock("#clock")
    new Sunhours(today)
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
        var style = "height: "+100/total_days+"%;"
        var classes = "day-row "+txt_class
        if (isPastDay(date)) classes += " past-day"
        if (isWeekend(date) || isFeriado(date)) classes += " weekend"
        var h_month = "";
        if (isLastMonthDay(date)) {
            classes += " last-month-day"
        } else if (isFirstMonthDay(date)) {
            classes += " first-month-day"
            var h_month = "<span class='month'>"+getMonth(date).toUpperCase()+" "+date.getFullYear().toString().substring(2)+"</span>"
        }

        // content
        var h_week_day = "<span class='weekday'>"+getWeekDay(date)+"</span>"+"<span class='day'>"+date.getDate()+"</span>"
        var h_content = "<span class='content'></span>"
        
        
        $(container).append("<div class='"+classes+"' style='"+style+"'>"+h_week_day+h_content+h_month+"</div>")
        date.setDate(date.getDate() + 1);
    }
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



// WIDGETS

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
    constructor(date) {
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
        console.log(this.checkTime(h)+":"+this.checkTime(m))
    }
    getSunset () {
        var hs = (720-4*(this.lng-this.ha()*180/Math.PI)-this.eqtime())/60+this.timezone
        var h = Math.floor(hs)
        var m = Math.round((hs-h)*60)
        console.log(this.checkTime(h)+":"+this.checkTime(m))
    }

    geoError() {
        console.log("no geo")
    }
    checkTime (i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }
}


