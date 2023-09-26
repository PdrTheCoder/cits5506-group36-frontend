import DeviceList from "./DeviceList";
import useFetch from "./useFetch";
import { config } from "./Constants";

const Device = () => {
  const {
    data: devices,
    isLoading,
    error,
  } = useFetch(
    config.url.API_BASE + "devices"
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
