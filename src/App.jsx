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
import apiList from "./config/apiList"
import { useMutation } from "@tanstack/react-query"
import api from "./config/api"
function App() {

  const { user } = userState();
  const { images } = apiList();

  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (user) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [user])

  const { mutate: imageHandle } = useMutation({
    mutationFn: ({ target }) => {
      const files = Array.from(target.files);

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("images", file);
      });

      return api.post(images.upload, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: ({ data }) => {
      console.log(data)
    }
  })

  return (
    <>
      <BrowserRouter>
        <input type="file" name="" id="" onChange={imageHandle} />
        <MobileLogin isOpen={open} />
        <Header setOpen={setOpen} />
        <div className="bg-gradient-to-br from-[#FFF8FC] via-[#F7EDF3] to-[#F2E1EA]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/about" element={<AboutPage />} /> */}
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/services" element={<Services />} />
            <Route path="/platforms" element={<PlanPricing />} />
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
