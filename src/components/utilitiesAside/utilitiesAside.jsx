import './utilitiesAside.css'
import Clock from '../clock/clock';
import Tasks from '../Tasks/Tasks';

export default function UtilitiesAside(){
  return(
    <aside className="utilities-aside">
      <Clock />
      <Tasks />
    </aside>
  )
}