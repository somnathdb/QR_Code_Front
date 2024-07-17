import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import { isAuthenticated } from "./auth.js";
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired, // Define PropTypes for the component prop
};

export default ProtectedRoute;
