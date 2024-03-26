import "./Nav.css";

const tabs = ["Common", "Work", "Misc", "Stream"];

export default function Nav({ handleTabClick, selectedTab }) {
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
