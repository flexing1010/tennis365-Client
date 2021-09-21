import { useContext } from "react";
import DisplayItem from "../../components/DisplayItem/DisplayItem";
import { ProductContext } from "../../Context";

const AllProducts = () => {
  const { products } = useContext(ProductContext);
  return (
    <main style={{ margin: "0 auto" }}>
      <DisplayItem items={products} />
    </main>
  );
};

export default AllProducts;
