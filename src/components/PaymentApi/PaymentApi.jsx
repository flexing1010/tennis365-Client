import { useEffect } from "react";

const PaymentApi = ({ handleInputChange }) => {
  const { IMP } = window;
  IMP.init("imp83950599");
  //   const {
  //     pay_method,
  //     merchant_uid,
  //     amount,
  //     buyer_name,
  //     buyer_tel,
  //     buyer_email,
  //   } = values;
  //   const data={
  //     pay_method,
  //     merchant_uid
  //   }
  useEffect(() => {});
  return (
    <div className="iamport-container">
      <div className="pay-method">
        <span>결제방법</span>
        <div>
          <input
            type="radio"
            id="카드"
            name="pay_method"
            value="card"
            onChange={handleInputChange}
          />
          <label htmlFor="카드">신용카드</label>
        </div>
        <div>
          <input
            type="radio"
            id="삼성"
            name="pay_method"
            value="samsung"
            onChange={handleInputChange}
          />
          <label htmlFor="삼성">삼성페이</label>
        </div>
        <div>
          <input
            type="radio"
            id="kakaopay"
            name="pay_method"
            value="kakaopay"
            onChange={handleInputChange}
          />
          <label htmlFor="kakaopay">카카오페이</label>
        </div>
      </div>
    </div>
  );
};

export default PaymentApi;
