import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...restOfProps }) => {
  const isAuthenticated = localStorage.getItem("accessToken");

  return (
    <Route
      {...restOfProps}
      render={
        (props) =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />

        // <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
