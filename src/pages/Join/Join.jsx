import "./Join.scss";
import axios from "axios";
import Input from "../../components/Input/Input";
// import Modal from "../../components/Modal/Modal";
// import DaumPostcode from "react-daum-postcode";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faIdCard,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import usePostcode from "../../hooks/usePostcode";

import useInputChanges from "../../hooks/useInputChanges";
import AddressInput from "../../components/AdressInput/AdressInput";

const Join = () => {
  const initValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    address2: "",
  };

  const { values, handleInputChange } = useInputChanges(initValues);

  const [fullAddress, setFullAddress, handleComplete] = usePostcode();
  // const [address2, setAddress2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory();

  const postJoin = (e) => {
    e.preventDefault();
    axios
      .post("https://tennis365-api.herokuapp.com/join", {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
        address1: fullAddress,
        address2: values.address2,
      })
      .then((response) => {
        alert("가입이 완료 되었습니다!");
        history.push("/login");
      })
      .catch((err) => {
        if (err.response) {
          setErrorMessage(err.response.data.errorMessage);
        }
      });
  };

  return (
    <div className="form-container">
      {errorMessage && <span>{errorMessage}</span>}
      <form
        action="https://tennis365-api.herokuapp.com/join"
        method="POST"
        onSubmit={postJoin}
      >
        <Input
          inputIcon={faUser}
          inputName={"name"}
          inputPlaceholder={"이름"}
          inputType={"text"}
          values={values.name}
          inputOnChange={handleInputChange}
        />
        <Input
          inputIcon={faIdCard}
          inputName={"username"}
          values={values.username}
          inputPlaceholder={"아이디"}
          inputType={"text"}
          inputOnChange={handleInputChange}
        />
        <Input
          inputIcon={faEnvelope}
          inputName={"email"}
          values={values.email}
          inputPlaceholder={"이메일"}
          inputType={"email"}
          inputOnChange={handleInputChange}
        />
        <Input
          inputIcon={faLock}
          inputName={"password"}
          values={values.password}
          inputPlaceholder={"비밀번호"}
          inputType={"password"}
          inputOnChange={handleInputChange}
        />
        <Input
          inputIcon={faLock}
          inputName={"passwordConfirm"}
          values={values.passwordConfirm}
          inputPlaceholder={"비밀번호 확인"}
          inputType={"password"}
          inputOnChange={handleInputChange}
        />
        <AddressInput
          handleInputChange={handleInputChange}
          handleComplete={handleComplete}
          fullAddress={fullAddress}
          address2={values.address2}
        />

        <input className="join-btn" type="submit" value="회원가입" />
      </form>
    </div>
  );
};

export default Join;
