import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/layouts/Header"
import "./App.css"
import Hero from "./components/sections/Hero"
import LandingPage from "./pages/LandingPage"
import MobileLogin from "./components/sections/MobileLogin"
import { useEffect, useState } from "react"
import Footer from "./components/layouts/Footer"
import ContactSection from "./components/sections/ContactSection"
import Services from "./components/sections/Services"
import PlanPricing from "./components/sections/PlanPricing"
import { userState } from "./context/UserContext"
function App() {

  const { user } = userState();

  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (user) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [user])

  return (
    <>
      <BrowserRouter>
        <MobileLogin isOpen={open} />
        <Header setOpen={setOpen} />
        <div className="bg-gradient-to-br from-[#FFF8FC] via-[#F7EDF3] to-[#F2E1EA]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/about" element={<AboutPage />} /> */}
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/services" element={<Services />} />
            <Route path="/platforms" element={<PlanPricing />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
