function Product(props) {
  const {
    name,
    price,
    requiresShipping,
    addToCart,
    showAddToCartButton,
  } = props;

  return (
    <div className="p-6 border border-black rounded-md">
      <h2>Name: {name}</h2>
      <div>Price: {price}</div>
      <div>Shipping required: {requiresShipping ? 'Yes' : 'No'}</div>
      {showAddToCartButton ? (
        <button
          className="px-3 py-2 mt-6 text-white bg-black rounded-md"
          onClick={addToCart}
        >
          Add To Cart
        </button>
      ) : null}
    </div>
  );
}

export default Product;
