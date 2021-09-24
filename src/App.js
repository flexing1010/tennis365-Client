import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  AuthContext,
  OrderDataContext,
  ProductContext,
  SidebarContext,
} from "./Context";
import axios from "axios";

import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
// import Navbar from "./components/Navbar/Navbar";
import Search from "./pages/Search/Search";
import Footer from "./components/Footer/Footer.jsx";
import Login from "./pages/Login/Login";
import Join from "./pages/Join/Join.jsx";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";
import MyPage from "./pages/MyPage/MyPage.jsx";
import PrivateRoute from "./AccessControl/PrivateOnlyRoute.jsx";
import NonMembersOnlyRoute from "./AccessControl/NonMembersOnlyRoute.jsx";
import AdminOnlyRoute from "./AccessControl/AdminOnlyRoute";
import PostItem from "./pages/Admin/PostItem";
import ItemList from "./pages/Admin/ItemList";
import UserList from "./pages/Admin/UserList";
import ManageOrder from "./pages/Admin/ManageOrder";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import ByBrand from "./pages/ByBrand/ByBrand";
import OrderResult from "./pages/Order/OrderResult";
import Announcement from "./pages/Announcement/Announcement";
import ViewPost from "./components/ViewPost/ViewPost";
import QnA from "./pages/QnA/QnA";
import CreatePost from "./components/CreatePost/CreatePost";
import EditPost from "./components/EditPost/EditPost";
import AllProducts from "./pages/AllProducts/AllProducts";
import MobilePayment from "./components/MobilePayment/MobilePayment";
// import { useHistory } from "react-router-dom";

function App() {
  // const cancelToken = axios.CancelToken
  // const source = cancelToken.source
  const [products, setProducts] = useState([]);
  const [orderData, setOrderData] = useState({});
  const [isShowing, setIsShowing] = useState(false);
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    isAdmin: 0,
    status: false,
  });
  // http://localhost:3001/
  const getAuth = axios.get("https://tennis365-api.herokuapp.com/auth", {
    headers: {
      accessToken: localStorage.getItem("accessToken"),
    },
  });

  //  let history = useHistory();

  useEffect(() => {
    axios
      .all([getAuth, axios.get("https://tennis365-api.herokuapp.com/")])
      .then((res) => {
        if (res[0].data.errorMessage) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: res[0].data.username,
            id: res[0].data.id,
            isAdmin: res[0].data.isAdmin,
            status: true,
            // cartId: res[0].data.cartId,
          });
          // console.log(authState.isAdmin);
        }

        setProducts(res[1].data);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <ProductContext.Provider value={{ products, setProducts }}>
          <Router>
            <SidebarContext.Provider value={{ isShowing, setIsShowing }}>
              <Header />
              <Sidebar />
            </SidebarContext.Provider>
            <div className="body-wrapper">
              {/* <Navbar /> */}
              {/* 버그 authState때문에 에러가 생기는 듯 */}
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/all-products" component={AllProducts} />
                <Route exact path="/by-brand/:id" component={ByBrand} />
                <Route path="/details" component={ProductDetails} />
                <Route path="/search" component={Search} />
                <Route path="/cart" component={Cart} />
                {/* <Route path="/cart" component={Cart} /> */}
                <Route
                  exact
                  path="/board/announcement"
                  component={Announcement}
                />
                <Route exact path="/board/qna" component={QnA} />

                <Route exact path="/board/view-post/:id" component={ViewPost} />

                <PrivateRoute
                  exact
                  path="/order/payment"
                  component={OrderResult}
                />
                <PrivateRoute exact path="/user/:id" component={MyPage} />
                <PrivateRoute
                  exact
                  path="/board/create-post"
                  component={CreatePost}
                />
                <PrivateRoute
                  exact
                  path="/board/view-post/:id/edit"
                  component={EditPost}
                />
                <Route path="/productdetails/:id" component={ProductDetails} />

                <NonMembersOnlyRoute path="/join" component={Join} />
                <NonMembersOnlyRoute path="/login" component={Login} />

                <AdminOnlyRoute
                  exact
                  path="/admin/post-item"
                  component={PostItem}
                />
                <AdminOnlyRoute path="/admin/item-list" component={ItemList} />
                <AdminOnlyRoute path="/admin/user-list" component={UserList} />
                <AdminOnlyRoute
                  path="/admin/manage-order"
                  component={ManageOrder}
                />
                <OrderDataContext.Provider value={{ orderData, setOrderData }}>
                  <PrivateRoute
                    exact
                    path="/order/:id([0-9]+)"
                    component={Order}
                  />
                  <PrivateRoute
                    exact
                    path="/order/payment/mobile"
                    component={MobilePayment}
                  />
                </OrderDataContext.Provider>
              </Switch>
            </div>
            <Footer />
          </Router>
        </ProductContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
