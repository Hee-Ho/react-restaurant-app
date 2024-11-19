import React from "react";
import { useNavigate } from "react-router-dom";
import "./restaurant-button.styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const NavToRestaurantApp = () => {
  let navigate = useNavigate();
  const routeToRestaurantApp = () => {
    navigate(`/RestaurantInterface/home`);
  };

  return (
    <button
      type="button"
      className="btn btn-success btn-custom"
      onClick={routeToRestaurantApp}
    >
      Restaurant Interface
    </button>
  );
};
