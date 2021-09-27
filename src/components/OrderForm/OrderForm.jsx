// import queryString from "query-string";
import AddressInput from "../AdressInput/AdressInput";
import Input from "../Input/Input";
import "./OrderForm.scss";
import useInputChanges from "../../hooks/useInputChanges";
import { useEffect } from "react";
import usePostcode from "../../hooks/usePostcode";
import InfoBox from "../InfoBox/InfoBox";
import Button from "../Button/Button";
import PaymentApi from "../PaymentApi/PaymentApi";
import {
  faBarcode,
  faCashRegister,
  faEnvelope,
  faMobileAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import axios from "axios";

const OrderForm = ({ orderInfo, orderItems, user, transactionInfo }) => {
  const [fullAddress, setFulladdress, handleComplete] = usePostcode();
  const { values, handleInputChange, setValues } = useInputChanges({});

  let history = useHistory();

  const submitOrder = (e) => {
    orderItems.forEach((item) => {
      item.stock = item.stock - item.quantity;
    });
    e.preventDefault();
    const data = {
      pay_method: values.pay_method,
      merchant_uid: `min_${new Date().getTime()}`,
      amount: orderInfo.grandTotal,
      buyer_name: values.name,
      buyer_tel: values.buyer_tel,
      buyer_email: values.email,
      buyer_addr: `${fullAddress} ${values.address2}`,
      name:
        orderItems.length === 1
          ? orderItems[0].product_name
          : `${orderItems[0].product_name} 외 ${orderItems.length - 1}`,
      m_redirect_url: `https://sleepy-austin-0254fa.netlify.app/order/payment/${transactionInfo.order_id}/mobile`,
    };

    const { IMP } = window;
    IMP.init("imp83950599");

    IMP.request_pay(data, (response) => {
      if (response.success === true) {
        // const query = queryString.stringify(response);

        axios
          // .post("http://localhost:3001/order/result", {
          .post("https://tennis365-api.herokuapp.com/order/result", {
            user_id: transactionInfo.user_id,
            order_id: transactionInfo.order_id,
            // buyer_name: data.buyer_name,
            // name: data.name,
            // buyer_addr: data.buyer_addr,
            // buyer_tel: data.buyer_tel,
            // pay_method: data.pay_method,
            merchant_uid: data.merchant_uid,
            imp_uid: response.imp_uid,
            status: 0,
            orderItems,
            amount: orderInfo.grandTotal,
            // user_id: transactionInfo.user_id,
            // order_id: transactionInfo.order_id,
            // buyer_name: response.buyer_name,
            // name: response.name,
            // buyer_addr: response.buyer_addr,
            // buyer_tel: response.buyer_tel,
            // pay_method: response.pay_method,
            // merchant_uid: response.merchant_uid,
            // status: 0,
            // orderItems,
            // amount: orderInfo.grandTotal,
          })
          .then((res) => {
            if (res.status === 200) {
              history.push({
                pathname: `/order/payment/${response.merchant_uid}`,
              });
            }
          });

        // history.push({
        //   pathname: "/order/payment",
        //   search: `?${query}`,

        // });
      } else {
        // console.log(response);
      }
    });
    // console.log(data);
  };

  useEffect(() => {
    setValues({
      name: user.name,
      email: user.email,
      buyer_tel: "",
      address2: user.address2,
    });
    setFulladdress(user.address1);
    // console.log(user, orderItems, orderInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <form className="order-form" onSubmit={submitOrder}>
      <div className="customer">
        <h2 className="customer__h2">받는사람정보</h2>
        <Input
          inputIcon={faUser}
          inputName={"name"}
          inputPlaceholder={"이름"}
          inputType={"text"}
          values={values.name}
          inputOnChange={handleInputChange}
        />
        <Input
          inputIcon={faEnvelope}
          inputName={"email"}
          inputPlaceholder={"이메일"}
          inputType={"email"}
          values={values.email}
          inputOnChange={handleInputChange}
        />
        <Input
          inputIcon={faMobileAlt}
          inputName={"buyer_tel"}
          inputPlaceholder={"연락처('-'을 제외하고 입력해주세요)"}
          inputType={"tel"}
          inputPattern={"^[0-9]+$"}
          values={values.buyer_tel}
          inputOnChange={handleInputChange}
        />
        <AddressInput
          address2={values.address2}
          handleInputChange={handleInputChange}
          handleComplete={handleComplete}
          fullAddress={fullAddress}
        />
      </div>
      <div className="order-checkout">
        <div className="order">
          <h2>상품정보</h2>
          {orderItems.map((item) => {
            return (
              <InfoBox
                key={item.id}
                // propsKey={item.id}
                faIcon={faBarcode}
                infoText={`${item.product_name}`}
                additionalInfo={`${item.quantity} 개`}
              />
            );
          })}
        </div>
        <div className="checkout">
          <h2>결제정보</h2>
          <InfoBox
            faIcon={faCashRegister}
            infoText={`결제금액 ${orderInfo.grandTotal}원`}
          />
          <PaymentApi handleInputChange={handleInputChange} />
        </div>
        <Button text={"결제하기"} />
      </div>
    </form>
  );
};

export default OrderForm;
