import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnnotationPage from "./components/AnnotationPage";
import HomePage from "./components/HomePage";
import RecognitionPage from "./components/RecognitionPage";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory({ forceRefresh: true });
function App() {
  return (
    <div className="App">
      <Router history={customHistory}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/annotation" element={<AnnotationPage />} /> 
          <Route path="/annotation/:id" element={<AnnotationPage />} />
          <Route path="/recognition/" element={<RecognitionPage />} />
          <Route path="/recognition/:file_name" element={<RecognitionPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
