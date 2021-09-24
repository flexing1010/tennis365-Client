import { useLocation, useHistory, useParams } from "react-router-dom";
// import queryString from "query-string";
// import { useEffect } from "react";
import "./OrderResult.scss";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
// import axios from "axios";

const OrderResult = () => {
  let history = useHistory();
  // let location = useLocation();
  let { id } = useParams();
  // const response = location.state.response;
  const [transaction, setTransaction] = useState({});
  // const { search } = location;
  // const query = queryString.parse(search);
  // const { merchant_uid, paid_amount, name } = query;

  const { response } = useAxios({
    method: "get",
    url: `/order/result/${id}`,
    // params: { id },
  });

  const getPaymentMethod = () => {
    // const { pay_method } = query;
    const { pay_method } = transaction;

    if (pay_method === "card") return "신용카드";
    if (pay_method === "samsung") return "삼성페이";
    if (pay_method === "kakaopay") return "카카오페이";
  };

  const paymentMethod = getPaymentMethod();

  const handleBtnClick = () => {
    history.push("/");
  };

  useEffect(() => {
    if (response) {
      setTransaction(response.transaction[0]);
    }
  }, [response, id]);
  return (
    <section className="order-result">
      <p>결제가 완료되었습니다</p>
      <div className="order-result__row">
        <span className="row__title">주문번호</span>
        <div className="row__text">{transaction.merchant_uid}</div>
      </div>
      <div className="order-result__row">
        <span className="row__title">결제 방법</span>
        <div className="row__text">{paymentMethod}</div>
      </div>
      <div className="order-result__row">
        <span className="row__title">결제 금액</span>
        {/* <div className="row__text">{`${paid_amount} 원`}</div> */}
        <div className="row__text">{`${transaction.amount} 원`}</div>
      </div>
      <div className="order-result__row">
        <span className="row__title">상품 이름</span>
        <div className="row__text">{transaction.name}</div>
      </div>

      <Button text={"홈으로 돌아가기"} handleBtnClick={handleBtnClick} />
    </section>
    // <section className="order-result">
    //   <p>결제가 완료되었습니다</p>
    //   <div className="order-result__row">
    //     <span className="row__title">주문번호</span>
    //     <div className="row__text">{merchant_uid}</div>
    //   </div>
    //   <div className="order-result__row">
    //     <span className="row__title">결제 방법</span>
    //     <div className="row__text">{paymentMethod}</div>
    //   </div>
    //   <div className="order-result__row">
    //     <span className="row__title">결제 금액</span>
    //     <div className="row__text">{`${paid_amount} 원`}</div>
    //   </div>
    //   <div className="order-result__row">
    //     <span className="row__title">상품 이름</span>
    //     <div className="row__text">{name}</div>
    //   </div>
    //   <Button text={"홈으로 돌아가기"} handleBtnClick={handleBtnClick} />
    // </section>
  );
};

export default OrderResult;
