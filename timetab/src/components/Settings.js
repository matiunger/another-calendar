
import '../css/Settings.css';
import { useState, useEffect } from 'react';
import Moment from 'react-moment';

function Settings(props) {

  /*
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
  */
  return (
    <div className="">
      <p>Settings</p>
      <p onClick={() => props.closeSettings()}>close</p>
    </div>
  );
}

export default Settings

