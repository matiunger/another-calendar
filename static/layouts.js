// LAYOUTS

class Welcome {
    constructor() {
        this.selector = ""
        var user_data = getData("ac_user")
        this.user_name = user_data["name"]
    }

    render(selector) {
        this.selector = selector
        document.querySelector(this.selector).innerHTML = `
        <div class="l-welcome">
            <div class="c-name"></div>
            <div class="c-clock"></div>
            <div class="c-sunhours"></div>
        </div>
        `
        new Clock(".c-clock")
        new Name(".c-name")
        new Sunhours(today, ".c-sunhours")
    }

}

class NextWeeks {
    constructor() {
        this.selector = ""
        this.date = new Date ();
        this.days_col = 24;
        this.past_days = 0;
    }

    render(selector) {
        this.date = new Date ();
        this.selector = selector
        var me = this
        document.querySelector(this.selector).innerHTML = `
        <div class="l-nextweeks">
            <header>Plan your next <span id=dynamic-word>weeks</span></header>
            <nav id="nav-prev" class="column"><</nav>
            <div class="column col1"></div>
            <div class="column col2"></div>
            <div class="column col3"></div>
            <nav id="nav-next" class="column">></nav>
        </div>
        `


        $("body").on("keyup", function(e){
            if(e.keyCode == 39){
                $(".l-nextweeks .column.col1, .l-nextweeks .column.col2, .l-nextweeks .column.col3").html("")
                me.date.setDate(me.date.getDate() - 3*me.days_col +1);
                me.renderDays ()
            }
        })
        $("body").on("keyup", function(e){
            if(e.keyCode == 37){
                $(".l-nextweeks .column.col1, .l-nextweeks .column.col2, .l-nextweeks .column.col3").html("")
                me.date.setDate(me.date.getDate() - 3*me.days_col-1);
                me.renderDays ()
            }
        })

        $("#nav-next").click(function () {
            $(".l-nextweeks .column.col1, .l-nextweeks .column.col2, .l-nextweeks .column.col3").html("")
            me.date.setDate(me.date.getDate() - 3*me.days_col +1);
            me.renderDays ()
        })
        $("#nav-prev").click(function () {
            $(".l-nextweeks .column.col1, .l-nextweeks .column.col2, .l-nextweeks .column.col3").html("")
            me.date.setDate(me.date.getDate() - 3*me.days_col-1);
            me.renderDays ()
        })

        this.date.setDate(this.date.getDate() - this.past_days);
        this.renderDays ()
    }
    renderDays () {
        this.fillDays(this.days_col, ".l-nextweeks .column.col1")
        this.fillDays(this.days_col, ".l-nextweeks .column.col2")
        this.fillDays(this.days_col, ".l-nextweeks .column.col3")
        this.renderHolidays (holidays)
        this.renderEvents (events)
    }
    fillDays (total_days, container) {
    
        var txt_class = total_days < 32 ? "txt-m" : "txt-s"
        
        for (var i=1; i <= total_days; i++) {
            // style
            var style = `height: ${100/total_days}%;`
            var classes = "day-row "+txt_class
            if (isPastDay(this.date)) classes += " past-day"
            if (isWeekend(this.date)) classes += " weekend"
            var h_month = "";
            if (isLastMonthDay(this.date)) {
                classes += " last-month-day"
            } else if (isFirstMonthDay(this.date)) {
                classes += " first-month-day"
                var h_month = getMonth(this.date)+" "+this.date.getFullYear().toString()
            }

            var day = `
            <div data-date="${this.date.yyyymmdd()}" class="${classes}" style="${style}">
                <div class='weekday'>${getWeekDay(this.date)}</div>
                <div class='day'>${checkTime(this.date.getDate())}</div>
                <div class='content'></div>
                <div class='month'>${h_month}</div>
            </div>
            `

            $(container).append(day)
            this.date.setDate(this.date.getDate() + 1);
        }
    }
    renderHolidays (holidays) {
        for (var i=0; i <= holidays.length-1; i++) {
            var d = parseDate(holidays[i]["day"])
            $(`.l-nextweeks [data-date='${d.yyyymmdd()}']`).addClass("weekend")
        }
    }
    renderEvents (events) {
        for (var i=0; i <= events.length-1; i++) {
            var d = parseDate(events[i]["day"])
            $(`.l-nextweeks [data-date='${d.yyyymmdd()}'] .content`).append(`<span class='e'>${events[i]["description"]}</span>`)
        }
        
    }
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
            if (document.querySelector(me.selector) == null) clearInterval(me.clock_interval)
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
            /*
            navigator.geolocation.getCurrentPosition(function (position) {
                me.lat = position.coords.latitude;
                me.lng = position.coords.longitude;
                me.getSunrise ()
                me.getSunset ()
            }, this.geoError);
            */
        }
        this.render()
        this.sunhours_interval = setInterval(function () {
            if (document.querySelector(me.selector) == null) clearInterval(me.clock_interval)
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
        } else if (hs < 15) {
            return `Focus. Don't Multitask<br />Maintain a good posture`
        
        
        } else if (hs < this.getSunset()[0]) {
            var rh = Math.floor(this.getSunset()[0]- hs)
            var rm = Math.floor((this.getSunset()[0]- hs - rh)*60)
            return `Remaining daylight in <strong>${rh}</strong>h <strong>${rm}</strong>m<br />
            Go for a walk. Get some sunlight`
        } else if (hs < 20) {
            return `Exercise`
        } else if (hs < 22) {
            return `Start turning the screens off`
        } else {
            return `Take a shower. Go to sleep`
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