export const CheckBox = ({ label, callback, isChecked }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={label}
        onChange={callback}
        checked={isChecked}
        className="mx-1"
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};
