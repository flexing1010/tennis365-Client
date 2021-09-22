import "./Navbar.scss";
import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext, SidebarContext } from "../../Context";
import SearchBar from "../SearchBar/SearchBar";
import {
  faBars,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { isShowing, setIsShowing } = useContext(SidebarContext);
  // const location = useLocation();
  let history = useHistory();
  const { authState } = useContext(AuthContext);

  const toMyPage = () => {
    history.push({
      pathname: `/user/${authState.id}`,
      state: { id: authState.id },
    });
  };

  const handleSidebar = () => {
    setIsShowing(!isShowing);
    // console.log(isShowing);
  };

  // useEffect(() => {
  //   setIsShowing(false);

  // }, [location.pathname]);

  useEffect(() => {
    const unlisten = history.listen((location) => {
      setIsShowing(false);
    });
    return function cleanup() {
      unlisten();
    };
  }, [history, setIsShowing]);

  // useEffect(() => {
  //   console.log(typeof isShowing);
  // }, [isShowing]);

  return (
    <div className="nav-container">
      <nav className="bottom-nav">
        <ul className="bottom-nav__ul">
          <li className="fa-icon fa-bars">
            <FontAwesomeIcon icon={faBars} onClick={handleSidebar} />
          </li>
          <SearchBar />
          {!authState.isAdmin && (
            <>
              <li className="fa-cart">
                <Link to="/cart">
                  <div className="fa-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                </Link>
              </li>
              <li>
                <div onClick={toMyPage} className="user-icon">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
