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
    'Tuta': 'https://app.tuta.com/login',
    'YouTube': 'https://www.youtube.com/',
    'Twitter': 'https://twitter.com/',
    'WhatsApp': 'https://web.whatsapp.com/',
    'Drive': 'https://drive.google.com/',
  },
  {
    'GitHub': 'https://github.com/',
    'Google Meet': 'https://meet.google.com/',
    'ClickUp': 'https://app.clickup.com/',
    'Cloudron': 'https://my.uxlabs.mx/#/apps',
    'Mail': 'https://mail.uxlabs.mx/',
  },
  {
    'ChatGPT': 'https://app.chatbot.com/',
    'Gemini': 'https://gemini.google.com/app',
    'LinkedIn': 'https://www.linkedin.com/',
    'DigitalOcean': 'https://cloud.digitalocean.com/',
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
]

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const linksRef = useRef(null);
  const timeInterval = useRef(null);
  // const pGenerate = useRef(null);

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
  //   console.log('clearing interval');
  //   clearInterval(pGenerate.current);
  //   pGenerate.current = null;
  //   if(pGenerate.current === null){
  //     console.log('setting interval');
  //     pGenerate.current = setInterval(() => {
  //       const newTimeElement = document.createElement('p');
  //       newTimeElement.textContent = `${time}`;
  //       newTimeElement.classList.add('header-text-background'); // Using classList for class addition
  //       document.getElementById('header').append(newTimeElement);
  //     }, 1000);
  //   }

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
              rel='noreferrer'
              onMouseEnter={(e) => {
                e.target.style.color = getRandomColor(i);
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'black';
              }}
            >{name}</a>
          ))}
        </aside>
        <div className='header' id='header'>
          <p className='header-text'>{time}</p>
          {[...Array(30)].map((_, i) => (
            <p
              key={`header-text${i}`}
              opacity={100-i*3}
              className='header-text-background'
              style={{
                marginTop: `${i*15}px`,
                fontSize: `${300-i*3}px`,
                opacity: `${100-i*3}%`,
                // animation: `melt 5s infinite linear`,
                // animationDelay: `${5/i}s`,
              }}>
                {DateTime.now().toFormat('HH:mm')}
            </p>
          ))}
        </div>
        <UtilitiesAside />
      </main>
    </>
  )
}

export default App
