import "./ManageOrderModal.scss";
import { useEffect, useState } from "react";

const ManageOrderModal = ({ targetId, allTransaction, transactionItem }) => {
  const [targetTransaction, setTargetTransaction] = useState("");
  const [targetItems, setTargetItems] = useState("");
  const [status, setStatus] = useState("");

  const getAmount = (amount) => {
    return parseInt(amount);
  };

  const getStatus = (item) => {
    if (status === 0) return "신규주문";
    if (status === 1) return "발송대기";
    if (status === 2) return "배송중";
    if (status === 3) return "배송완료";
  };

  useEffect(() => {
    setTargetTransaction(
      allTransaction.find((item) => item.id === parseInt(targetId))
    );
    setTargetItems(
      transactionItem.filter(
        (item) => item.order_id === targetTransaction.order_id
      )
    );
  }, [allTransaction, targetId, targetTransaction, transactionItem]);

  useEffect(() => {
    if (targetTransaction !== "") {
      setStatus(targetTransaction.status);
    }
  }, [targetTransaction]);

  return (
    <section className="transaction-modal">
      {targetTransaction.length !== 0 && (
        <table>
          <tbody>
            <tr>
              <td className="col-1">주문번호</td>
              <td>{targetTransaction.merchant_uid}</td>
            </tr>
            <tr>
              <td className="col-1">주문자</td>
              <td>{targetTransaction.buyer_name}</td>
            </tr>
            <tr>
              <td className="col-1">배송지</td>
              <td>{targetTransaction.buyer_addr}</td>
            </tr>
            <tr>
              <td className="col-1">배송품</td>
              <td>
                <ul>
                  {targetItems.length !== 0 &&
                    targetItems.map((item) => {
                      return (
                        <li
                          key={item.product_id}
                          className="transaction-modal__item-list"
                        >
                          <div>{item.product_name}</div>
                          <div>{`${item.quantity} 개`}</div>
                        </li>
                      );
                    })}
                </ul>
              </td>
            </tr>
            <tr>
              <td className="col-1">결제금액</td>
              <td>
                {getAmount(targetTransaction.amount).toLocaleString("ko-KR", {
                  style: "currency",
                  currency: "KRW",
                })}
              </td>
            </tr>
            <tr>
              <td className="col-1">주문현황</td>
              <td>
                {getStatus(status)}
                {/* <select
                  name="status"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <option value="0">신규주문</option>
                  <option value="1">발송대기</option>
                  <option value="2">배송중</option>
                  <option value="3">배송완료</option>
                </select> */}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </section>
  );
};

export default ManageOrderModal;
