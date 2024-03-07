import { useState,useEffect,useRef } from 'react';
import { DateTime } from 'luxon'
import './clock.css'

const notificationAudio = new Audio('/notification.mp3')

export default function Clock(){
const [clockState, setClockState] = useState({
    sessionLength: 1,
    timerState: 'stop',
    dateDiff: DateTime.now().plus({minutes: 1}).diff(DateTime.now())
  
  })

  useEffect(()=>{
    let interval = setInterval(() => {
      if(clockState.timerState === 'start'){
        if(parseInt(clockState.dateDiff.toFormat('m')) <= 0 && parseInt(clockState.dateDiff.toFormat('s')) < 1){
          setClockState((state)=>({
            ...state,
            timerState: 'stop',
            dateDiff: DateTime.now().plus({minutes: clockState.sessionLength}).diff(DateTime.now())
          }))
          notificationAudio.play()
        } else {
          setClockState((state)=>({
            ...state,
            dateDiff: state.dateDiff.minus({seconds: 1})
          }))
        }
      } else if(clockState.timerState === 'stop'){
        setClockState((state)=>({
          ...state,
          dateDiff: DateTime.now().plus({minutes: clockState.sessionLength}).diff(DateTime.now())
        }))
      }
    }, 1000);

    return () => {
      clearInterval(interval)
    }
  }, [clockState])

  function handleTimerState(state){
    setClockState((prevState)=>({
      ...prevState,
      timerState: state
    }))
  }

  function handleStart(){
    if(clockState.timerState === 'stop'){
      const prepend = clockState.sessionLength.toString().length === 1 ? "0" : ""
      return (
        prepend + clockState.sessionLength + ":00"
        )
      } else{
        return(
          clockState.dateDiff.toFormat('mm:ss')
      )
    }
  }

  function handleSessionLengthChange(newSessionLength){
    if(newSessionLength > 0){
      setClockState((prevState)=>({
        ...prevState,
        sessionLength: newSessionLength,
        dateDiff: DateTime.now().plus({minutes: newSessionLength}).diff(DateTime.now())
      }))
    }
  }

  return(
    <div className='clock-container'>
      <h1 className='clock-header'>{clockState.timerState !== 'break' ? 'Focus' : 'Break'}</h1>
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
          onClick={()=>handleSessionLengthChange(clockState.sessionLength - 1)}
        >--</button>
        <h2 className="clock">
          {handleStart()}
        </h2>
        <button
          className='length-buttons'
          onClick={()=>handleSessionLengthChange(clockState.sessionLength + 1)}
        >+</button>
      </div>
      <div className="control-buttons">
        <button
          onClick={()=>handleTimerState(clockState.timerState === 'start'?  'pause' : 'start')}
        >{clockState.timerState === 'start'?  'Pause' : 'Start'}</button>
        <button
          onClick={()=>handleTimerState('stop')}
        >Stop</button>
      </div>
    </div>
  )
}