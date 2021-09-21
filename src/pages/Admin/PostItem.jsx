import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PostItemForm from "../../components/Admin/PostItemForm";
import { ProductContext } from "../../Context";

import useInputChanges from "../../hooks/useInputChanges";

const PostItem = () => {
  const { setProducts } = useContext(ProductContext);

  const { values, handleInputChange } = useInputChanges({});
  const [files, setFiles] = useState("");
  const [coverImg, setCoverImg] = useState("");

  const handleItemSubmit = (e) => {
    e.preventDefault();
    const itemInfo = {
      product_name: values.product_name,
      brand: values.brand,
      weight: values.weight,
      head_size: values.head_size,
      string_pattern: values.string_pattern,
      balance: values.balance,
      length: values.length,
      grip_size: values.grip_size,
      price: values.price,
      stock: values.stock,
      description: values.description,
    };

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("itemImgs", files[i]);
    }
    formData.append("coverImg", coverImg);
    formData.append("itemInfo", JSON.stringify(itemInfo));
    axios
      .post(
        "http://localhost:3001/admin/post-item",

        formData
      )
      .then((res) => {
        setProducts(res.data);
        alert("등록이 완료되었습니다");
      });
    e.target.reset();
    setFiles("");
  };

  const handleFiles = (e) => {
    setFiles(e.target.files);
  };

  const handleCoverImg = (e) => {
    setCoverImg(e.target.files[0]);
  };

  useEffect(() => {
    console.log(values);
  }, [values]);
  return (
    <section className="post-item" style={{ margin: "0 auto" }}>
      <PostItemForm
        handleInputChange={handleInputChange}
        handleItemSubmit={handleItemSubmit}
        handleFiles={handleFiles}
        handleCoverImg={handleCoverImg}
      />
    </section>
  );
};

export default PostItem;
