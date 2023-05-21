import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userData = localStorage.getItem("userData");
  const token = JSON.parse(userData)?.token;

  return token ? children : <Navigate to="/unauthorized" />;
};

export default PrivateRoute;
