import DeviceList from "./DeviceList";
import useFetch from "./useFetch";
import { useEffect } from "react";
import { useState } from "react";
import { config } from "./Constants";

const Device = () => {
  const [deviceList, setDeviceList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const getDeviceList = () => {
    fetch(`${config.url.API_BASE}devices`)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data");
        }
        return res.json();
      })
      .then((data) => {
        if (data.code === 0) {
          setDeviceList(data.data);
          setIsLoading(false);
          setError(null);
        } else {
          throw Error(data.message);
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log('fetch abort')
        } else {
          setIsLoading(false);
          setError(err.message);
        }
      });
  }

  useEffect(() => {
    getDeviceList();

    const interval = setInterval(() => {
      getDeviceList()
    }, 10000)

  }, [])

  return (
    <div className="home container">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {deviceList && <DeviceList devices={deviceList} />}
    </div>
  );
};

export default Device;
