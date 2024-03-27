import "./Nav.css";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../../redux/tabSlice.js/tabSlice.js";

const tabs = ["Common", "Work", "Misc", "Stream"];

export default function Nav() {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.tab);

  function handleTabClick(tab) {
    dispatch(setTab(tab));
  }
  return (
    <nav>
      <menu>
        {tabs.map((tab, i) => (
          <li
            key={i}
            className={`tab ${selectedTab === i ? "selected" : ""}`}
            onClick={() => (selectedTab === i ? null : handleTabClick(i))}
          >
            {tab}
          </li>
        ))}
      </menu>
    </nav>
  );
}
