import "./DisplayProductDetails.scss";
import Button from "../../components/Button/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const DisplayProductDetails = ({ product, addCart, productImgs }) => {
  // useEffect(() => {
  //   console.log(productImgs);
  // });
  return (
    <div className="product__display">
      <Carousel width="85%" showStatus={false} showThumbs={false}>
        {productImgs.map((img) => {
          return (
            <div key={img.id}>
              {/* <img src={img.img_url} alt={img.img_url} /> */}
              <img src={img.img_url} alt={img.img_url} />
            </div>
          );
        })}
      </Carousel>

      <div className="detail__info">
        <h2>{product.product_name}</h2>
        <h2>판매가 {product.price}원</h2>

        <table className="spec" cellSpacing="0">
          <tbody>
            <tr>
              <th>상품명</th>
              <td>{product.product_name}</td>
            </tr>
            <tr>
              <th>무게</th>
              <td>{`${product.weight}g`}</td>
            </tr>
            <tr>
              <th>헤드사이즈</th>
              <td>{`${product.head_size}in`}</td>
            </tr>
            <tr>
              <th>스트링패턴</th>
              <td>{product.string_pattern}</td>
            </tr>
            <tr>
              <th>밸런스</th>
              <td>{product.balance}</td>
            </tr>
            <tr>
              <th>길이</th>
              <td>{`${product.length}in`}</td>
            </tr>
            <tr>
              <th>그립사이즈</th>
              <td>{`${product.grip_size}"`}</td>
            </tr>
          </tbody>
        </table>
        <Button handleBtnClick={addCart} text={"장바구니 담기"} />
      </div>
    </div>
  );
};

export default DisplayProductDetails;
