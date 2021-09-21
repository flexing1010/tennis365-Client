import "./Input.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({
  inputIcon,
  inputName,
  inputPlaceholder,
  inputType,
  inputOnChange,
  values,
  inputPattern,
}) => {
  return (
    <div className="customer__input">
      <div className="customer__input--icon">
        <FontAwesomeIcon icon={inputIcon} className="fa-icon" />
      </div>
      <div className="customer__input-box">
        <input
          name={inputName}
          placeholder={inputPlaceholder}
          type={inputType}
          onChange={inputOnChange}
          value={values || ""}
          pattern={inputPattern}
          required
        />
      </div>
    </div>
  );
};

export default Input;
