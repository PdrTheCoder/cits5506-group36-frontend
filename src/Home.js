import { useState } from "react";
import DeviceList from "./DeviceList";
import { useEffect } from "react";

const Home = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetch("https://virtserver.swaggerhub.com/ArsenePadthai/iot/1.0.0/devices")
    .then(res => {
        return res.json()
    })
    .then(data => {
        // TODO error handling
        setDevices(data.data)
    })
  }, [])



  return (
    <div className="home container">
      {devices && <DeviceList devices={devices}/>}
    </div>
  );
};

export default Home;
