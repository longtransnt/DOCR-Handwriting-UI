import "./App.css";

import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnnotationPage from "./components/AnnotationPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/annotation" element={<AnnotationPage />} />
        <Route path="/annotation/:id" element={<AnnotationPage />} />
      </Routes>
    </div>
  );
}

export default App;
