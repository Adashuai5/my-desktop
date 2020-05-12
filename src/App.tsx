import React, { useState, useEffect } from "react";
import { dockEffect } from "./effect";
import "./styles/App.scss";

function App() {
  const list = [
    "Launchpad.png",
    "Finder.png",
    "PrefApp.png",
    "Terminal.png",
    "Calculator.png",
  ];
  const [dockList] = useState(list);

  useEffect(() => {
    dockEffect({ el: "AppFooter" });
  }, []);
  return (
    <div className="App">
      <header className="AppFinder"></header>
      <div className="DockBackground"></div>
      <footer className="AppFooter">
        {dockList.map((item, index) => {
          return (
            <img
              src={require("./assets/image/" + item)}
              alt={item}
              key={index}
            />
          );
        })}
      </footer>
    </div>
  );
}

export default App;
