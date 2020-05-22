import React from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "./styles/App.scss";
import "antd/dist/antd.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <div id="main-view"></div>
      <Footer />
    </div>
  );
};

export default App;
