import useFetch from "./useFetch";
import { useState } from "react";
import { useEffect } from "react";

const Settings = () => {
  const [selectDevice, setDevice] = useState(null);

  const {
    data: devices,
    isLoading,
    error,
  } = useFetch(
    "http://3.27.67.131:5009/devices"
  );

  const handleChange = (e) => {
    const newDevice = devices.filter(
      (d) => d.id === parseInt(e.target.value)
    )[0];
    setDevice(newDevice);
  };

  const handleInputChange = (e) => {
    const cpDevice = { ...selectDevice };
    cpDevice[
      e.target.name === "thresholdVal" ? "threshold" : "empty_distance"
    ] = e.target.val;
    setDevice(cpDevice);
  };

  const handleUpdate = (e) => {
    fetch(
      "http://3.27.67.131:5009/devices/" +
        selectDevice.id,
      {
        method: "PATCH",
        body: JSON.stringify({
          threshold: selectDevice.threshold,
          empty_distance: selectDevice.empty_distance,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("patch failed");
        }
        return res.json();
      })
      .then((data) => {
        if (data.code === 0) {
          // setError(null);
          alert("succeed");
        } else {
          throw Error(data.msg);
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
    //   TODO catch error
  };

  useEffect(() => {
    if (devices) {
      setDevice(devices[0]);
    }
  }, [devices]);

  return (
    <div className="settings">
      <h2>Settings of the devices</h2>
      <div className="columns">
        <div className="column is-3">
          <div className="select">
            <select onChange={handleChange}>
              {devices?.map((d, ind) => (
                <option value={d.id} key={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="column is-9">
          <div className="box">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <p>{selectDevice?.name}</p>
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <p>{selectDevice?.desc}</p>
              </div>
            </div>
            <div className="field">
              <label className="label">Threshold</label>
              <div className="control">
                <input
                  className="input"
                  name="thresholdVal"
                  value={selectDevice?.threshold}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Empty Distance</label>
              <div className="control">
                <input
                  className="input"
                  name="emptyDistanceVal"
                  value={selectDevice?.empty_distance}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button className="button is-primary" onClick={handleUpdate}>
              Updata
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
