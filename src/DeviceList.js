const DeviceList = ({ devices, title, handleDelete }) => {
  const getLabelAndProgressBarClasses = (device) => {
    let categoryClass = "";
    let categoryText = "";
    let categoryBackground = "";

    if (device.distance <= device.threshold) {
      categoryClass = "success";
      categoryText = "All Good!";
      categoryBackground = "";
    } else if (device.distance < device.empty_distance) {
      categoryClass = "warning";
      categoryText = "Running Out!";
      categoryBackground = "";
    } else {
      categoryClass = "dark";
      categoryText = "Empty!";
      categoryBackground = "has-background-danger";
    }

    return { categoryClass, categoryText, categoryBackground };
  };

  return (
    <div className="device-list">
      <div className="columns is-multiline">
        {devices.map((device) => {
          const { categoryClass, categoryText, categoryBackground} =
            getLabelAndProgressBarClasses(device);

          return (
            <div className="column is-6" key={device.id}>
              <div className={`box ${categoryBackground}`}>
                <div className="columns">
                  <div className="column">
                    <h2 className={`label has-text-${categoryClass}`}>{device.name}</h2>
                  </div>
                  <div className="is-vcentered column">
                    <span className={`tag is-rounded is-${categoryClass}`}>
                      {categoryText}
                    </span>
                  </div>
                </div>
                <p>{device.desc}</p>
                <p>
                  {"Last Update: " +
                    (device.updated_at
                      ? new Date(device.updated_at + 'Z').toLocaleString()
                      : " ...No readings yet.")}
                </p>
                <progress
                  className={`progress is-${categoryClass}`}
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
