import { Controller } from 'react-hook-form';

function TextField(props) {
  const { id, name, control } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          className="px-2 py-1.5 border border-black rounded-md w-full"
          id={id}
          type="text"
          {...field}
        />
      )}
    />
  );
}

export default TextField;
