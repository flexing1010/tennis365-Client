import "./DisplayItem.scss";
import { useHistory } from "react-router-dom";
import ProductImg from "../ProductImg/ProductImg";

const DisplayItem = ({ items }) => {
  let history = useHistory();

  return (
    <ul id="display-item">
      {items.map((item) => {
        return (
          <li
            className="item"
            onClick={() => {
              history.push(`/productdetails/${item.id}`);
            }}
            key={item.id}
          >
            <ProductImg item={item} class={"item__img"} />
            <div className="item__descriptions">
              <h3>{item.product_name}</h3>
              {/* <small>{item.rating}</small> */}
              <span>{item.price}원</span>
              <span className="item__descriptions-desc font-face-BBTreeR">
                {item.description}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default DisplayItem;
