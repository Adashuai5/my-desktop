import React, { useState, useEffect } from "react";
import { dockEffect } from "./effect";
import "./styles/App.scss";

function App() {
  const list = [
    "Finder.png",
    "Launchpad.png",
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
      <img className="DockBackground"></img>
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
