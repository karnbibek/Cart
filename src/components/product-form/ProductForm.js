import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import TextField from '../form/TextField';
import NumberField from '../form/NumberField';
import RadioField from '../form/RadioField';
import { useContext } from 'react';
import { MachineContext } from '../../context/machine';

function ProductForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: { name: '', price: 0, requiresShipping: 'yes' },
  });
  const [_, send] = useContext(MachineContext);

  const onSubmit = (values) => {
    send('AddProduct', {
      product: {
        id: uuid(),
        ...values,
      },
    });
  };
  return (
    <form className="max-w-sm p-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Product Name </label>
        <TextField id="name" name="name" control={control} />
      </div>
      <div>
        <label htmlFor="price">Price Name </label>
        <NumberField id="price" name="price" control={control} />
      </div>
      <div>
        <span className="block">Require Shipping</span>
        <div className="space-x-6">
          <label htmlFor="yes">
            <RadioField
              id="yes"
              name="requiresShipping"
              value="yes"
              control={control}
            />
            <span className="ml-2">Yes</span>
          </label>
          <label htmlFor="no">
            <RadioField
              id="no"
              name="requiresShipping"
              value="no"
              control={control}
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>
      <button
        className="px-3 py-2 text-center text-white bg-black rounded-md"
        type="submit"
      >
        Add Product
      </button>
    </form>
  );
}

export default ProductForm;
