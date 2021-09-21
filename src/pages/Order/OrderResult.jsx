import { useLocation } from "react-router-dom";
import queryString from "query-string";
// import { useEffect } from "react";
import "./OrderResult.scss";
import Button from "../../components/Button/Button";
// import axios from "axios";

const OrderResult = () => {
  let location = useLocation();
  const { search, state } = location;
  const query = queryString.parse(search);
  const { merchant_uid, paid_amount, name } = query;

  const getPaymentMethod = () => {
    const { pay_method } = query;
    if (pay_method === "card") return "신용카드";
    if (pay_method === "samsung") return "삼성페이";
    if (pay_method === "kakaopay") return "카카오페이";
  };

  const paymentMethod = getPaymentMethod();

  // useEffect(() => {});
  return (
    <section className="order-result">
      <p>결제가 완료되었습니다</p>
      <div className="order-result__row">
        <span className="row__title">주문번호</span>
        <div className="row__text">{merchant_uid}</div>
      </div>
      <div className="order-result__row">
        <span className="row__title">결제 방법</span>
        <div className="row__text">{paymentMethod}</div>
      </div>
      <div className="order-result__row">
        <span className="row__title">결제 금액</span>
        <div className="row__text">{`${paid_amount} 원`}</div>
      </div>
      <div className="order-result__row">
        <span className="row__title">상품 이름</span>
        <div className="row__text">{name}</div>
      </div>
      <Button text={"홈으로 돌아가기"} />
    </section>
  );
};

export default OrderResult;