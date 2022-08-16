import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnnotationPage from "./components/AnnotationPage";
import HomePage from "./components/HomePage";
import RecognitionPage from "./components/RecognitionPage";
import AdaptivePage from "./components/AdaptivePage";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory({ forceRefresh: true });
function App() {
  return (
    <div className="App">
      <Router history={customHistory}>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          {/* <Route path="/annotation/all" element={<AnnotationPage />} /> */}
          <Route path="/annotation/:id" element={<AnnotationPage />} />
          <Route path="/recognition/:file_name" element={<RecognitionPage />} />
          <Route path="/adaptive" element={<AdaptivePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
