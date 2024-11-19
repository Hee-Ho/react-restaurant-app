import React, { useEffect, useState, useRef } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import {
  placeOrder,
  removeFromCart,
  updateCart,
} from "../../../actions/customerAction";

import "./OrdersScreen.css";

import { NavBar } from "../../../components/clientapp/navbar/navbar.components";
import DialogueBox from "../../../components/clientapp/checkout/checkout";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PendingOrderList from "./PendingOrder.component";
import OrderHistoryList from "./OrderHistory.component";

function Order() {
  let { cid, rid } = useParams(); //Data contains the restaurant ID to fetch restaurant from db
  let [cartItems, setCartItems] = useState([]);
  let [quantities, setQuantities] = useState({});
  const [showAddedToCartMsg, setShowAddedToCartMsg] = useState(false);
  const [showAlreadyInCart, setShowAlreadyInCart] = useState(false);
  const [showDifferentResAlert, setShowDifferentResAlert] = useState(false);
  const [showOrderConfirmedMsg, setShowOrderConfirmedMsg] = useState(false);
  const [addedItem, setAddedItem] = useState("");
  const [timerId1, setTimerId1] = useState(null);
  const [timerId2, setTimerId2] = useState(null);
  const [timerId3, setTimerId3] = useState(null);
  const [timerId4, setTimerId4] = useState(null);
  const isMounted = useRef(false);
  const [dialogueVisible, setDialogueVisible] = useState(false);

  /*
   * Nav bar
   */
  // Get cart items
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true; // Set to true after initial render
      return; // Don't execute further code on initial render
    }
    setCartItems([]);
    axios
      .get(`http://localhost:8000/customer/cart/` + cid)
      .then((res) => {
        if ("Cart is Empty" === res.data.data) {
          return;
        }
        for (var items of res.data.data.items) {
          quantities[items.item.name] = items.quantity;
          cartItems.push(items.item);
        }
        setQuantities(quantities);
        setCartItems(cartItems);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, [cid]);

  //Function to add item to cart when add to cart button is pressed
  const addToCart = (data) => {
    //Check if item is already in cart
    if (cartItems.some((item) => item.name === data.name)) {
      displayAlreadyInCart();
      return;
      // Condition to check if items in cart contains item from different restuarants
    } else if (cartItems.length !== 0 && data.rid !== cartItems[0].rid) {
      displayDifferentResAlert();
      return;
    } else {
      axios
        .patch(`http://localhost:8000/customer/cart/add/${cid}`, {
          mid: data.mid,
          quantity: 1,
          rid: data.rid,
        })
        .then((res) => {
          cartItems.push(data);
          setCartItems(cartItems);
          quantities[data.name] = 1;
          displayAddedToCartAlert(data);
        })
        .catch((error) => {
          console.error("Error adding to cart", error);
        });
    }
  };

  // Alert message when item is already in cart
  const displayAlreadyInCart = () => {
    setShowAlreadyInCart(true);
    if (timerId1) {
      clearTimeout(timerId1);
    }
    // Set new timer
    const newTimerId = setTimeout(() => {
      setShowAlreadyInCart(false);
    }, 3000);
    setTimerId1(newTimerId);
  };

  // Alert message when item is from different restaurant
  const displayDifferentResAlert = () => {
    setShowDifferentResAlert(true);
    if (timerId3) {
      clearTimeout(timerId3);
    }
    // Set new timer
    const newTimerId = setTimeout(() => {
      setShowDifferentResAlert(false);
    }, 7000);
    setTimerId3(newTimerId);
  };

  //Alerts message when item is added to cart
  const displayAddedToCartAlert = (data) => {
    setAddedItem(data);
    setShowAddedToCartMsg(true);

    // reset timer if add to cart clicked before 3 seconds is up
    if (timerId2) {
      clearTimeout(timerId2);
    }

    // Set new timer
    const newTimerId = setTimeout(() => {
      setShowAddedToCartMsg(false);
    }, 3000);
    setTimerId2(newTimerId);
  };

  // Remove item from cartItems if item matches restaurant id and name
  const removeItem = (item) => {
    removeFromCart(parseInt(cid), item);
    const updatedCartItems = cartItems.filter(
      (cartItem) => !(item.name === cartItem.name && item.rid === cartItem.rid)
    );
    setCartItems(updatedCartItems);
  };

  //Creates a quantity hashmap with item name as key to track how many of one item is in the cart
  //If key does not exist in this hashmap but item exists in cart, treat it as 1. Will fix later
  const handleQuantityChange = (event, item) => {
    quantities[item.name] = parseInt(event.target.value);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item.name]: event.target.value,
    }));
    updateCart(cid, item, quantities[item.name]);
  };

  // Toggle dialogue box
  const toggleDialogue = () => {
    setDialogueVisible(!dialogueVisible);
  };

  /**
   *
   * @param {object} cartItems object containing items representing which items are in the cart
   * @param {hashmap} quantites hashmap containing the quantity of items ordered. key of hashmap is the item name,
   * value is the quantity ordered.
   */
  const checkout = () => {
    toggleDialogue();
  };

  // Order
  const order = (pickupOption) => {
    console.log(pickupOption);
    const result = placeOrder(parseInt(cid), {
      schedule: parseInt(pickupOption),
    });
    if (result) {
      setCartItems([]);
      displayOrderConfirmedAlert();
    }
  };

  // Alert message when order is confirmed
  const displayOrderConfirmedAlert = () => {
    setShowOrderConfirmedMsg(true);

    // reset timer if add to cart clicked before 3 seconds is up
    if (timerId4) {
      clearTimeout(timerId4);
    }

    // Set new timer
    const newTimerId = setTimeout(() => {
      setShowOrderConfirmedMsg(false);
    }, 3000);
    setTimerId4(newTimerId);
  }; 

  return (
    <div className="order">
      <NavBar
        cid={cid}
        cartItems={cartItems}
        quantities={quantities}
        handleChange={handleQuantityChange}
        removeFromCart={removeItem}
        checkout={checkout}
      />
      {dialogueVisible && (
        <DialogueBox onSubmit={order} onClose={toggleDialogue} />
      )}
      <h1 className="text-3xl my-4"> Orders </h1>
      <div className="restaurant-order">
        <Tabs id="order-tabs">
          <Tab eventKey="pop_items" title="Pending Orders">
            <PendingOrderList> </PendingOrderList>
          </Tab>
          <Tab eventKey="busy_hours" title="Order History">
            <OrderHistoryList
              cartItems={cartItems}
              setCartItems={setCartItems}
              quantities={quantities}
              setQuantities={setQuantities}
              >
              </OrderHistoryList>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Order;
