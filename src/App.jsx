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
import PrivacyPolicies from "./pages/PrivacyPolicies"
import RefundCancellationPolicies from "./pages/RefundCancellationPolicies"
import TermsConditions from "./pages/TermsConditions"
import MyProfileRoutes from "./pages/MyProfileRoutes"

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
        <MobileLogin isOpen={false} />
        <Header />
        <div className="full-mountain-image bg-gradient-to-br from-[#fceef6] via-[#faf0f6] to-[#fcedf5] pt-20">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/my-profile/*" element={<MyProfileRoutes />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/services" element={<Services />} />
            <Route path="/platforms" element={<PlanPricing />} />
            <Route path="/platforms/:platformName" element={<PlanPricing />} />
            <Route path="/privacy-policy" element={<PrivacyPolicies />} />
            <Route path="/refund-cancellation-policy" element={<RefundCancellationPolicies />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
