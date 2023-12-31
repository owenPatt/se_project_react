import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn, ...rest }) => {
  return <Route {...rest}>{loggedIn ? children : <Redirect to="/" />}</Route>;
};

export default ProtectedRoute;
