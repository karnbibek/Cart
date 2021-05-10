import * as React from 'react';
import { assign, createMachine, Machine } from 'xstate';
import { useMachine } from '@xstate/react';

const addProduct = assign((ctx, event) => {
  return { products: [...ctx.products, event.product] };
});

const deleteProducts = assign(() => {
  return { products: [] };
});

const deleteCart = assign(() => {
  return { cart: [] };
});

const addToCart = assign((ctx, event) => {
  const isAlreadyExits = ctx.cart.find((product) => {
    // console.log(product.id, event.product.id);
    return product.id === event.product.id;
  });
  if (!isAlreadyExits) {
    return { cart: [...ctx.cart, event.product] };
  }
});

const addAddress = assign((ctx, event) => {
  return { address: event.address };
});

const addPayment = assign((ctx, event) => {
  return { payment: event.payment };
});

const machineConfig = Machine({
  initial: 'product',
  context: {
    products: [],
    cart: [],
    address: { street: '', city: '', country: '' },
    payment: {
      paymentType: '',
    },
  },
  states: {
    product: {
      on: {
        AddProduct: { actions: [addProduct] },
        AddToCart: { actions: [addToCart] },
        AddAddress: { actions: [addAddress] },
        AddPayment: { actions: [addPayment] },
        DeleteProducts: { actions: [deleteProducts] },
        DeleteCart: { actions: [deleteCart] },
      },
    },
  },
});
const MachineContext = React.createContext();

const MachineProvider = ({ children }) => {
  const [state, send] = useMachine(machineConfig);

  // console.log(state, send);

  return (
    <MachineContext.Provider value={[state, send]}>
      {children}
    </MachineContext.Provider>
  );
};

export { MachineContext, MachineProvider };
