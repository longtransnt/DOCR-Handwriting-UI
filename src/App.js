import "./App.css";

import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnnotationPage from "./components/AnnotationPage";
import HomePage from "./components/HomePage";
import AdaptivePage from "./components/AdaptivePage";
import InputPage from "./components/InputPage"
import { createBrowserHistory } from "history";
import { Nav } from "react-bootstrap";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import ModulePage from "./components/ModulePage";
import PaperDetection from "./components/PaperDetection"
import PreProcessing from "./components/PreProcessing";
import TextDetection from "./components/TextDetection";

const customHistory = createBrowserHistory({ forceRefresh: true });
function App() {
  const [page, setPage] = useState("Product Table");

  return (
    <div className="App">
      <NavBar></NavBar>
      <Router history={customHistory}>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          {/* <Route path="/annotation/all" element={<AnnotationPage />} /> */}
          <Route path="/annotation/:id" element={<AnnotationPage />} />
          <Route path="/adaptive/:id" element={<AdaptivePage />} />
          <Route path="/module/:module" element={<ModulePage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/paperdetection/:id" element={<PaperDetection />} />
          <Route path="/preprocessing/:id" element={<PreProcessing />} />
          <Route path="/textdetection/:id" element={<TextDetection />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
