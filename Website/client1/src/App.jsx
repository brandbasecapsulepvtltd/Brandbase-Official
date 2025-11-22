import Navbar from "./Components/General/Navbar";
import ContactPage from "./Pages/ContactPage";
import HomePage from "./Pages/HomePage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServicePage from "./Pages/ServicePage";
import Aboutpage from "./Pages/Aboutpage.";
import FloatingWhatsApp from "./Components/General/FloatingWhatsApp";
import StallDesign from "./Pages/Service/Events&Exhibition/StallDesign";
import ChatbaseWidget from "./Components/General/ChatbaseWidget";
import AppointmentContent from "./Components/Appointment/AppointmentContent";
import AVProduction from "./Pages/Service/AVProduction";
import BlogsContent from "./Components/Blog/BlogsContent";
import BlogDetailPage from "./Components/Blog/BlogDetailPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ChatbaseWidget/>
        <FloatingWhatsApp/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/about" element={<Aboutpage/>}/>
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/services" element={<ServicePage/>} />
          <Route path="/services/av-production" element={<AVProduction/>} />
          <Route path="/services/events-exhibition/stall-design" element={<StallDesign/>}/>
          <Route path="/appointment" element={<AppointmentContent/>} />
          <Route path="/blogs" element={<BlogsContent/>}/>
          <Route path="/blogs/:slug" element={<BlogDetailPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;