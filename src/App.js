import "./App.css";
import Home from "./main";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import { HashRouter, Routes, Route } from "react-router-dom";
import Projects from "./pages/Project";
import ProjectDetail from "./pages/ProjectDetail";
import Admin from "./pages/Admin";
import Careers from "./pages/Career";
function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/projects' element={ <Projects /> } />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/career" element={<Careers/>}/>
      </Routes>

      <Footer />
    </HashRouter>
  );
}

export default App;
