import "./MyPage.scss";

import { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import DisplayMyPage from "./DisplayMyPage";
import { useAxios } from "../../hooks/useAxios.js";
import { AuthContext } from "../../Context";

const MyPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [user, setUser] = useState({});
  const [authorized, setAuthorized] = useState(true);
  const { authState } = useContext(AuthContext);
  let { id } = useParams();
  const { response } = useAxios({
    method: "get",
    url: `/user/${id}`,
  });

  useEffect(() => {
    console.log(response);
    if (response) {
      setOrders(response.orders);
      setOrderItems(response.orderItems);
      setUser(response.user);
    }
  }, [response, authState.id, id]);

  useEffect(() => {
    if (authState.id !== 0) {
      if (parseInt(id) !== authState.id) {
        console.log(id, authState.id);
        setAuthorized(false);
      }
    }
  }, [authState, id]);

  return (
    <section id="mypage">
      {authorized ? (
        <DisplayMyPage orders={orders} orderItems={orderItems} user={user} />
      ) : (
        <Redirect to="/" />
      )}
    </section>
  );
};

export default MyPage;
