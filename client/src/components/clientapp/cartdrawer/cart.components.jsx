import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { Drawer } from "antd";
import { removedFromCartMsg } from "../alerts/removed-from-cart.components";
import { AiOutlineShoppingCart, AiTwotoneDelete } from 'react-icons/ai';



import './cart.styles.css'

//Cart component for the cart drawer
export const Cart = ({cartItems, quantities, handleChange, removeFromCart, checkout}) => {
    const [open, setOpen] = useState(false);
    const [showRemovedFromCartMsg, setShowRemovedFromCartMsg] = useState(false);
    const [removedItem, setRemovedItem] = useState('');
    const [timerId, setTimerId] = useState(null);


    //Calculates the price of the individual item in cart. Updates when quantitiy dropdown is changed
    const calcPrice = (price, qty) =>{
        if (isNaN(parseFloat(qty))){
            qty = 1;
        }
        const total = parseFloat(price) * parseFloat(qty);
        return total.toFixed(2);
    }

    //Creates a quantity hashmap with item name as key to track how many of one item is in the cart
    //If key does not exist in this hashmap but item exists in cart, treat it as 1. Will fix later
    const handleQuantityChange = (event, itemName) => {
        handleChange(event, itemName);
    }

    //Remove item from cart and display alert message when item is successfully removed
    const removeItem = (item) => {
        setRemovedItem(item);
        removeFromCart(item);
        setShowRemovedFromCartMsg(true);
        delete quantities[item.name];
        if (timerId) {
            clearTimeout(timerId);
          }

          const newTimerId = setTimeout(() => {
            setShowRemovedFromCartMsg(false);
          }, 3000);
          setTimerId(newTimerId);
        }

    const checkoutPressed = () => {
        checkout(cartItems, quantities);
        setOpen(false)
    }

    const getTotal = () => {
        let total = 0;
        for (var item of cartItems) {
            var cost = item.price;
            var quantitiy = quantities[item.name];
            total += (cost * parseInt(quantitiy))
        }
        return (total/100).toFixed(2);
    }
    return (
        <div>
            <AiOutlineShoppingCart className="cart"
            onClick={() => {
                setOpen(true)
                }}>
            </AiOutlineShoppingCart>
            <Drawer open={open}
                title="Cart"

                onClose={() => {
                    setOpen(false);
                }}
            >
                <div className="drawer-content">
                    {Array.isArray(cartItems) && cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                    <table className="table">
                        <thead className="center-text">
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Price</th>
                                <th scope="col">Qty</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody className="center-text">
                            {cartItems
                            .map(item => (
                                    <tr key={item.name}>
                                        <td>{item.name}</td>
                                        <td>{'$' + calcPrice((item.price / 100).toFixed(2), quantities[item.name])}</td>
                                        <td>
                                        <select
                                        value={quantities[item.name] || 1}
                                        onChange={(event) => handleQuantityChange(event, item)}
                                        >
                                            {[...Array(99).keys()].map(num => (
                                            <option key={num + 1} value={num + 1}>{num + 1}</option>
                                            ))}
                                        </select>
                                        </td>
                                        <td>
                                            <AiTwotoneDelete className="delete" onClick={() => removeItem(item)}>
                                                Remove
                                            </AiTwotoneDelete>
                                        </td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
                        {showRemovedFromCartMsg && removedFromCartMsg(removedItem)}
                    <div className="bottom">
                        {Array.isArray(cartItems) && cartItems.length === 0 ? ("") : (
                        <>
                        <h3>Total: ${getTotal()}</h3>

                        <Button onClick={() => checkoutPressed()}>Checkout</Button>
                        </>
                        )}
                    </div>
                </div>
            </Drawer>
        </div>
    );
}
