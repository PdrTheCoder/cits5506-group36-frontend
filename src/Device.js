import DeviceList from "./DeviceList";
import useFetch from "./useFetch";

const Device = () => {
  const {
    data: devices,
    isLoading,
    error,
  } = useFetch(
    "http://3.27.67.131:5009/devices"
  );

  return (
    <div className="home container">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {devices && <DeviceList devices={devices} />}
    </div>
  );
};

export default Device;
