import React from "react";
import "./tile.styles.css";
import { useNavigate } from "react-router-dom";

//Component to display list of restaurants as clickable tiles.
export const Tile = ({ restaurant, cid }) => {
  const { name, rid } = restaurant;
  let navigate = useNavigate();

  const routeToMenu = () => {
    const ridString = rid.toString();
    navigate(`/menu/${cid}/${ridString}`);
  };

  return (
    <div className="tile-container" onClick={routeToMenu}>
      <h1 className="logo">{name[0]}</h1>
      <h2>{name}</h2>
    </div>
  );
};
