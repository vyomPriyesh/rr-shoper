import { BrowserRouter } from "react-router-dom"
import Header from "./components/layouts/Header"
import "./App.css"
import Hero from "./components/sections/Hero"
import LandingPage from "./pages/LandingPage"
function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <LandingPage />
      </BrowserRouter>
    </>
  )
}

export default App
