import "./App.css";

import React, {
} from "react";

import { BrowserRouter as Router, Route, Link, NavLink, Routes } from "react-router-dom";
import AnnotationPage from "./components/AnnotationPage";
import HomePage from "./components/HomePage";
import { createBrowserHistory } from 'history'

function App() {
  return (
  <Router>
      <div className="App">
        <Routes>
          <Route path="/"  element={<HomePage></HomePage>}/>
          <Route path="/annotation"  element={<AnnotationPage/>}/>
        </Routes>
      </div>
  </Router>
  );
}

export default App;
