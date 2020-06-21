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
    startClock ()
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
    startGeo()


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

function startClock () {
    updateClock ()
    clock_interval = setInterval(function () {
        updateClock ()
    }, 1000);
}
function updateClock () {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = h + ":" + m + "<span class='seconds'>" + s + "</span>";
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}



// GEO
var geocoder;
function startGeo() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    } 
}
  
//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    console.log(lat+" "+lng)
}

function errorFunction(){
    alert("Geocoder failed");
}