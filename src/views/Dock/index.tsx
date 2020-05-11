import React, { useState } from "react";
import "./index.scss";
function Dock() {
  const list = [
    "@/assets/image/Launchpad.png",
    "@/assets/image/Finder.png",
    "@/assets/image/PrefApp.png",
    "@/assets/image/Calculator.png",
  ];
  const [dockList] = useState(list);
  return (
    <div className="App-Dock">
      <img src="@/assets/image/Calculator.png" alt=""/>
      <ul>
        {dockList.map((item, index) => {
          return (
            <li key={index}>
              <img src={item} alt="" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Dock;
