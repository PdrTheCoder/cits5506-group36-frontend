//import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { config } from "./Constants";

const DeviceRecords = () => {
  const { device_id } = useParams(); 
  const {
    data: records,
    isLoading,
    error,
  } = useFetch(
    `${config.url.API_BASE}devices/${device_id}/records`
  );

  return (
    <div className="device-records container">
      <h2>Device Records</h2>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {records && (
        <ul>
          {records.map((record) => (
            <li key={record.id}>{record.data}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeviceRecords;