const tabs = [
  'Social',
  'Stream',
  'Work',
  'Misc',
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