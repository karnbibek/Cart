import { useContext } from 'react';
import { useRouter } from 'next/router';
import { MachineContext } from '../context/machine';
import Product from '../components/Product';

function Summary() {

  const router = useRouter();

  const [state, send] = useContext(MachineContext);
  const cart = state.context.cart;
  const address = state.context.address;
  const paymentMethod = state.context.payment.paymentType;

  const handleCancel = () => {
    send('DeleteProducts');
    send('DeleteCart');
    send('AddAddress', {
      address: {street: '', city: '', country: ''},
    });
    send('AddPayment', {
      payment: {paymentType: ''},
    });
    router.push('/cart');
  }

  const handleSubmit = () => {
    const order = JSON.stringify({
      cart,
      address,
      paymentMethod
    });
    fetch('https://pastebin.com/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
    .then(res => res.json())
    .then(response => console.log(response))
    .catch(err => console.log(err));
    setTimeout(() => {
      window.alert('Your order has beem submitted successfully.')
      handleCancel();
    }, 1000);
  }

  return (
    <div className="grid grid-cols-2 rounded-md border m-3 p-3">
      <div className="p-6">
        <h3>Product details:</h3>
        {cart.map((product) => (
          <div className="m-3" key={product.id}>
            <Product
              name={product.name}
              price={product.price}
              requiresShipping={product.isShippable}
              showAddToCartButton={false}
            />
          </div>
        ))}
        <h3>Address Details:</h3>
        <div className="m-3 p-6 border border-black rounded-md">
          {address.street || address.city || address.country ?
            (
              <>
                <div>Street: {address.street}</div>
                <div>City: {address.city}</div>
                <div>Country: {address.country}</div>
              </>
            ) :
            <h2>You haven't entered any address. You can collect your items from our shop.</h2>}
        </div>
        <h3>Payment Details:</h3>
        <div className="m-3 p-6 border border-black rounded-md">
          {paymentMethod ?
            (
              <>
                <div>Payment Method: {paymentMethod}</div>
              </>
            ) :
            <h2>You haven't selected any payment method. You can pay cash on delivery.</h2>}
        </div>
        <button
          className="px-3 py-2 mt-6 text-white bg-black rounded-md"
          onClick={handleSubmit}
        >
          Submit Order
        </button>
        <button
          className="px-3 m-6 py-2 mt-6 text-white bg-black rounded-md"
          onClick={handleCancel}
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
}

export default Summary;
