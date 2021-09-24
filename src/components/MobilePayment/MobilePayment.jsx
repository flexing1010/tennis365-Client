import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import { OrderDataContext } from "../../Context";
import { useContext, useEffect } from "react";

const MobilePayment = () => {
  const { orderData, setOrderData } = useContext(OrderDataContext);
  let history = useHistory();
  let location = useLocation();
  const { search } = location;
  const query = queryString.parse(search);
  const { merchant_uid } = query;

  useEffect(() => {
    console.log(orderData);
  }, [orderData]);

  return (
    <div>
      <h1>{merchant_uid}</h1>
      {orderData && (
        <>
          ( <h1>{orderData.user_id}</h1>
          <h1>{orderData.order_id}</h1>
          <h1>{orderData.status}</h1>}<h1>{orderData.orderItems[0]}</h1>
          <h1>{orderData.amount}</h1>)<h1>{`${merchant_uid}00`}</h1>
        </>
      )}
    </div>
  );
};

export default MobilePayment;
