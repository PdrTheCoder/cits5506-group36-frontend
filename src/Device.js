import DeviceList from "./DeviceList";
import useFetch from "./useFetch";

const Device = () => {
  const {
    data: devices,
    isLoading,
    error,
  } = useFetch(
    "https://virtserver.swaggerhub.com/ArsenePadthai/iot/1.0.0/devices"
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
