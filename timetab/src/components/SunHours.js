
import '../css/SunHours.css';
import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

function SunHours(props) {

  const times = props.times
  const moonIllumination = props.moonIllumination
  const now = new Date()
  const [date, setDate] = useState(new Date());

  document.documentElement.style.setProperty("--moon-i", moonIllumination.fraction);
  const sunriseHours = times.sunrise.getHours() + times.sunrise.getMinutes() / 60
  const sunsetHours = times.sunset.getHours() + times.sunset.getMinutes() / 60

  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000 * 60);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }

  return (
    <div className="c-sun-hours">
      <div className="sun-hours__hours">
        <div className="sun-hours__hours__hour" style={{ "left": (100 * sunriseHours / 24).toString()+"%" }}><WbSunnyIcon className="icon" style={{ fontSize: 24 }} /><Moment format="hh·mm" date={times.sunrise}></Moment></div>
        <div className="sun-hours__hours__hour" style={{ "left": (100 * sunsetHours / 24).toString() + "%" }}><i className="moon-icon icon"><span className="moon-icon__moon"></span></i><Moment format="hh·mm" date={times.sunset}></Moment></div>
      </div>
      <div className="sun-hours__container-lines">
        <div className="sun-hours__container-lines__lines" style={{ "left": (100 * sunriseHours / 24).toString() + "%" , "width": (100 * (sunsetHours - sunriseHours) / 24).toString() + "%"}} ></div>
      </div>
      <div className="sun-hours__night-bar">
        <div className="sun-hours__night-bar__now-bar" style={{"width" : (100 * (now.getHours() + now.getMinutes() / 60) / 24).toString()+"%"}}><div className="sun-hours__night-bar__now-bar__fill"></div></div>
        <div className="sun-hours__night-bar__day-bar" style={{ "left": (100 * sunriseHours / 24).toString() + "%", "width": (100 * (sunsetHours - sunriseHours) / 24).toString() + "%"}}></div>
      </div>
      <div className="sun-hours__info"></div>
    </div>
  );
}

export default SunHours

