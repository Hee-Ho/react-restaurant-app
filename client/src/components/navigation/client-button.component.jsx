import React from "react";
import { useNavigate } from "react-router-dom";
import "./client-button.styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const NavToClientApp = () => {
  let navigate = useNavigate();
  const routeToClientApp = () => {
    navigate(`/login`);
  };
  return (
    <button
      type="button"
      className="btn btn-success btn-custom"
      onClick={routeToClientApp}
    >
      Client Interface
    </button>
  );
};
