import React, { useState } from 'react';
import '../css/Welcome.css';
import Clock from './Clock';
import SunHours from './SunHours';
import {logEvent} from './analytics';

function Welcome(props) {

  const [timerTime, setTimerTime] = useState(null);

  let clockDragStart = false;
  let clockNearStart = false;

  let clockDragStartCoords = { x: null, y: null };

  const centerCoords = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const topCoords = { x: window.innerWidth / 2, y: 0 };



  const mouseUp = (e) => {
    if (clockDragStart && clockNearStart) {

      const endX = e.clientX
      const endY = e.clientY
      const endCoords = { x: endX, y: endY }

      document.getElementById("timer-tooltip").style.display = "none";
      document.getElementById("welcome").classList.remove("welcome--add-timer-cursor");
      document.getElementById("clock").classList.remove("welcome--clock-light");
      clockDragStart = false

      const minutes = getTimeFromMouse(endCoords).minutes

      setTimerTime(minutes * 60)
      document.getElementById('timer-on').play();
      logEvent("ui_interaction", {
        "section": "clock",
        "subsection": "timer",
        "action": "add",
        "element": "timer",
        "value" : minutes
      })
    }
  }

  const mouseDownClock = (e) => {
    clockDragStart = true
    clockDragStartCoords = { x: e.clientX, y: e.clientY }
  }

  const mouseMove = (e) => {
    if (clockDragStart) {

      const moveX = e.clientX
      const moveY = e.clientY
      const moveCoords = { x: moveX, y: moveY }
      var a = clockDragStartCoords.x - moveX;
      var b = clockDragStartCoords.y - moveY;
      var distance = Math.sqrt(a * a + b * b);

      let cursorTooltip = document.getElementById("timer-tooltip")
      if (!clockNearStart && distance > 100) {
        cursorTooltip.style.display = "flex";
        document.getElementById("welcome").classList.add("welcome--add-timer-cursor");
        document.getElementById("clock").classList.add("welcome--clock-light");
        clockNearStart = true
      }
      if (clockNearStart) {
        cursorTooltip.style.left = (e.clientX + 40) + 'px';
        cursorTooltip.style.top = e.clientY + 'px';
        cursorTooltip.innerText = getTimeFromMouse(moveCoords).strTime
      }
    }
  }

  const getAngleBetweenLines = (line1p1, line1p2, line2p1, line2p2) => {
    const dAx = line1p2.x - line1p1.x;
    const dAy = line1p2.y - line1p1.y;
    const dBx = line2p2.x - line2p1.x;
    const dBy = line2p2.y - line2p1.y;
    let angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
    if(angle < 0) {angle = angle * -1;}
    return angle * (180 / Math.PI);
  }

  const getTimeFromMouse = (coords) => {
    let angle = getAngleBetweenLines(centerCoords, topCoords, centerCoords, coords)
    const minutes = parseInt(angle*2/3)
    const hs = Math.floor(minutes / 60)
    const min = minutes - hs * 60
    return {
      minutes: minutes,
      strTime: hs + "·" + min
    }
  }

  return (
    <div id="welcome" onMouseUp={(e) => mouseUp(e)} onMouseMove={(e) => mouseMove(e)}>
      <div id="timer-tooltip"></div>
      <audio id="timer-on" preload="auto"><source src="/sounds/click-tone.wav" type="audio/wav"/></audio>
      <Clock onMouseDown={mouseDownClock} timerTime={timerTime} />
      {props.locationOn ? <SunHours times={props.times} moonIllumination={props.moonIllumination} /> : null}
      
    </div>
  );
}


export default Welcome
