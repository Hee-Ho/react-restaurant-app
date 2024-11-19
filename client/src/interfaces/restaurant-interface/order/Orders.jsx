import React from "react";
import BackButton from "../../../components/BackButton";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import OrderHistoryList from "./OrderHistory.component";
import PendingOrderList from "./PendingOrder.component";
import { useParams } from "react-router-dom";
import "./Orders.styles.css"

const RestaurantOrders = () => {
  let {rid} = useParams();
  
  //Use getOrdersP from the restaurant action to get lsit of pending orders

  return (
    <div className="order-head"> 
      <BackButton />
        <h1 className="text-3xl my-4"> Orders </h1>
      <div className="restaurant-order">
        <Tabs
          id="order-tabs"
        >
          <Tab eventKey="pop_items" title="Pending Orders">
            <PendingOrderList rid={rid}> </PendingOrderList>
          </Tab>
          <Tab eventKey="busy_hours" title="Order History">
            <OrderHistoryList rid={rid}> </OrderHistoryList>
          </Tab>
        </Tabs>
        </div>
    </div>
  );
}

export default RestaurantOrders;