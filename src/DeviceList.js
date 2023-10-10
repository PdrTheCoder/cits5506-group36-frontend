const DeviceList = ({ devices, title, handleDelete }) => {
  const getLabelAndProgressBarClasses = (device) => {
    let categoryClass = "";
    let categoryText = "";

    if (device.distance <= device.threshold) {
      categoryClass = "is-success";
      categoryText = "All Good!";
    } else if (device.distance < device.empty_distance) {
      categoryClass = "is-warning";
      categoryText = "Running Out!";
    } else {
      categoryClass = "is-danger";
      categoryText = "Empty!";
    }

    return { categoryClass, categoryText };
  };

  return (
    <div className="device-list">
      <div className="columns is-multiline">
        {devices.map((device) => {
          const { categoryClass, categoryText } =
            getLabelAndProgressBarClasses(device);

          return (
            <div className="column is-6" key={device.id}>
              <div className="box">
                <div className="columns">
                  <div className="column">
                    <h2 className={`label ${categoryClass}`}>{device.name}</h2>
                  </div>
                  <div className="is-vcentered column">
                    <span className={`tag is-rounded ${categoryClass}`}>
                      {categoryText}
                    </span>
                  </div>
                </div>
                <p>{device.desc}</p>
                <p>
                  {"Last Update: " +
                    (device.updated_at
                      ? new Date(device.updated_at).toLocaleString()
                      : " ...No readings yet.")}
                </p>
                <progress
                  className={`progress ${categoryClass}`}
                  value={device.empty_distance - device.distance}
                  max={device.empty_distance - 2} // -2 accounts for the distance from the sensor to the max roll size
                ></progress>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceList;
