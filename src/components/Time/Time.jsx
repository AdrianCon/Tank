import { useState, useEffect, useRef } from "react";
import { DateTime } from "luxon";

export default function Time() {
  const [time, setTime] = useState(DateTime.now().toFormat("HH:mm"));
  const timeInterval = useRef(null);
  
  useEffect(() => {
    timeInterval.current = setInterval(() => {
      setTime(DateTime.now().toFormat("HH:mm"));
    }, 1000);

    return () => clearInterval(timeInterval.current);
  }, []);

  return (
    <div className="header" id="header">
      <p className="header-text">{time}</p>
      {[...Array(30)].map((_, i) => (
        <p
          key={`header-text${i}`}
          opacity={100 - i * 3}
          className="header-text-background"
          style={{
            "--index": `${i}`,
          }}
        >
          {DateTime.now().toFormat("HH:mm")}
        </p>
      ))}
    </div>
  )
}