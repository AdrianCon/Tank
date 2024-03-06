import { useEffect, useRef, useState } from 'react'
import './App.css'
import UtilitiesAside from './components/utilitiesAside/utilitiesAside';
import { DateTime } from 'luxon'
import Nav from './components/Nav/Nav';

const colors = [
  '#FE0000',
  '#3381F9',
  '#E64B86',
  '#00850F',
  '#FFC501',
];


const LINKS = [
  {
    'YouTube': 'https://www.youtube.com/',
    'Facebook': 'https://www.facebook.com/',
    'Twitter': 'https://twitter.com/',
    'Instagram': 'https://www.instagram.com/',
    'LinkedIn': 'https://www.linkedin.com/',
  },
  {
    'Netflix': 'https://www.netflix.com/',
    'Crunchyroll': 'https://www.crunchyroll.com/',
    'Prime Video': 'https://www.primevideo.com/',
    'Disney+': 'https://www.disneyplus.com/',
    'Star+': 'https://www.starplus.com/',
    'MUBI': 'https://mubi.com/',
    'Max': 'https://www.hbomax.com/',
  },
  {
    'GitHub': 'https://github.com/',
    'Google Meet': 'https://meet.google.com/',
    'ClickUp': 'https://app.clickup.com/',
    'Cloudron': 'https://my.uxlabs.mx/#/apps',
    'Mail': 'https://mail.uxlabs.mx/',
  },
  {
    'Tuta': 'https://app.tuta.com/login',
    'ChatGPT': 'https://app.chatbot.com/',
    'DigitalOcean': 'https://cloud.digitalocean.com/',
  },
]

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const linksRef = useRef(null);
  const timeInterval = useRef(null);
  const pGenerate = useRef(null);

  const [time, setTime] = useState(DateTime.now().toFormat('HH:mm'));

  useEffect(() => {
    timeInterval.current = setInterval(() => {
      setTime(DateTime.now().toFormat('HH:mm'));
    }, 1000);
    return () => clearInterval(timeInterval.current);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      switch (key) {
          case '1':
            handleTabClick(0);
            break;
          case '2':
            handleTabClick(1);
            break;
          case '3':
            handleTabClick(2);
            break;
          case '4':
            handleTabClick(3);
            break;
          default:
            break;
      }
    };
    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };

}, []);


const handleTabClick = (i) => {
  clearTimeout(linksRef.current);
  document.getElementById('links').classList.add('animate');
  setSelectedTab(i);
  linksRef.current = setTimeout(() => {
    document.getElementById('links').classList.remove('animate');
  }, 1000);
}
  
  // useEffect(() => {
  //   clearInterval(pGenerate.current);
  //   pGenerate.current = null;
    
  //   pGenerate.current = setInterval(() => {
  //     const newTimeElement = document.createElement('p');
  //     newTimeElement.textContent = `${time}`;
  //     newTimeElement.classList.add('header-text-background'); // Using classList for class addition
  //     document.getElementById('header').append(newTimeElement);
  //   }, 1000);

  //   return () => clearInterval(pGenerate.current);
  // }, [time]);

  const getRandomColor = (i) => {
    const randomIndex = i % colors.length;
    return colors[randomIndex];
  };

  return (
    <>
      <Nav handleTabClick={handleTabClick} selectedTab={selectedTab} />
      <main id='content' className='content'>
        <aside id='links' className='links'>
          {Object.entries(LINKS[selectedTab]).map(([name, url],i) => (
            <a
              key={name}
              className='link'
              href={url}
              target='_blank'
              rel='noreferrer'
              onMouseEnter={(e) => {
                e.target.style.color = getRandomColor(i);
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'black';
              }}
              // style={{color: selectedTab == i ? hoverColor: 'black'}}
            >{name}</a>
          ))}
        </aside>
        <div className='header' id='header'>
          <p className='header-text'>{time}</p>
          <p
              key={`header-text`}
              className='header-text-background base'
              style={{
                animation: 'none !important'
              }}>
                {time}
            </p>
          {/* {[...Array(50)].map((_, i) => (
            <p
              key={`header-text${i}`}
              opacity={100-i*3}
              className='header-text-background'
              style={{
                marginTop: `${i*15}px`,
                opacity: `${100-i*3}%`,
                // fontSize: `${300-i*3}px`,
              }}>
                {DateTime.now().toFormat('HH:mm')}
            </p>
          ))} */}
          <span/>
        </div>
        <UtilitiesAside />
      </main>
    </>
  )
}

export default App
