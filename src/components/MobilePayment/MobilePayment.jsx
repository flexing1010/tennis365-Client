import { useHistory, useLocation, useParams } from "react-router";
import queryString from "query-string";

import { useEffect } from "react";
import { useAxios } from "../../hooks/useAxios";
import axios from "axios";

const MobilePayment = () => {
  let history = useHistory();
  let { id } = useParams();
  let location = useLocation();
  const { search } = location;
  const query = queryString.parse(search);
  const { merchant_uid, imp_uid } = query;

  const { response } = useAxios({
    method: "get",
    url: `/order/payment/${id}/mobile`,
    params: { merchant_uid },
  });

  useEffect(() => {
    if (response) {
      const orderInfo = response.orderInfo[0];
      const orderItems = response.orderItems;

      orderItems.forEach((item) => {
        item.stock = item.stock - item.quantity;
      });

      axios
        .post("https://tennis365-api.herokuapp.com/order/result", {
          user_id: orderInfo.user_id,
          order_id: id,
          merchant_uid,
          imp_uid,
          status: 0,
          amount: orderInfo.grandTotal,
          orderItems,
        })
        .then(
          history.push({
            pathname: `/order/payment/${merchant_uid}`,
            // search: `?${query}`,
            // state: { response },
          })
        );
    }
  }, [response]);

  return (
    <div>
      <h1>결제 확인중입니다</h1>
      {/* {orderData !== undefined && (
        <>
          <h1>{orderData.user_id}</h1>
          <h1>{orderData.order_id}</h1>

        </>
      )} */}
    </div>
  );
};

export default MobilePayment;
