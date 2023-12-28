import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(rest) =>
        loggedIn ? <Component {...rest} /> : <Redirect to="/" />
      }
    />
  );
};

export default ProtectedRoute;
