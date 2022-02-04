const InputBox = ({
  label,
  id,
  placeholder,
  value,
  callback,
  type = "text",
}) => {
  return (
    <>
      <label htmlFor={id} className="font-semibold tracking-wide">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={true}
        id={id}
        value={value}
        onChange={callback}
        className="border w-full p-1 rounded-sm shadow-sm tracking-wide my-1"
      />
    </>
  );
};

export default InputBox;
