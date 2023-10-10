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
                    <span className="tag is-success is-rounded">All Good!</span>
                  ) : device.distance < device.empty_distance ? (
                    <span className="tag is-warning is-rounded">
                      Running Out!
                    </span>
                  ) : (
                    <span className="tag is-danger is-rounded">Empty!</span>
                  )}
                </div>
              </div>
              <p>{device.desc}</p>
              <p>{"Last Update:" + (device.updated_at ? device.updated_at : " ...No readings yet.")}</p>
              <progress
                className="progress"
                value={device.empty_distance - device.distance}
                max={device.empty_distance - 2} // -2 accounts for the  distance from the sensor to the max roll size
              ></progress>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceList;
