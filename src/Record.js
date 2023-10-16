import { config } from "./Constants";
import { useState } from "react";
import DeviceSelect from "./DeviceSelect";
import { toast } from "react-toastify";
import Dygraph from "dygraphs";

const Record = () => {
  const [isPending, setIsPending] = useState(false);
  let empty_distance = null;

  const prepareData = (data, empty_distance) => {
    let postPrepare = Array.from(data, (i) => [
      new Date(i.created_at + "Z"),
      empty_distance - i.distance,
    ]);
    return postPrepare.reverse();
  };

  const handleSelectChange = (deviceId) => {
    setIsPending(true);
    fetch(config.url.API_BASE + `devices/${deviceId}`)
      .then((res) => {
        if (!res.ok) {
          throw Error(`fetch details of device - ${deviceId} failed.`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.code === 0) {
          empty_distance = data.data.empty_distance;
        } else {
          throw Error(data.message);
        }
      })
      .then(() => {
        fetch(config.url.API_BASE + `devices/${deviceId}/records`)
          .then((res) => {
            if (!res.ok) {
              throw Error(`fetch records of device - ${deviceId}`);
            }
            return res.json();
          })
          .then((data) => {
            if (data.code === 0) {
              const dataForDraw = prepareData(data.data, empty_distance);
              setIsPending(false);
              const g = new Dygraph("graph", dataForDraw, {
                legend: "always",
                title: "Remaining Distance Over Time",
                ylabel: "Remaining Distance  (CM)",
                xlabel: "Date Time",
                labelsSeparateLines: true,
                labels: ['Datetime', 'R-Distance']
              });
            } else {
              throw Error(data.message);
            }
          });
      })
      .catch((err) => {
        toast(err.message);
      });
  };

  return (
    <div className="record">
      <div className="box tppattern">
      <h2>TP Usage Statistics</h2>
      <div className="columns">
        <div className="column is-3">
          <DeviceSelect handleChange={handleSelectChange} />
        </div>
        <div className="column is-9">
          <div className="box chart-container">
            <div id="graph" style={{ width: "auto" }}></div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Record;
