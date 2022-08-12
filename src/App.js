import "./App.css";

import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  useParams,
  Routes,
} from "react-router-dom";
import AnnotationPage from "./components/AnnotationPage";
import HomePage from "./components/HomePage";
import RecognitionPage from "./components/RecognitionPage";
import { createBrowserHistory } from "history";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/annotation" element={<AnnotationPage />} />
          <Route path="/recognition/:file_name" element={<RecognitionPage />} />
          <Route path="/recognition" element={<RecognitionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
