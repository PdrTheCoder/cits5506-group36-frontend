import { useEffect } from "react";
import Navbar from "./Navbar";
import Device from "./Device";
import Settings from "./Settings";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    document.body.classList.add("tpbackground");
    return () => {
      document.body.classList.remove("has-background-info");
    };
  }, []);
  return (
    <Router>
      <ToastContainer />
      <div className="App container is-max-desktop ">
        <header className="tppattern round-corners px-5">
          <h1 className="title is-size-1 has-text-info">S.H.A.T.T.S.</h1>
          <h2 className="subtitle is-size-3 has-text-info">
            Smart Hygiene Automated Toiletpaper Tracking System
          </h2>
          <Navbar />
        </header>
        <div className="content px-0">
          <Routes>
            <Route path="/" element={<Device />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
          </Routes>
        </div>
        <footer className="footer p-5 round-corners has-text-centered tppattern has-text-weight-semibold">
            <p>
              Built by: James Patrick Braunagel (23610272), Kuo Gao (23318508),
            </p>
            <p>
              {" "}
              David Yonghui Lin (22570361), Yao Tang (23702349), & Zhipeng
              (Pedro) Wang (23870387)
            </p>
            <p>For: UWA CITS5506 IoT Final Project, Group 36</p>
            <p>2023</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
