import PropTypes from "prop-types";
import style from "./style.module.css";

const Input = ({ value, name, type, placeholder, onChange, error }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={style.input}
        name={name}
        autoComplete="off"
      />
      {error && <p className={`error ${style.error}`}>{error}</p>}
    </>
  );
};

Input.prototype = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Input;
