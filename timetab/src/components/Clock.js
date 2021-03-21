import '../css/Clock.css';
import { useState, useEffect } from 'react';
import Moment from 'react-moment';

function Clock() {

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timerID = setInterval( () => tick(), 2000 );
  
    return function cleanup() {
        clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }

  return (
    <div className="clock">
      <Moment format="H·mm" date={date}></Moment>
    </div>
  );
}

export default Clock

