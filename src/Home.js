import { useState } from "react";
import DeviceList from "./DeviceList";
import { useEffect } from "react";

const Home = () => {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Ezone001",
      distance: 20,
      threshold: 22,
      empty_distance: 23,
      desc: "located on F3 Ezone",
      created_at: "18-09-2023 10:10:10",
      updated_at: "18-09-2023 10:10:10",
    },
    {
      id: 2,
      name: "Ezone002",
      distance: 22.5,
      threshold: 22,
      empty_distance: 23,
      desc: "Be careful about this one!",
      created_at: "18-09-2023 10:10:10",
      updated_at: "18-09-2023 10:10:10",
    },
    {
      id: 3,
      name: "Reid001",
      distance: 12,
      threshold: 22,
      empty_distance: 23,
      desc: "",
      created_at: "18-09-2023 10:10:10",
      updated_at: "18-09-2023 10:10:10",
    },
  ]);

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
      <DeviceList devices={devices}/>
    </div>
  );
};

export default Home;
