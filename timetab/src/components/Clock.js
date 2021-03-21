import '../css/Clock.css';
import React, { useState, useEffect, useRef } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


function Clock(props) {

  const [date, setDate] = useState(new Date());
  const [timerTime, setTimerTime] = useState(props.timerTime); // seconds
  const [timerTimeRemaining, setTimerTimeRemaining] = useState(props.timerTime);

  useInterval(() => {
    // Your custom logic here
    setDate(new Date());
    if (timerTimeRemaining > 0) { setTimerTimeRemaining(timerTimeRemaining - 1) }
    if (timerTimeRemaining < 0) {
      stopTimer()
    }

  }, 1000);

  const stopTimer = () => {
      setTimerTime(null)
      setTimerTimeRemaining(null)
  }

  // transfer prop changes to state
  const previousTimerTimeRef = useRef();
  const previousTimerTime = previousTimerTimeRef.current;
  if (props.timerTime !== previousTimerTime && props.timerTime !== timerTime) {
    setTimerTime(props.timerTime);
    if (props.timerTime) { setTimerTimeRemaining(props.timerTime); }
  }
  useEffect(() => {
    previousTimerTimeRef.current = props.timerTime;
  });

  return (
    <React.Fragment>
      <div id="clock" style={{"display": timerTimeRemaining ? "none" : "block"}} className="clock" onMouseDown={props.onMouseDown}><Moment format="H·mm" date={date}></Moment></div>
      <div id="timer" onClick={() => stopTimer()} className="timer" style={{"display": timerTimeRemaining ? "block" : "none"}}>
        {timerTimeRemaining ? <Moment tz="UTC" format={timerTimeRemaining > 3600 ? "HH·mm·ss" : "mm·ss"} date={new Date(timerTimeRemaining*1000)}></Moment> : null}
      </div>
    </React.Fragment>
  );
}

export default Clock

