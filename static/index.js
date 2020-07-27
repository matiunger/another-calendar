var date = new Date ();
const today = new Date()
let root = document.documentElement;
let app = document.getElementById("app");
var layouts = [new Welcome(), new NextWeeks()]
var current_layout = 0; 

window.onload = function() {
    root.style.setProperty('--background-image', "url('')");
    
    // data
    var user_data = getData("ac_user")

    // render
    layouts[0].render(".main")

    // space bar
    document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            $("#app").append("<div class='new'></div>")
            current_layout = current_layout == layouts.length-1 ? 0 : current_layout+1
            layouts[current_layout].render(".new")
            $(".main").on("animationend", function() {
                $(".main").remove()
                $(".new").attr("class", "main")
            }); 
            $(".main").addClass("slide-out")
            $(".new").addClass("slide-in")
                 
        }
    }

    
};









var days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var holidays = [
    {day: "2020-08-17 01:00",
    motive:""},
    {day: "2020-10-12 01:00",
    motive:"Puente turistico"},
    {day: "2020-11-23 01:00",
    motive:"Puente turistico"},
    {day: "2020-12-07 01:00",
    motive:"Puente turistico"},
    {day: "2020-12-08 01:00",
    motive:"Concepcion de Maria"},
    {day: "2020-12-25 01:00",
    motive:"Navidad"}
]
var events = [
    {day: "2020-07-14 01:00",
    motive:"Ingles"}
]





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







