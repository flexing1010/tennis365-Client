const ProductImg = (props) => {
  return (
    <div className={props.class}>
      <img
        src={`https://tennis365-api.herokuapp.com/admin/${props.item.imgUrl}`}
        alt={props.item.product_name}
      />
    </div>
  );
};

export default ProductImg;
