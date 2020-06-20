var middle_days = 26;
var right_days = 34;
var past_days = 6;
var days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

var date = new Date ();
const today = new Date()

window.onload = function() {
    console.log("load")
    
    fillMiddle()
    fillRight()
};

function fillMiddle () {
    date.setDate(date.getDate() - past_days);
    for (var i=1; i <= middle_days; i++) {
        var style = "height: "+100/middle_days+"%;"
        var classes = "day-row txt-m"
        if (isPastDay(date)) classes += " past-day"
        if (isWeekend(date)) classes += " weekend"
        if (isLastMonthDay(date)) {classes += " last-month-day"} else if (isFirstMonthDay(date)) {classes += " first-month-day"}
        var h_week_day = "<span class='weekday'>"+getWeekDay(date)+"</span>"+"<span class='day'>"+date.getDate()+"."+(date.getMonth()+1)+"</span>"
        $(".column.middle").append("<div class='"+classes+"' style='"+style+"'>"+h_week_day+"</div>")
        date.setDate(date.getDate() + 1); 
    }
}

function fillRight () {
    for (var i=1; i <= right_days; i++) {
        var num = getWeekDay(date)+" "+date.getDate()+"."+date.getMonth()
        var style = "height: "+100/right_days+"%;"
        var classes = "day-row txt-s"
        if (isWeekend(date)) classes += " weekend"
        if (isLastMonthDay(date)) {classes += " last-month-day"} else if (isFirstMonthDay(date)) {classes += " first-month-day"}
        var h_week_day = "<span class='weekday'>"+getWeekDay(date)+"</span>"+"<span class='day'>"+date.getDate()+"."+(date.getMonth()+1)+"</span>"
        $(".column.right").append("<div class='"+classes+"' style='"+style+"'>"+h_week_day+"</div>")
        date.setDate(date.getDate() + 1);
    }
}

const isPastDay = (someDate) => {
    return (someDate - today) < 0
}

const isWeekend = (someDate) => {
    return someDate.getDay() == 0 || someDate.getDay() == 6
}

const getWeekDay = (someDate) => {
    return days[someDate.getDay()];
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