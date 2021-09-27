import "./ItemListEdit.scss";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Context";
import axios from "axios";
import DeleteItem from "./DeleteItem";
// import DeleteItem from "./DeleteItem";

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
    // console.log(coverImg);
    // console.log(itemImgs);
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
    setPreviewImg(
      targetItem.imgUrl
      // `https://tennis365-api.herokuapp.com/admin/${targetItem.imgUrl}`
    );
  }, [targetItem]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    // console.log(values);
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
          <label htmlFor="상품명">상품명</label>
          <input
            type="text"
            name="product_name"
            id="상품명"
            value={values.product_name || ""}
            onChange={(e) => inputChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor="브랜드">브랜드</label>
          <select
            type="text"
            name="brand"
            id="브랜드"
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
          <label htmlFor="무게">무게</label>
          <input
            type="number"
            min="200"
            max="400"
            name="weight"
            id="무게"
            value={values.weight || ""}
            onChange={(e) => inputChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor="밸런스">밸런스</label>

          <select
            name="balance"
            id="밸런스"
            onChange={(e) => inputChange(e)}
            required
          >
            <option value={values.balance || ""}>{values.balance}</option>
            <option value="헤드 라이트">헤드 라이트</option>
            <option value="헤드 헤비">헤드 헤비</option>
            <option value="이븐(Even)">이븐</option>
          </select>
        </div>
        <div>
          <label htmlFor="스트링패턴">스트링패턴</label>

          <select
            name="string_pattern"
            id="스트링패턴"
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
          <label htmlFor="헤드사이즈">헤드사이즈</label>
          <input
            type="number"
            min="90"
            max="120"
            name="head_size"
            id="헤드사이즈"
            value={values.head_size || ""}
            onChange={(e) => inputChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor="길이">길이</label>
          <input
            type="number"
            min="18"
            max="30"
            name="length"
            id="길이"
            value={values.length || ""}
            onChange={(e) => inputChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor="그립사이즈">그립사이즈</label>
          <input
            type="text"
            name="grip_size"
            id="그립사이즈"
            value={values.grip_size || ""}
            onChange={(e) => inputChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor="가격">가격</label>
          <input
            type="number"
            name="price"
            id="가격"
            value={values.price || ""}
            onChange={(e) => inputChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor="수량">수량</label>
          <input
            type="number"
            name="stock"
            id="수량"
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
          <label htmlFor="imgUrl">커버 이미지(1장)</label>
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
          <label htmlFor="editedImgs">상품 이미지(총 3장)</label>
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
          id="설명"
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
          text={"상품 삭제"}
          // url={"http://localhost:3001/admin/item-list"}
          url={"https://tennis365-api.herokuapp.com/admin/item-list"}
        />
        <button>등록</button>
      </div>
    </form>
  );
};

export default ItemListEdit;
