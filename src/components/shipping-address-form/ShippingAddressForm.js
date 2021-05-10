import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TextField from '../form/TextField';
import SelectField from '../form/SelectField';
import { useContext } from 'react';
import { MachineContext } from '../../context/machine';

/**
 * street
 * city
 * country(England and USA only) 1. England 2. england and usa
 */

function ShippingAddressForm() {
  const [state, send] = useContext(MachineContext);
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues: state.context.address,
  });
  const onSubmit = (values) => {
    // console.log(
    //   send('AddAddress', {
    //     address: values,
    //   }),
    // );
    send('AddAddress', {
      address: values,
    });
    router.push('/payment');
  };

  const handleSkipAddress = () => {
    send('AddAddress', {
      address: {street: '', city: '', country: ''},
    });
    router.push('/payment');
  }
  return (
    <form className="max-w-md p-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <label className="block" htmlFor="street">
          Street{' '}
        </label>
        <TextField id="street" name="street" control={control} />
      </div>
      <div className="space-y-1">
        <label className="block" htmlFor="city">
          City{' '}
        </label>
        <TextField id="city" name="city" control={control} />
      </div>
      <div className="space-y-1">
        <label className="block" htmlFor="country">
          Country
        </label>
        <SelectField id="country" name="country" control={control}>
          <option value="England">England</option>
          <option value="EnglandAndUSA">England And USA</option>
        </SelectField>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <button
          className="px-3 py-2 text-white bg-black rounded-md"
          type="submit"
        >
          Submit Address
        </button>
        <button
          className="px-3 py-2 text-white bg-black rounded-md"
          type="button"
          onClick={handleSkipAddress}
        >
          Skip Address
        </button>
        {/* <Link href="/payment">
          <a className="px-3 py-2 text-center text-black bg-white border border-black rounded-md">
            Skip address
          </a>
        </Link> */}
      </div>
    </form>
  );
}

export default ShippingAddressForm;
