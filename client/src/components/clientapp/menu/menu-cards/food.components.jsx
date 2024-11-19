import React from "react";
import './food.styles.css';
import { AiTwotonePlusSquare } from "react-icons/ai";
import { Deli, FreckleB, AsianRes } from "../pictures";

//Component to display list of restaurants as clickable tiles.
export const FoodTile = ({ item, addToCart }) => {
    //const { name, rid } = restaurant;
    var pictures;
    var url;

    const getImageUrl = (itemName) => {
        // Check if the itemName exists in the pictures object
        // If it exists, return the corresponding URL; otherwise, return the default URL
        return pictures[itemName] ? pictures[itemName] : "https://i.ibb.co/HXw6jv0/burger-pizza-and-soda-cartoon-icon-illustration-food-and-drink-icon-concept-isolated-premium-flat-ca.jpg";
      };

    if (item.rid === 1 ){
        pictures = Deli;
        url = getImageUrl(item.name);
    }
    if (item.rid === 2) {
        pictures = AsianRes
        url = getImageUrl(item.name);
    } else if (item.rid === 3) {
        pictures = FreckleB
        url = getImageUrl(item.name);
    }

    return (
    <div className="food-container">
        <div className="wrapper">
            <h2 className="name">{item.name}</h2>
            <p>${(item.price/100).toFixed(2)}</p>
        </div>
        <div className="push-left">
        <img className="picture" src={url}/>
            <AiTwotonePlusSquare className="add-to-cart" onClick={() =>addToCart(item)}/>
        </div>
    </div>
    )};
