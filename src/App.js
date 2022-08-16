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
import { useState } from 'react';

const customHistory = createBrowserHistory({ forceRefresh: true });
function App() {
  const [page, setPage] = useState('Product Table')

  return (
    // <Navbar>
    // <div className="App">
    //   {/* Navbar */}
    //   <Navbar bg="dark" variant="dark">
    //     <Container>
    //       <Navbar.Brand href="#home">
    //         {/* <img
    //           alt=""
    //           src={logo}
    //           width="30"
    //           height="30"
    //           className="d-inline-block align-top"
    //         />{" "} */}
    //         OUCRU Handwriting Recognition
    //       </Navbar.Brand>
    //       <Nav className="me-auto">
    //         <Nav.Link onClick={() => setPage("HomePage")}>Home</Nav.Link>
    //         <Nav.Link onClick={() => setPage("AnnotationPage")}>
    //           Annotation
    //         </Nav.Link>
    //         <Nav.Link onClick={() => setPage("AdaptivePage")}>
    //           Adaptive
    //         </Nav.Link>
    //       </Nav>
    //     </Container>
    //   </Navbar>
    //   {/* Page body to set page on click */}
    //   {page === "HomePage" ? <HomePage /> : ""}
    //   {page === "AnnotationPage" ? <AnnotationPage /> : ""}
    //   {page === "AdaptivePage" ? <AdaptivePage /> : ""}
    // </div>

    <div className="App">
      <NavBar></NavBar>
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
