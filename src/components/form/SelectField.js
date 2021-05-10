import { Controller } from 'react-hook-form';

function SelectField(props) {
  const { id, name, control, multiple, children } = props;
  return (
    <Controller
      id={id}
      name={name}
      control={control}
      render={({ field }) => (
        <select
          className="px-2 py-1.5 border border-black rounded-md w-full"
          type="text"
          multiple={multiple}
          {...field}
        >
          {children}
        </select>
      )}
    />
  );
}

export default SelectField;
