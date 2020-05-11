import React from "react";
import Dock from "./views/Dock";
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-Finder"></header>
      <footer className="App-Footer">
        <Dock />
      </footer>
    </div>
  );
}

export default App;
