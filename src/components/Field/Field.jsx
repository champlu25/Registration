function Field({ type, name, value, placeholder, onChange, onBlur }) {
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
    </>
  );
}
export default Field;
