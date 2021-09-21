import "./DeleteItem.scss";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Context";

const DeleteItem = ({
  targetId,
  url,
  closeModal,
  filterItemList,
  text,
  owner,
}) => {
  const { authState } = useContext(AuthContext);
  const handleDelete = (e) => {
    // e.parentElement.remove();

    if (window.confirm("상품을 삭제하시겠습니까?")) {
      axios
        .delete(url, {
          data: {
            targetId,
          },
        })
        .then((res) => {
          // e.target.parentElement.remove();
          filterItemList(targetId);
          alert(res.data.success);
        });
      if (closeModal) {
        closeModal();
      }
    }
  };

  return (
    <>
      {owner === authState.username ? (
        <input
          className="deleteBtn"
          type="button"
          onClick={(e) => handleDelete(e)}
          value={text}
        />
      ) : null}
    </>
  );
};

export default DeleteItem;
