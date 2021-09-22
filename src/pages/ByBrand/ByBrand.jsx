import { useEffect, useState } from "react";
import { useContext } from "react";
import { ProductContext } from "../../Context";
import { useParams, useRouteMatch } from "react-router-dom";
import DisplayItem from "../../components/DisplayItem/DisplayItem";

const ByBrand = () => {
  const { products } = useContext(ProductContext);
  const [itemByBrand, setItemByBrand] = useState([]);
  let { id } = useParams();
  let match = useRouteMatch();
  // const { response } = useAxios({
  //   method: "get",
  //   url: `/by-brand/${id}`,
  // });

  useEffect(() => {
    setItemByBrand(products.filter((brandItem) => brandItem.brand === id));
  }, [products, match.params, id]);
  return (
    <section style={{ width: "100%", margin: "0 auto" }}>
      <DisplayItem items={itemByBrand} />
    </section>
  );
};

export default ByBrand;
