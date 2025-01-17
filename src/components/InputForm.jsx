const InputForm = ({
  type,
  id,
  title,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm md:text-base font-medium text-gray-200"
      >
        {title}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`mt-2 block w-full px-3 py-3 md:px-4 md:py-3 borde rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-white`}
        placeholder={placeholder}
      />
    </div>
  );
};
export default InputForm;
