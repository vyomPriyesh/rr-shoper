import { BrowserRouter } from "react-router-dom"
import Header from "./components/layouts/Header"
import "./App.css"
import Hero from "./components/sections/Hero"
import LandingPage from "./pages/LandingPage"
import MobileLogin from "./components/sections/MobileLogin"
import { useState } from "react"
function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <BrowserRouter>
        <MobileLogin isOpen={open} />
        <Header setOpen={setOpen} />
        <LandingPage />
      </BrowserRouter>
    </>
  )
}

export default App
