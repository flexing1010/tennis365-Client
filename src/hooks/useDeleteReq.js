import axios from "axios";
import { useEffect, useState } from "react";

const useDeleteReq = (url, targetId) => {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios
      .delete(url, {
        data: {
          targetId: targetId,
        },
      })
      .then((res) => {
        if (!res.ok) {
          throw Error("데이터를 가져올 수 없습니다");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setErrorMessage(null);
      })
      .catch((err) => {
        setErrorMessage(err.errorMessage);
      });
  }, [url, targetId]);
  return { data, errorMessage };
};

export default useDeleteReq;
