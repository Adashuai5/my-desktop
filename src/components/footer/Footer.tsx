import React, { useState, useEffect } from "react";
import { dockEffect } from "./effect";

const Footer = () => {
  const list: string[] = [
    "Finder.png",
    "Launchpad.png",
    "PrefApp.png",
    "Terminal.png",
    "Calculator.png",
  ];
  const [dockList] = useState<string[]>(list);

  useEffect(() => {
    dockEffect({ el: "AppFooter" });
  }, []);
  return (
    <>
      <img className="DockBackground"></img>
      <footer className="AppFooter">
        {dockList.map((item, index) => {
          return (
            <img src={require("./image/" + item)} alt={item} key={index} />
          );
        })}
      </footer>
    </>
  );
};

export default Footer;
