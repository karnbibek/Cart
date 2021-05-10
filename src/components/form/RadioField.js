import { Controller } from 'react-hook-form';

function TextField(props) {
  const { id, name, value, control } = props;
  return (
    <Controller
      id={id}
      name={name}
      control={control}
      render={({ field }) => <input type="radio" {...field} value={value} />}
    />
  );
}

export default TextField;
