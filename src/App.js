import Navbar from "./Navbar";
import Device from "./Device";
import Settings from "./Settings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App container is-max-desktop">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Device />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
