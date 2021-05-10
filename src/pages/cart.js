import Link from 'next/link';
import ProductForm from '../components/product-form/ProductForm';
import Product from '../components/Product';
import { useContext } from 'react';
import { MachineContext } from '../context/machine';

function Cart() {
  const [state, send] = useContext(MachineContext);

  const handleAddToCart = (product) => {
    // console.log(
    //   send('AddToCart', {
    //     product,
    //   }),
    // );
    send('AddToCart', {
      product,
    });
  };

  return (
    <div>
      <ProductForm />
      <div></div>
      <div className="grid grid-cols-2 m-6 border rounded-md">
        <div className="p-6">
          <h2 className="mb-4 border-b">Products</h2>
          <div className="space-y-6">
            {state.context.products.map((product) => (
              <Product
                key={product.id}
                name={product.name}
                price={product.price}
                requiresShipping={product.isShippable}
                addToCart={() => handleAddToCart(product)}
                showAddToCartButton
              />
            ))}
          </div>
        </div>
        <div className="p-6">
          <h2 className="mb-4 border-b ">Cart</h2>
          <div className="space-y-6">
            {state.context.cart.map((product) => (
              <Product
                key={product.id}
                name={product.name}
                price={product.price}
                requiresShipping={product.isShippable}
                showAddToCartButton={false}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end p-6">
        <Link href="/shipping">
          <a className="px-3 py-2 text-white bg-black rounded-md">
            {' '}
            Shipping Address
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
