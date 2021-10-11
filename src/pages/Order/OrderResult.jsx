import { useHistory, useParams } from "react-router-dom";
// import queryString from "query-string";
import "./OrderResult.scss";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import axios from "axios";

const OrderResult = () => {
  let history = useHistory();
  let { id } = useParams();
  const [transaction, setTransaction] = useState({});

  const getPaymentMethod = (pay_method) => {
    if (pay_method === "card") return "신용카드";
    if (pay_method === "samsung") return "삼성페이";
    if (pay_method === "kakaopay") return "카카오페이";
  };

  const handleBtnClick = () => {
    history.push("/");
  };

  useEffect(() => {
    axios
      // .get(`http://localhost:3001/order/result/${id}`)
      .get(`https://tennis365-api.herokuapp.com/order/result/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setTransaction(res.data.transaction[0]);
        }
      });
  }, [id]);

  return (
    <section className="order-result">
      <p>결제가 완료되었습니다</p>
      {transaction !== undefined && (
        <>
          <div className="order-result__row">
            <span className="row__title">주문번호</span>
            <div className="row__text">{transaction.merchant_uid}</div>
          </div>
          <div className="order-result__row">
            <span className="row__title">결제 방법</span>
            <div className="row__text">
              {getPaymentMethod(transaction.pay_method)}
            </div>
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
        </>
      )}
      <Button text={"홈으로 돌아가기"} handleBtnClick={handleBtnClick} />
    </section>
  );
};

export default OrderResult;
