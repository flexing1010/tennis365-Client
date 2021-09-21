import { useContext } from "react";
import { AuthContext } from "../../Context";
import { Link, useHistory } from "react-router-dom";
import "./Header.scss";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  let history = useHistory();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    history.push("/");
  };

  return (
    <header className="main-header">
      <div className="top-nav">
        <ul>
          <li className="title">
            <Link to="/">
              <img src={"/images/nav-logo.jpg"} alt="logo" />
              <span>Tennis 365</span>
            </Link>
          </li>
          {authState.isAdmin ? (
            <li className="links-container admin-menu">
              <div>
                <Link to="/admin/post-item">
                  <span className="header-link">상품등록</span>
                </Link>
              </div>
              <div>
                <Link to="/admin/item-list">
                  <span className="header-link">상품목록</span>
                </Link>
              </div>
              <div>
                <Link to="/admin/user-list">
                  <span className="header-link">유저목록</span>
                </Link>
              </div>
              <div>
                <Link to="/admin/manage-order">
                  <span className="header-link">주문관리</span>
                </Link>
              </div>
            </li>
          ) : null}
          {!authState.status ? (
            <li className="links-container">
              <div>
                <Link to="/login">
                  <span className="header-link">로그인</span>
                </Link>
              </div>
              <div>
                <Link to="/join">
                  <span className="header-link">회원가입</span>
                </Link>
              </div>
            </li>
          ) : (
            <li className="logout-btn">
              <div className="logout-btn__username">
                <strong>
                  {!authState.isAdmin
                    ? `${authState.username}님`
                    : `${authState.username}`}
                </strong>
              </div>
              <button onClick={logout}>
                <span className="header-link log-out">로그아웃</span>
              </button>
            </li>
          )}
        </ul>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
