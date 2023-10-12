import useFetch from "./useFetch";
import { useEffect } from "react";
import { useState } from "react";
import { config } from "./Constants";


const DeviceSelect = ({handleChange}) => {
  const [value, setValue] = useState('')

  const {
    data: devices,
    isLoading,
    error,
  } = useFetch(
    config.url.API_BASE + "devices"
  );

  useEffect(() => {
    if (devices) {
      const defaultValue = devices[0].id
      setValue(defaultValue);
      handleChange(defaultValue);
    }
  }, [devices]);

  return (
    <div className="select">
      {devices && <select value={value} onChange={(e) => {
        setValue(e.target.value);
        handleChange(e.target.value);
      }}>
        {devices.map((device) => (
            <option value={device.id} key={device.id}>{device.name}</option>
        ))}
      </select>}
    </div>
  );
};

export default DeviceSelect;
