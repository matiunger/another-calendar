
import '../css/Clock.css';
import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { Trans } from 'react-i18next';

function Clock(props) {

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timerID = setInterval( () => tick(), 1000 );
  
    return function cleanup() {
        clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }

  return (
    <div className="clock">
      <Trans i18nKey="itis">It is </Trans>
      {date.toLocaleTimeString()}.
    </div>
  );
}

export default Clock

