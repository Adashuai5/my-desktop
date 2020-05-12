import React from "react";
import Dock from "./views/Dock";
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <header className="AppFinder"></header>
      <footer className="AppFooter">
        <Dock />
      </footer>
    </div>
  );
}

export default App;
