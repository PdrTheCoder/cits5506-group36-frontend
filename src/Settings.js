import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import { config } from "./Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const [selectDevice, setDevice] = useState(null);
  const [isRightLoading, setIsRightLoading] = useState(true);

  const { data: devices, _, error } = useFetch(config.url.API_BASE + "devices");

  useEffect(() => {
    if (devices) {
      setDevice(devices[0]);
      setIsRightLoading(false);
    }
  }, [devices]);

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
    ] = e.target.value;
    setDevice(cpDevice);
  };

  const handleUpdate = (e) => {
    fetch(config.url.API_BASE + "devices/" + selectDevice.id, {
      method: "PATCH",
      body: JSON.stringify({
        threshold: selectDevice.threshold,
        empty_distance: selectDevice.empty_distance,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("patch failed");
        }
        return res.json();
      })
      .then((data) => {
        if (data.code === 0) {
          toast(data.message);
        } else {
          throw Error(data.msg);
        }
      })
      .catch((err) => {
        toast(err.message);
      });
  };

  return (
    <div className="settings">
      {isRightLoading && <div>Loading...</div>}
      {!isRightLoading && (
        <div className="">
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
                {selectDevice && (
                  <div>
                    <div className="field">
                      <label className="label">Name</label>
                      <div className="control">
                        <p>{selectDevice.name}</p>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Description</label>
                      <div className="control">
                        <p>{selectDevice.desc}</p>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Threshold</label>
                      <div className="control">
                        <input
                          className="input"
                          name="thresholdVal"
                          value={selectDevice.threshold}
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
                          value={selectDevice.empty_distance}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <button
                      className="button is-primary"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
