import { Redirect, Route } from "react-router-dom";

const AdminOnlyRoute = ({ component: Component, ...restOfProps }) => {
  const isAdmins = JSON.parse(
    atob(localStorage.getItem("accessToken").split(".")[1])
  ).isAdmin;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAdmins === 1 ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default AdminOnlyRoute;
