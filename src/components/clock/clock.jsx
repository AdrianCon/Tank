import { useState,useEffect,useRef } from 'react';
import { DateTime } from 'luxon'
import './clock.css'

const notificationAudio = new Audio('/notification.mp3')

export default function Clock(){
  const [sessionLength, setSessionLength] = useState(1);
  const [breakLength, setBreakLength] = useState(8);
  const [timerState, setTimerState] = useState('stop');
  const [dateDiff, setDateDiff] = useState(
    DateTime.now().plus({minutes: sessionLength}).diff(DateTime.now())
  );
  const dateDiffRef = useRef(
    DateTime.now().plus({minutes: sessionLength}).diff(DateTime.now())
  )
  useEffect(()=>{
    let interval = setInterval(() => {
      if(timerState === 'start'){
        if(parseInt(dateDiffRef.current.toFormat('m')) <= 0 && parseInt(dateDiffRef.current.toFormat('s')) < 1){
          setDateDiff(DateTime.now().plus({minutes: breakLength}).diff(DateTime.now()))
          dateDiffRef.current = DateTime.now().plus({minutes: breakLength}).diff(DateTime.now())
          setTimerState('stop')
          notificationAudio.play()
        } else {
          setDateDiff((state)=>state.minus({seconds: 1}))
          dateDiffRef.current = dateDiffRef.current.minus({seconds: 1})
        }
      } else if(timerState === 'stop'){
        setDateDiff(DateTime.now().plus({minutes: sessionLength}).diff(DateTime.now()))
        dateDiffRef.current = DateTime.now().plus({minutes: sessionLength}).diff(DateTime.now())
      }
    }, 1000);

    return () => {
      clearInterval(interval)
    }
  }, [timerState, sessionLength])

  function handleTimerState(state){
    setTimerState(state)
  }

  function handleStart(){
    if(timerState === 'stop'){
      const prepend = sessionLength.toString().length === 1 ? "0" : ""
      return (
        prepend + sessionLength + ":00"
        )
      } else{
        return(
          dateDiffRef.current.toFormat('mm:ss')
      )
    }
  }

  function handleSessionLengthChange(newSessionLength){
    if(newSessionLength > 0){
      setSessionLength(newSessionLength)
    }
  }

  return(
    <div className='clock-container'>
      <h1 className='clock-header'>{timerState !== 'break' ? 'Focus' : 'Break'}</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '20px',
          margin: 'auto'
        }}
      >
        <button
          className='length-buttons'
          onClick={()=>handleSessionLengthChange(sessionLength - 1)}
        >--</button>
        <h2 className="clock">
          {handleStart()}
        </h2>
        <button
          className='length-buttons'
          onClick={()=>handleSessionLengthChange(sessionLength + 1)}
        >+</button>
      </div>
      <div className="control-buttons">
        <button
          onClick={()=>handleTimerState(timerState === 'start'?  'pause' : 'start')}
        >{timerState === 'start'?  'Pause' : 'Start'}</button>
        <button
          onClick={()=>handleTimerState('stop')}
        >Stop</button>
      </div>
    </div>
  )
}