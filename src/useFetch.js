import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch("https://virtserver.swaggerhub.com/ArsenePadthai/iot/1.0.0/devices")
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data");
        }
        return res.json();
      })
      .then((data) => {
        if (data.code === 0) {
          setData(data.data);
          setIsLoading(false);
          setError(null);
        } else {
          throw Error(data.msg);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, [url]);

  return {data, isLoading, error}
}

export default useFetch;