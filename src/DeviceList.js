import { Link } from "react-router-dom";

const DeviceList = ({ devices, title, handleDelete }) => {
  return (
    <div className="device-list">
      <div className="columns is-multiline">
        {devices.map((device) => (
          <div className="column is-6" key={device.id}>
            <div className="box">
              <div className="columns">
                <div className="column">
                  <h2 className="label">{device.name}</h2>
                </div>
                <div className="is-vcentered column">
                  {device.distance <= device.threshold ? (
                    <span className="tag is-info is-rounded">All Good!</span>
                  ) : (
                    <span className="tag is-warning is-rounded">
                      Running Out!
                    </span>
                  )}
                </div>
              </div>
              <p>{device.desc}</p>
              <p>{"Last Update:" + device.updated_at}</p>
              <progress
                className="progress"
                value={device.empty_distance - device.distance}
                max="20"
              ></progress>
              <Link to={`/devices/${device.id}/records`}>View Records</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceList;
