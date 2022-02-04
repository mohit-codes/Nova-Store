import InputBox from "../../Components/InputBox";

const BillingAddress = ({ formState, setFormState }) => {
  const fields = ["name", "mobile", "address", "pinCode", "city", "state"];
  const onChange = ({ target }) =>
    setFormState({ ...formState, [target.id]: target.value });

  return (
    <div>
      {fields.map((field, index) => (
        <InputBox
          key={index}
          id={field}
          callback={onChange}
          label={field}
          value={formState[field]}
        />
      ))}
    </div>
  );
};

export default BillingAddress;
