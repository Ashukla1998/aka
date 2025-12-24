import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";

import Home from "./main";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Projects from "./pages/Project";
import ProjectDetail from "./pages/ProjectDetail";
import Admin from "./pages/Admin";
import Careers from "./pages/Career";

import { HashRouter, Routes, Route } from "react-router-dom";
import HeroMarquee from "./components/Hero";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      {!loading && (
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/career" element={<Careers />} />
            <Route path="/hero" element={<HeroMarquee/>}/>
          </Routes>
          <Footer />
        </HashRouter>
      )}
    </>
  );
}

export default App;
