import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnnotationPage from "./components/AnnotationPage";
import HomePage from "./components/HomePage";
import RecognitionPage from "./components/RecognitionPage";
import AdaptivePage from "./components/AdaptivePage";
import { createBrowserHistory } from "history";
import { Nav } from "react-bootstrap";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

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
          <Route path="/recognition/:file_name" element={<RecognitionPage />} />
          <Route path="/adaptive/:id" element={<AdaptivePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
