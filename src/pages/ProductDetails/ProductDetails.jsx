import "./ProductDetails.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context";
import { useAxios } from "../../hooks/useAxios.js";
import DisplayProductDetails from "./DisplayProductDetails";
import Reviews from "./Reviews";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [productImgs, setProductImgs] = useState([]);
  const { authState } = useContext(AuthContext);

  let { id } = useParams();

  const addCart = () => {
    if (product.stock === 0) {
      return alert("품절된 상품입니다");
    }
    if (!localStorage.getItem("accessToken") || authState.status === false) {
      return alert("장바구니를 사용하려면 로그인 하셔야 합니다");
    } else {
      axios
        .post("https://tennis365-api.herokuapp.com/cart", {
          user_id: authState.id,
          product_id: product.id,
          quantity: 1,
        })
        .then((res) => {
          if (res.data.errorMessage) {
            return alert(res.data.errorMessage);
          }
          alert(res.data);
        });
    }
  };

  const { response } = useAxios({
    method: "get",
    url: `/view/${id}`,
  });

  useEffect(() => {
    if (response) {
      setProduct(response.product[0]);
      setProductImgs(response.productImgs);
    }
  }, [product, response]);

  return (
    <section className="product-container">
      <DisplayProductDetails
        product={product}
        addCart={addCart}
        productImgs={productImgs}
      />
      <Reviews />
    </section>
  );
};

export default ProductDetails;
