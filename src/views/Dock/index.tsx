import React, { useState } from "react";
import "./index.scss";
function Dock() {
  const list = ["Launchpad.png", "Finder.png", "PrefApp.png", "Calculator.png"];
  const [dockList] = useState(list);
  return (
    <div className="App-Dock">
      <ul>
        {dockList.map((item, index) => {
          return (
            <li key={index}>
              <img src={require("../../assets/image/" + item)} alt="" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Dock;
