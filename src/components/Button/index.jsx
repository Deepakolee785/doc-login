import PropTypes from "prop-types";

import Loading from "../../assests/svg/Loading";
import style from "./style.module.css";

const Button = ({
  type = "button",
  children,
  loading,
  variant = "primary",
  block = false,
  onClick,
}) => {
  const getVariantClasses = () => {
    let classes = "";
    if (variant === "outlined") classes = style.btnOutlined;
    else if (variant === "danger") classes = style.btnDanger;
    else classes = style.btnPrimary;
    return classes;
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${style.btn} ${
        loading ? style.loading : ""
      } ${getVariantClasses()}`}
      disabled={loading}
      style={{ width: block ? "100%" : null }}
    >
      {loading && <Loading />}
      <span>{children}</span>
    </button>
  );
};

Button.prototype = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  loading: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "outlined", "danger"]),
  block: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
