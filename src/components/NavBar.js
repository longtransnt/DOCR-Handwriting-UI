import React, { useEffect, useState } from "react";
import "../styles/NavBar.css";
import oucru from "../oucru.png";

// import { useEnv } from "../context/env.context";
export default function NavBar() {
  const [currentPath, setCurrentPath] = useState("/");
  const [appState, setAppState] = useState("");

  // const changeAppState()

  useEffect(() => {
    let url = window.location.href;
    let path = url.substring(url.lastIndexOf("0/") + 1, url.length);
    setCurrentPath(path);
  }, []);

  const handleState = (event) => {
    setAppState(event.target.value);
  };

  return (
    <>
      <header className="header fixed-top">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <a href="/" className="logo d-flex align-items-center">
            <img src={oucru} alt="logo" />
            <span>OUCRU</span>
          </a>

          <nav className="navbar">
            <ul>
              <li>
                <button
                  class="btn btn-light"
                  onClick={handleState}
                  value="annotation"
                >
                  Annotation
                </button>
              </li>
              <li>
                <button
                  class="btn btn-light"
                  onClick={handleState}
                  value="pipeline"
                >
                  Pipeline
                </button>
              </li>
            </ul>
          </nav>

          {appState !== "pipeline" ? (
            <nav className="navbar">
              <ul>
                <li>
                  <a
                    className={
                      currentPath === "/"
                        ? "nav-link scrollto active"
                        : "nav-link scrollto"
                    }
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className={
                      currentPath === "/annotation"
                        ? "nav-link scrollto active"
                        : "nav-link scrollto"
                    }
                    href="/annotation"
                  >
                    Annotation
                  </a>
                </li>
              </ul>
            </nav>
          ) : (
            <nav className="navbar">
              <ul>
                <li>
                  <a
                    className={
                      currentPath === "/annotation"
                        ? "nav-link scrollto active"
                        : "nav-link scrollto"
                    }
                    href="/input"
                  >
                    Input
                  </a>
                </li>
                <li>
                  <a
                    className={
                      currentPath === "/paperdetection"
                        ? "nav-link scrollto active"
                        : "nav-link scrollto"
                    }
                    href="/module/PaperDetection"
                  >
                    Paper Detection
                  </a>
                </li>
                <li>
                  <a
                    className={
                      currentPath === "/preprocessing"
                        ? "nav-link scrollto active"
                        : "nav-link scrollto"
                    }
                    href="/module/Preprocessing"
                  >
                    Preprocessing
                  </a>
                </li>
                <li>
                  <a
                    className={
                      currentPath === "/textdetection"
                        ? "nav-link scrollto active"
                        : "nav-link scrollto"
                    }
                    href="/module/TextDetection"
                  >
                    Text Detection
                  </a>
                </li>
                <li>
                  <a
                    className={
                      currentPath === "/adaptive"
                        ? "nav-link scrollto active"
                        : "nav-link scrollto"
                    }
                    href="/module/adaptive"
                  >
                    Adaptive Processing
                  </a>
                </li>
                <li>
                  <a
                    className={
                      currentPath === "/textrecognition"
                        ? "nav-link scrollto active"
                        : "nav-link scrollto"
                    }
                    href="/module/TextDetection"
                  >
                    Text Recognition
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
