import './Nav.css'

const tabs = [
  'Common',
  'Work',
  'Misc',
  'Stream',
]

export default function Nav({handleTabClick, selectedTab}){
  return (
    <nav>
        <ul>
        {tabs.map((tab, i) => (
          <li key={i} className={`tab ${selectedTab === i ? 'selected': ''}`} onClick={()=>handleTabClick(i)}>
            {tab}
          </li>
        ))}
        </ul>
      </nav> 
  )
}