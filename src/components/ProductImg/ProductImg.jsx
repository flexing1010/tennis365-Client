const ProductImg = (props) => {
  return (
    <div className={props.class}>
      <img
        src={`http://localhost:3001/admin/${props.item.imgUrl}`}
        alt={props.item.product_name}
      />
    </div>
  );
};

export default ProductImg;
