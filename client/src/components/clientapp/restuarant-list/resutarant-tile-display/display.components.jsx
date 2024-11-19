import React from "react";
import {Tile} from '../restaurant-tile/tile.components';
import "./display.styles.css";

//Component to organize tiles into a grid. Called in landingScreen.JS as "Restaurants"
export const TileList = ({ restaurants, cid }) => (
    <div className="tilelist">
        {restaurants.map(restaurant => (
        <Tile key={restaurant.id} restaurant={restaurant} cid={cid} />
        ))}
    </div>
    );

export default TileList;
