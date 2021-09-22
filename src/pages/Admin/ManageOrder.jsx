import "./ManageOrder.scss";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import { useAxios } from "../../hooks/useAxios";
import { useEffect, useRef, useState } from "react";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";
import ManageOrderModal from "./ManageOrderModal";
import Button from "../../components/Button/Button";
import axios from "axios";
// import { useHistory } from "react-router";
const ManageOrder = () => {
  const [allTransaction, setAlltransaction] = useState([]);
  const [transactionItem, setTransactionItem] = useState([]);
  const [instance, setInstance] = useState("");
  const [targetId, setTargetId] = useState("");
  const [modalOpen, openModal, closeModal] = useModal();
  // let history = useHistory();
  const gridRef = useRef();

  const { response } = useAxios({
    method: "get",
    url: `/admin/manage-order`,
  });

  const columns = [
    { name: "id", header: "ID", width: 10, align: "center" },
    {
      name: "merchant_uid",
      header: "주문번호",
      className: "merchant_uid",
    },
    { name: "buyer_name", header: "주문자", width: 70, align: "center" },
    {
      name: "status",
      header: "주문현황",
      align: "center",
      editor: {
        type: "select",
        options: {
          listItems: [
            { text: "신규주문", value: 0 },
            { text: "발송대기", value: 1 },
            { text: "배송중", value: 2 },
            { text: "배송완료", value: parseInt(3) },
          ],
        },
      },
      formatter: (value) => {
        const text = value.value;
        switch (text) {
          case 0:
            return "신규주문";
          case "0":
            return "신규주문";
          case 1:
            return "발송대기";
          case "1":
            return "발송대기";
          case 2:
            return "배송중";
          case "2":
            return "배송중";
          case 3:
            return "배송완료";
          case "3":
            return "배송완료";

          default:
            return "주문현황 X";
        }
      },
      onAfterChange: (ev) => {
        instance.check(ev.rowKey);
        console.log(ev);
      },
      width: 100,
    },
    {
      name: "orderedAt",
      header: "주문일자",
    },
    // { name: "detais", header: "상세정보", data: ["상세 정보 보기"] },
  ];

  const updateStatus = async () => {
    if (instance.getCheckedRows().length < 1) {
      alert("변경할 주문을 선택 해주세요.");
      return;
    } else {
      await axios
        .patch(
          "https://tennis365-api.herokuapp.com/admin/manage-order",
          instance.getCheckedRows()
        )
        .then((res) => {
          alert("업데이트 됐습니다");
          instance.uncheckAll();
          // setAlltransaction(res.data.transaction);
        });
    }
  };

  useEffect(() => {
    if (response) {
      let items = response.transactionItem;
      setAlltransaction(response.transaction);
      setTransactionItem(Array.prototype.concat(...items));
    }
  }, [response]);

  useEffect(() => {
    // const instance = gridRef.current.getInstance();
    if (gridRef) {
      setInstance(gridRef.current.getInstance());
    }
  }, [instance]);

  return (
    <main className="manage-order" style={{ margin: "0 auto" }}>
      <div className="order-grid">
        <Grid
          ref={gridRef}
          data={allTransaction}
          columns={columns}
          // rowHeight={25}
          // bodyHeight={100}
          heightResizable={true}
          rowHeaders={["checkbox"]}
          width={600}
          columnOptions={{ resizable: true }}
          onCheck={() => {
            instance.getCheckedRows();
          }}
          onClick={(e) => {
            if (e.columnName === "merchant_uid") {
              console.log(e);
              setTargetId(instance.getValue(e.rowKey, "id"));
              openModal();
            }
          }}
        />
      </div>
      <Button text={"주문현황 변경"} handleBtnClick={updateStatus} />
      <Modal open={modalOpen} close={closeModal} header="주문관리">
        <ManageOrderModal
          targetId={targetId}
          allTransaction={allTransaction}
          transactionItem={transactionItem}
        />
      </Modal>
    </main>
  );
};

export default ManageOrder;
