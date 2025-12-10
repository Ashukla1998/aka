import "./App.css";
import Home from "./main";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectDetail from "./components/ProjectDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/project/:categoryName/:projectId"
          element={<ProjectDetail />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
