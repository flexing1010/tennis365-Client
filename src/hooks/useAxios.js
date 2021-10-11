import axios from "axios";
import { useEffect, useState } from "react";

// axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "https://tennis365-api.herokuapp.com";

export const useAxios = (axiosParams) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");

  const fetchData = async (params) => {
    try {
      const result = await axios.request(params);
      setResponse(result.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // execute once only

  return { response, error };
};
