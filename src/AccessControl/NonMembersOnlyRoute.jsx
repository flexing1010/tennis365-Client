import { Redirect, Route } from "react-router-dom";

const NonMembersOnlyRoute = ({ component: Component, ...restOfProps }) => {
  const isAuthenticated = localStorage.getItem("accessToken");
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default NonMembersOnlyRoute;
