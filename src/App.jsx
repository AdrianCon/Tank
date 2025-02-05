import { useEffect, useRef, useState } from "react";
import "./App.css";
import UtilitiesAside from "./components/utilitiesAside/utilitiesAside";
import { DateTime } from "luxon";
import Nav from "./components/Nav/Nav";
import { useSelector, useDispatch } from "react-redux";
import { setTab } from "./redux/tabSlice.js/tabSlice.js";
import Loader from "./components/Loader/Loader.jsx";
import GoogleButton from "./components/GoogleButton/GoogleButton.jsx";
import gmail from "./assets/icons8-gmail.svg";
import drive from "./assets/icons8-google-drive.svg";
import calendar from "./assets/icons8-google-calendar.svg";
import maps from "./assets/icons8-google-maps-old.svg";
import keep from "./assets/icons8-google-keep.svg";
import translate from "./assets/icons8-google-translate-new.svg";
import photos from "./assets/icons8-google-photos.svg";
import books from "./assets/icons8-google-books.svg";

const colors = ["#FE0000", "#3381F9", "#E64B86", "#00850F", "#FFC501"];

const LINKS = [
  {
    Tuta: "https://app.tuta.com/login",
    YouTube: "https://www.youtube.com/",
    Twitter: "https://twitter.com/",
    WhatsApp: "https://web.whatsapp.com/",
  },
  {
    GitHub: "https://github.com/",
    "Google Meet": "https://meet.google.com/",
    ClickUp: "https://app.clickup.com/",
    Cloudron: "https://my.uxlabs.mx/#/apps",
    Mail: "https://mail.uxlabs.mx/",
  },
  {
    LeetCode: "https://leetcode.com/",
    KodeKloud: "https://www.kodekloud.com/",
    Gemini: "https://gemini.google.com/app",
    LinkedIn: "https://www.linkedin.com/",
    DigitalOcean: "https://cloud.digitalocean.com/",
  },
  {
    Netflix: "https://www.netflix.com/",
    Crunchyroll: "https://www.crunchyroll.com/",
    "Prime Video": "https://www.primevideo.com/",
    "Disney+": "https://www.disneyplus.com/",
    "Star+": "https://www.starplus.com/",
    MUBI: "https://mubi.com/",
    Max: "https://www.hbomax.com/",
  },
];

function App() {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.tab);
  const timeInterval = useRef(null);
  // const pGenerate = useRef(null);
  const [weather, setWeather] = useState(null);

  const [time, setTime] = useState(DateTime.now().toFormat("HH:mm"));

  useEffect(() => {
    timeInterval.current = setInterval(() => {
      setTime(DateTime.now().toFormat("HH:mm"));
    }, 1000);

    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&q=Monterrey`
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setWeather(data));
    return () => clearInterval(timeInterval.current);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid changing tabs when typing in an input
      const target = e.target.closest("input") || e.target.closest("textarea");
      if (target) return;

      const key = e.key;
      switch (key) {
        case "1":
          dispatch(setTab(0));
          break;
        case "2":
          dispatch(setTab(1));
          break;
        case "3":
          dispatch(setTab(2));
          break;
        case "4":
          dispatch(setTab(3));
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

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
      <Nav />
      <main id="content" className="content">
        <aside id="links" className="links">
          {Object.entries(LINKS[selectedTab]).map(([name, url], i) => (
            <a
              style={{ "--delay": `${i * 0.3}` }}
              key={name}
              className="link"
              href={url}
              rel="noreferrer"
              onMouseEnter={(e) => {
                e.target.style.color = getRandomColor(i);
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "black";
              }}
            >
              {name}
            </a>
          ))}
        </aside>
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
        <UtilitiesAside />
        <footer style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "40px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", gap: "10px" }}>
            <GoogleButton src={gmail} alt={"Gmail"} redirect={"https://mail.google.com"}/>
            <GoogleButton src={drive} alt={"Drive"} redirect={"https://drive.google.com"}/>
            <GoogleButton src={calendar} alt={"Calendar"} redirect={"https://calendar.google.com"}/>
            <GoogleButton src={maps} alt={"Maps"} redirect={"https://maps.google.com"}/>
            <GoogleButton src={keep} alt={"Keep"} redirect={"https://keep.google.com"}/>
            <GoogleButton src={translate} alt={"Translate"} redirect={"https://translate.google.com"}/>
            <GoogleButton src={photos} alt={"Photos"} redirect={"https://photos.google.com"}/>
            <GoogleButton src={books} alt={"Books"} redirect={"https://books.google.com"}/>
          </div>
          <h3
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              margin: "0",
              position: "relative",
            }}
          >
            {weather ? (
              <>
                <span style={{ color: "red" }}>{weather?.current?.temp_c}°C</span>
                <span>|</span>
                <span>{weather?.current?.condition?.text}</span>
              </>
            ) : (
              <Loader />
            )}
          </h3>
        </footer>
      </main>
    </>
  );
}

export default App;
