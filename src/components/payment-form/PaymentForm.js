import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SelectField from '../form/SelectField';
import { MachineContext } from '../../context/machine';

/**
 * - paypal, paytm, googlepay
 *
 */

function PaymentForm() {
  const [state, send] = useContext(MachineContext);
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues: state.context.payment,
  });

  const onSubmit = (values) => {
    // console.log(
    //   send('AddPayment', {
    //     payment: values,
    //   }),
    // );
    send('AddPayment', {
      payment: values,
    })
    router.push('/summary');
  };

  const handleSkipPayment = () => {
    send('AddPayment', {
      payment: {paymentType: ''},
    })
    router.push('/summary');
  }

  return (
    <form
      className="flex flex-col max-w-md p-6 space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-1">
        <label className="mr-2" htmlFor="paymentType">
          Select Payment
        </label>
        <SelectField id="paymentType" name="paymentType" control={control}>
          <option value="">Select an option:</option>
          <option value="GPay">GPay</option>
          <option value="PayTM">PayTM</option>
          <option value="Paypal">PayPal</option>
        </SelectField>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Link href="/shipping">
          <a className="px-3 py-2 text-center text-black bg-white border border-black rounded-md">
            Shipping address
          </a>
        </Link>{' '}
        <button
          className="px-3 py-2 text-white bg-black rounded-md"
          type="submit"
        >
          Submit Payment
        </button>
        <button
          className="px-3 py-2 text-black bg-white border border-black rounded-md"
          type="button"
          onClick={handleSkipPayment}
        >
          Skip Payment
        </button>
      </div>
    </form>
  );
}

export default PaymentForm;
