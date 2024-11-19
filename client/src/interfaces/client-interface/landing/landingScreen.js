import React, { useEffect, useState, useRef }from 'react';
import axios from 'axios';
import { NavBar } from'../../../components/clientapp/navbar/navbar.components'
import './landingScreen.css'
import Restaurants from '../../../components/clientapp/restuarant-list/resutarant-tile-display/display.components'
import { placeOrder, removeFromCart, updateCart } from '../../../actions/customerAction';
import { useParams } from 'react-router-dom';
import DialogueBox from '../../../components/clientapp/checkout/checkout';
import { orderConfirmedMsg } from '../../../components/clientapp/alerts/order-confirmed.components';


//Home page that displays list of restaurants
function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showOrderConfirmedMsg, setShowOrderConfirmedMsg] = useState(false);
  const [timerID, setTimerID] = useState(false);
  let {cid} = useParams();
  const isMounted = useRef(false);
  const [dialogueVisible, setDialogueVisible] = useState(false);


  useEffect( () => {
    axios.get('http://localhost:8000/restaurant/restaurants')
    .then((res) => {
      setRestaurants(res.data.data);
    })
  }, []);

  useEffect (() => {
    if (!isMounted.current) {
      isMounted.current = true; // Set to true after initial render
      return; // Don't execute further code on initial render
    }
    setCartItems([]);

    axios.get(`http://localhost:8000/customer/cart/` + cid)
    .then((res) => {
      if ("Cart is Empty" === res.data.data) {
        return;
      }
      for (var items of res.data.data.items){
        quantities[items.item.name] = items.quantity
        cartItems.push(items.item);
      }
      setQuantities(quantities);
      setCartItems(cartItems);
    })
    .catch(error => {
      console.error('Error fetching cart items:', error);
  });
  }, []);

  // Remove item from cartItems if item matches restaurant id and name
  const removeItem = (item) => {
    removeFromCart(parseInt(cid), item);
    const updatedCartItems = cartItems.filter(cartItem => !(item.name === cartItem.name && item.rid === cartItem.rid));
    setCartItems(updatedCartItems);
  }

  //Creates a quantity hashmap with item name as key to track how many of one item is in the cart
    //If key does not exist in this hashmap but item exists in cart, treat it as 1. Will fix later
    const handleQuantityChange = (event, item) => {;
      quantities[item.name] = parseInt(event.target.value);

      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [item.name]: event.target.value
      }));
      updateCart(cid, item, quantities[item.name]);
    }


    const toggleDialogue = () => {
      setDialogueVisible(!dialogueVisible);
    };

  /**
   *
   * @param {object} cartItems object containing items representing which items are in the cart
   * @param {hashmap} quantites hashmap containing the quantity of items ordered. key of hashmap is the item name,
   * value is the quantity ordered.
   */
  const checkout = (cartItems, quantites) => {
    toggleDialogue();
    console.log(cartItems);
    console.log(quantites);
  }

  const order = (pickupOption) => {
    console.log(pickupOption);
    const result = placeOrder(parseInt(cid), {schedule: parseInt(pickupOption)});
    if (result) {
      setCartItems([]);
      displayOrderConfirmedAlert();
    }
  }

  const displayOrderConfirmedAlert = () => {
    setShowOrderConfirmedMsg(true);

    // reset timer if add to cart clicked before 3 seconds is up
    if (timerID) {
      clearTimeout(timerID);
    }

    // Set new timer
    const newTimerID = setTimeout(() => {
      setShowOrderConfirmedMsg(false);
    }, 3000);
    setTimerID(newTimerID);
  }

    return (
        <div>
            <NavBar cid={cid} cartItems={cartItems} quantities={quantities} handleChange={handleQuantityChange} removeFromCart={removeItem} checkout={checkout}/>
            {dialogueVisible && <DialogueBox onSubmit={order} onClose={toggleDialogue} />}
            <div className='body'>
              {showOrderConfirmedMsg && orderConfirmedMsg()}
              <h1 className='title'>Restaurant's</h1>
              <Restaurants restaurants={restaurants} cid={cid} onClick/>
            </div>
        </div>

    )
}

export default Home;
