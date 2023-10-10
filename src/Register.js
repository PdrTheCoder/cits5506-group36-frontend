import { config } from "./Constants";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [dname, setDname] = useState("");
  const [ddesc, setDdesc] = useState("");
  const [threshold, setThreshold] = useState("");
  const [emptyVal, setEmptyVal] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const deviceCreate = {name:dname, desc:ddesc, threshold: Number(threshold), empty_distance: Number(emptyVal)};
    setIsPending(true);
    fetch(config.url.API_BASE + 'devices', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(deviceCreate)
    }).then((res) => {
        if (!res.ok) {
            throw Error("Add device failed")
        }
        return res.json()
    }).then((data) => {
        if (data.code === 0) {
            toast(data.message);
            setIsPending(false);
            navigate('/')
        } else {
            setIsPending(false);
            throw Error(data.message)
        }
    }).catch((err) => {
        toast(err.message);
    })
  }

  return (
    <div className="register">
      <h2>Register a new device</h2>
      <div className="box column is-three-fifths is-offset-one-fifth">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Device Name:</label>
            <p>(names must be unique!)</p>
            <div className="control">
              <input
                className="input"
                value={dname}
                onChange={(e) => setDname(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description:</label>
            <div className="control">
              <textarea
                className="textarea"
                value={ddesc}
                onChange={(e) => setDdesc(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label">Threshold:</label>
            <div className="control">
              <input
                className="input"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Empty Distance:</label>
            <div className="control">
              <input
                className="input"
                value={emptyVal}
                onChange={(e) => setEmptyVal(e.target.value)}
              />
            </div>
          </div>
          { !isPending && <button className="button is-primary">Submit</button>}
          { isPending && <button className="button is-primary" disabled>Adding the device..</button>}
        </form>
      </div>
    </div>
  );
};

export default Register;
