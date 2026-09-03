import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/layouts/Header"
import "./App.css"
import LandingPage from "./pages/LandingPage"
import MobileLogin from "./components/sections/MobileLogin"
import Footer from "./components/layouts/Footer"
import ContactSection from "./components/sections/ContactSection"
import Services from "./components/sections/Services"
import PlanPricing from "./components/sections/PlanPricing"
import PrivacyPolicies from "./pages/PrivacyPolicies"
import RefundCancellationPolicies from "./pages/RefundCancellationPolicies"
import TermsConditions from "./pages/TermsConditions"
import DashboardData from "./pages/DashboardData"
import ProtectedRoute from "./protecttedRoute/ProtectedRoute"
import PaymentStatus from "./pages/PaymentStatus"
import { FaUser } from "react-icons/fa"
import { IoBagCheck, IoTicketSharp } from "react-icons/io5"
import { TbShoppingCartCopy } from "react-icons/tb"
import { ReactLenis } from "lenis/react"
import "lenis/dist/lenis.css"
import ScrollToTop from "./components/layouts/ScrollToTop"

function App() {

  const dashboardRoutes = [
    // {
    //     name: "Dashboard", to: "dashboard",
    //     icon: MdOutlineDashboard
    // },
    {
      name: "My Profile", to: "dashboard/my-profile",
      icon: FaUser
    },
    {
      name: "My Service", to: "dashboard/my-service",
      icon: IoBagCheck
    },
    {
      name: "My Orders", to: "dashboard/my-orders",
      icon: TbShoppingCartCopy
    },
    {
      name: "Tickets", to: "dashboard/tickets",
      icon: IoTicketSharp
    },
  ]

  return (
    <>
      <BrowserRouter>
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
        <ScrollToTop />
        <MobileLogin />
        <Header dashboardRoutes={dashboardRoutes} />
        <div className="full-mountain-image bg-gradient-to-br from-[#fceef6] via-[#faf0f6] to-[#fcedf5] pt-20">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute >
                  <DashboardData dashboardRoutes={dashboardRoutes} />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/services" element={<Services />} />
            <Route path="/platforms" element={<PlanPricing />} />
            <Route path="/platforms/:platformName" element={<PlanPricing />} />
            <Route path="/privacy-policy" element={<PrivacyPolicies />} />
            <Route path="/refund-cancellation-policy" element={<RefundCancellationPolicies />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/payment/status/:id" element={<PaymentStatus />} />
          </Routes>
        </div>
        <Footer />
        </ReactLenis>
      </BrowserRouter>
    </>
  )
}

export default App
