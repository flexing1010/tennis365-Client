import "./ItemListEdit.scss";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Context";
import axios from "axios";
import DeleteItem from "./DeleteItem";

const ItemListEdit = ({ itemId, closeModal, filterItemList }) => {
  const { products, setProducts } = useContext(ProductContext);
  const [targetItem, setTargetItem] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [values, setValues] = useState({});
  const [coverImg, setCoverImg] = useState("");
  const [itemImgs, setItemImgs] = useState("");

  const handleCoverImgEdit = (e) => {
    setCoverImg(e.target.files);
  };
  const handleItemImgsEdit = (e) => {
    setItemImgs(e.target.files);
  };

  const requestUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < itemImgs.length; i++) {
      formData.append("editedImgs", itemImgs[i]);
    }
    formData.append("imgUrl", coverImg[0]);
    formData.append("editInfo", JSON.stringify(values));
    formData.append("itemId", itemId);

    axios
      // .patch("http://localhost:3001/admin/item-list", formData)
      .patch("https://tennis365-api.herokuapp.com/admin/item-list", formData)
      .then((res) => {
        setProducts(res.data.allItems);

        alert(res.data.success);
      });
  };

  useEffect(() => {
    if (itemId) {
      setTargetItem(products.find((item) => item.id === parseInt(itemId)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  useEffect(() => {
    if (targetItem) {
      setValues({
        product_name: targetItem.product_name,
        brand: targetItem.brand,
        weight: targetItem.weight,
        head_size: targetItem.head_size,
        string_pattern: targetItem.string_pattern,
        balance: targetItem.balance,
        length: targetItem.length,
        grip_size: targetItem.grip_size,
        price: targetItem.price,
        stock: targetItem.stock,
        description: targetItem.description,
        imgUrl: targetItem.imgUrl,
      });
    }
    setPreviewImg(targetItem.imgUrl);
  }, [targetItem]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <form
      encType="multipart/form-data"
      method="post"
      className="post-item__edit"
      onSubmit={(e) => requestUpdate(e)}
    >
      <div className="item__specs">
        <div>
          <label htmlFor="?????????">?????????</label>
          <input
            type="text"
            name="product_name"
            id="?????????"
            value={values.product_name || ""}
            onChange={(e) => inputChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor="?????????">?????????</label>
          <select
            type="text"
            name="brand"
            id="?????????"
            value={values.brand || ""}
            onChange={(e) => inputChange(e)}
            required
          >
            <option value={values.brand || ""}>{values.brand}</option>
            <option value="1">1.Babolat</option>
            <option value="2">2.Wilson</option>
            <option value="3">3.Head</option>
            <option value="4">4.Yonex</option>
            <option value="5">5.Dunlop</option>
            <option value="6">6.Prince</option>
            <option value="7">7.TecniFibre</option>
            <option value="8">8.ProKennex</option>
          </select>
        </div>
        <div>
          <label htmlFor="??????">??????</label>
          <input
            type="number"
            min="200"
            max="400"
            name="weight"
            id="??????"
            value={values.weight || ""}
            onChange={(e) => inputChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor="?????????">?????????</label>

          <select
            name="balance"
            id="?????????"
            onChange={(e) => inputChange(e)}
            required
          >
            <option value={values.balance || ""}>{values.balance}</option>
            <option value="?????? ?????????">?????? ?????????</option>
            <option value="?????? ??????">?????? ??????</option>
            <option value="??????(Even)">??????</option>
          </select>
        </div>
        <div>
          <label htmlFor="???????????????">???????????????</label>

          <select
            name="string_pattern"
            id="???????????????"
            onChange={(e) => inputChange(e)}
            required
          >
            <option value={values.string_pattern}>
              {values.string_pattern || ""}
            </option>
            <option value="16x19">16x19</option>
            <option value="16x18">16x18</option>
            <option value="18x20">18x20</option>
          </select>
        </div>
        <div>
          <label htmlFor="???????????????">???????????????</label>
          <input
            type="number"
            min="90"
            max="120"
            name="head_size"
            id="???????????????"
            value={values.head_size || ""}
            onChange={(e) => inputChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor="??????">??????</label>
          <input
            type="number"
            min="18"
            max="30"
            name="length"
            id="??????"
            value={values.length || ""}
            onChange={(e) => inputChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor="???????????????">???????????????</label>
          <input
            type="text"
            name="grip_size"
            id="???????????????"
            value={values.grip_size || ""}
            onChange={(e) => inputChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor="??????">??????</label>
          <input
            type="number"
            name="price"
            id="??????"
            value={values.price || ""}
            onChange={(e) => inputChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor="??????">??????</label>
          <input
            type="number"
            name="stock"
            id="??????"
            value={values.stock || ""}
            onChange={(e) => inputChange(e)}
            required
          />
        </div>
      </div>
      <div className="item__description">
        <div className="edit-img">
          <div className="img-preview">
            <img src={previewImg} alt="" />
          </div>
          <label htmlFor="imgUrl">?????? ?????????(1???)</label>
          <input
            type="file"
            name="imgUrl"
            className="imgUrl-label"
            accept="image/*"
            onChange={(e) => {
              setPreviewImg(window.URL.createObjectURL(e.target.files[0]));
              handleCoverImgEdit(e);
            }}
          />
          <label htmlFor="editedImgs">?????? ?????????(??? 3???)</label>
          <input
            className="editedImgs"
            type="file"
            name="editedImgs"
            accept="image/*"
            multiple
            onChange={(e) => {
              handleItemImgsEdit(e);
            }}
          />
        </div>
        <textarea
          name="description"
          id="??????"
          // cols="20"
          rows="7"
          value={values.description || ""}
          onChange={(e) => inputChange(e)}
          required
        ></textarea>
        <DeleteItem
          closeModal={closeModal}
          filterItemList={filterItemList}
          targetId={itemId}
          text={"?????? ??????"}
          // url={"http://localhost:3001/admin/item-list"}
          url={"https://tennis365-api.herokuapp.com/admin/item-list"}
        />
        <button>??????</button>
      </div>
    </form>
  );
};

export default ItemListEdit;
