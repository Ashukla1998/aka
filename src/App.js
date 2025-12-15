import "./App.css";
import Home from "./main";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectDetail from "./components/ProjectDetail";
import Projects from "./pages/Project";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/project/:categoryName/:projectId" element={<ProjectDetail />}/>
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/projects' element={ <Projects /> } />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
