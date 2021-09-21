import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Context";
import "./ItemListDisplay.scss";
import Modal from "../../components/Modal/Modal";
import useModal from "../../hooks/useModal";
import ItemListEdit from "../../components/Admin/ItemListEdit";
const ItemListDisplay = () => {
  const { products } = useContext(ProductContext);
  const [itemList, setItemList] = useState([]);
  const [modalOpen, openModal, closeModal] = useModal();
  const [itemId, setItemId] = useState([]);
  // const [targetItem, setTargetItem] = useState("");

  const onClickModal = (e) => {
    setItemId(e.target.closest("tr").id);
    openModal();
  };

  const filterItemList = (targetId) => {
    setItemList(itemList.filter((item) => item.id !== parseInt(targetId)));
    console.log(itemList, "filter");
  };

  useEffect(() => {
    if (products) {
      setItemList(products);
    }
  }, [products]);
  return (
    <>
      <table id="item-list__table">
        <thead>
          <tr>
            <th>id</th>
            <th>이미지</th>
            <th>상품명</th>
          </tr>
        </thead>
        <tbody>
          {itemList &&
            itemList.map((item) => {
              return (
                <tr
                  onClick={(e) => onClickModal(e)}
                  className="item"
                  key={item.id}
                  id={item.id}
                >
                  <td className="item-id">{item.id}</td>
                  <td className="item-img">
                    <img
                      src={`http://localhost:3001/admin/${item.imgUrl}`}
                      alt=""
                    />
                  </td>
                  <td className="item-name">{item.product_name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Modal open={modalOpen} close={closeModal} header="상품수정">
        <ItemListEdit
          itemId={itemId}
          closeModal={closeModal}
          filterItemList={filterItemList}
        />
      </Modal>
    </>
  );
};

export default ItemListDisplay;
