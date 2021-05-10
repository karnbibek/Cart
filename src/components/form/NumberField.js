import { Controller } from 'react-hook-form';

function NumberField(props) {
  const { id, name, control } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          id={id}
          className="px-2 py-1.5 border border-black rounded-md w-full"
          type="number"
          {...field}
        />
      )}
    />
  );
}

export default NumberField;
