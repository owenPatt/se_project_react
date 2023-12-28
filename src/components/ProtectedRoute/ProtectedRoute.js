import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        loggedIn ? <Component {...routeProps} {...rest} /> : <Redirect to="/" />
      }
    />
  );
};

export default ProtectedRoute;
