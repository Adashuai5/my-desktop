import React, { useState, useEffect } from "react";
import { dockEffect } from "./effect";
import "./index.scss";
function Dock() {
  const list = ["Launchpad.png", "Finder.png", "PrefApp.png", "Calculator.png"];
  const [dockList] = useState(list);
  useEffect(() => {
    dockEffect({ el: "Dock" });
  });
  return (
    <div className="AppDock">
      <div>
        {dockList.map((item, index) => {
          return (
            <img
              src={require("../../assets/image/" + item)}
              alt={item}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Dock;
