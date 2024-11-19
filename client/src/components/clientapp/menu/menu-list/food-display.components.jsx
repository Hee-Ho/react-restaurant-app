import React from "react";
import { FoodTile } from '../menu-cards/food.components'
import "./food-display.styles.css";

//Component to organize tiles into a grid. Called in landingScreen.JS as "Restaurants"
export const FoodMenu = ({ menu, addToCart }) => {
    if (!menu) {
        return;
    }

    //sort menu items based on category
    const sortedMenu = menu.sort((a, b) => {
        return a.category - b.category;
  });
    return (
    <div className="tilelist">
        {sortedMenu
            .filter(data => data.available)
            .map(item => (
                <FoodTile key={item.name} item={item} addToCart={addToCart} />
            ))}
    </div>
    );
}
