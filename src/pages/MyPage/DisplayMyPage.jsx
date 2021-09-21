import { useHistory } from "react-router-dom";
import ProductImg from "../../components/ProductImg/ProductImg";
import "./DisplayMyPage.scss";

const DisplayMyPage = ({ orders, orderItems, user }) => {
  let history = useHistory();

  let status = (order) => {
    const status = order.status;
    if (status === 0) return "신규주문";
    if (status === 1) return "발송대기";
    if (status === 2) return "배송중";
    if (status === 3) return "배송완료";
    if (status === 4) return "구매확정";
    if (status === 5) return "취소요청";
  };

  let payMethod = (pay_method) => {
    if (pay_method === "card") return "신용카드";
    if (pay_method === "samsung") return "삼성페이";
    if (pay_method === "kakaopay") return "카카오페이";
  };

  return (
    <div className="mypage__container">
      <div className="my-info">
        <h2 className="my-info__name">안녕하세요 {user.name}님</h2>
        <div className="my-info__data">
          <div className="my-info__address">
            <h3>주소</h3>
            <span className="mypage__data--address1">{user.address1}</span>
            <span className="mypage__data--address2">{user.address2}</span>
          </div>

          <div className="mypage__data--email">
            <h3>이메일</h3>
            <span>{user.email}</span>
          </div>
        </div>
      </div>

      {orders.map((itemsArray, index) => {
        return (
          <div className="my-order" key={itemsArray.merchant_uid}>
            <div className="my-order__order-description">
              <div className="my-order__header">
                <div className="my-order__header--top">
                  <h3>{status(itemsArray)}</h3>
                  <h3>주문일자{itemsArray.orderedAt}</h3>
                </div>
                <div className="my-order__header--bottom">
                  <small className="merchant-uid">{`주문번호 ${itemsArray.merchant_uid}`}</small>
                </div>
              </div>
              <ul className="my-order__order-list">
                {orderItems[index].map((item) => {
                  return (
                    <li className="order-list" key={item.id}>
                      <ProductImg item={item} class={"order-list__img"} />

                      <span
                        className="order-list__item-name"
                        onClick={() =>
                          history.push(`/productdetails/${item.product_id}`)
                        }
                      >
                        {item.product_name}
                      </span>
                      <div className="order-list__price-info">
                        <span>{`${item.price}원`} </span>
                        <small>{`(${item.quantity}개)`}</small>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="order-info">
              <h3 className="order-info--h3">주문정보</h3>
              <div className="recipient">
                <div className="recipient__name order-info--row">
                  <h4>받는사람</h4>
                  <span>{user.name}</span>
                </div>
                <div className="recipient__addr order-info--row">
                  <h4>받는주소</h4>
                  <span>{`${user.address1} ${user.address2}`}</span>
                </div>
              </div>
              <div className="receipt">
                <div className="receipt__pay-method order-info--row">
                  <h4>결제수단</h4>
                  <span>{payMethod(itemsArray.pay_method)}</span>
                </div>
                <div className="receipt__billing-amount order-info--row">
                  <h4>결제금액</h4>
                  <span>{itemsArray.grandTotal}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayMyPage;
