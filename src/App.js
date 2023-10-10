import Navbar from "./Navbar";
import Device from "./Device";
import Settings from "./Settings";
import DeviceRecords from "./DeviceRecords";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <ToastContainer />
      <div className="App container is-max-desktop">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Device />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="/devices/:device_id/records" element={<DeviceRecords />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
