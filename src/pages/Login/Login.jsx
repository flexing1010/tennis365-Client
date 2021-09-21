import "./Login.scss";
import axios from "axios";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Context";
import Input from "../../components/Input/Input";
import { faIdCard, faLock } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useInputChanges from "../../hooks/useInputChanges";
import Button from "../../components/Button/Button";

const Login = () => {
  const initValues = {
    username: "",
    password: "",
  };

  const { values, handleInputChange } = useInputChanges(initValues);

  const [errorMessage, setErrorMessage] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const postLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        if (res.data.errorMessage) {
          alert(res.data.errorMessage);
        }
        localStorage.setItem("accessToken", res.data.token);
        setAuthState({
          username: res.data.username,
          id: res.data.id,
          status: true,
          isAdmin: res.data.isAdmin,
        });

        history.push("/");
      })
      .catch((err) => {
        if (err.response) {
          setErrorMessage(err.response.data.errorMessage);
        }
      });
  };

  const toJoin = () => {
    history.push("/join");
  };

  return (
    <div className="form-container">
      {errorMessage && <span>{errorMessage}</span>}
      <form action="" onSubmit={postLogin}>
        <Input
          inputIcon={faIdCard}
          inputName={"username"}
          inputPlaceholder={"아이디"}
          inputType={"text"}
          values={values.username}
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
        <Button text={"로그인"} />
        {/* <input type="submit" value="로그인" />
         */}
      </form>
      <button className="login-to-join" onClick={toJoin}>
        회원가입
      </button>
    </div>
  );
};

export default Login;
