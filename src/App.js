import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnnotationPage from "./components/AnnotationPage";
import HomePage from "./components/HomePage";
import RecognitionPage from "./components/RecognitionPage";
import AdaptivePage from "./components/AdaptivePage";
import InputPage from "./components/InputPage";
import { createBrowserHistory } from "history";
import { Nav } from "react-bootstrap";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import ModulePage from "./components/ModulePage";
import PaperDetection from "./components/PaperDetection";
import PreProcessing from "./components/PreProcessing";
import DisplayPage from "./components/DisplayPage";
import ActivePage from "./components/ActivePage";

const customHistory = createBrowserHistory({ forceRefresh: true });
function App() {
  const [page, setPage] = useState("Product Table");

  return (
    <div className="App">
      <NavBar></NavBar>
      <Router history={customHistory}>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/annotation/:id" element={<AnnotationPage />} />
          <Route path="/recognition/:id" element={<RecognitionPage />} />
          <Route path="/active" element={<ActivePage />} />
          <Route path="/adaptive/:id" element={<AdaptivePage />} />
          <Route path="/module/:module" element={<ModulePage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/input/:id" element={<InputPage />} />
          <Route path="/display/:mode/:id" element={<DisplayPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
