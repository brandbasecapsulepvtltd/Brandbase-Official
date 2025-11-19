import Navbar from "./Components/General/Navbar";
import ContactPage from "./Pages/ContactPage";
import HomePage from "./Pages/HomePage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServicePage from "./Pages/Service/ServicePage";
import Aboutpage from "./Pages/Aboutpage.";
import FloatingWhatsApp from "./Components/General/FloatingWhatsApp";

function App() {

  return (
    <>
      <Router>
      <Navbar />
      <FloatingWhatsApp/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<Aboutpage/>}/>
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/services" element={<ServicePage/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
