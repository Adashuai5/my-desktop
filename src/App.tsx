import React from "react"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Main from "./components/main/Main"
import "./styles/App.scss"

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App
