import React, { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; //react-query
import { getAllOrdersP } from "../../../actions/customerAction"; //get pending order

import Accordion from "react-bootstrap/Accordion";
import OrdersInfo from "./OrderInfoTable.component"; //for holding order items

const PendingOrderList = () => {
  const {cid, rid} = useParams(); 
  let i = 0;

  // Get customer pending orders
  const { isError, isSuccess, isLoading, data } = useQuery({
    queryKey: ["pending",cid],
    queryFn: () => getAllOrdersP(cid),
  });

  // Error handling
  if (isError) {
    return <h4>Unable to retrieve list of orders </h4>;
  }

  // Loading message
  if (isLoading) {
    return <h4>Please wait, retrieving orders history </h4>;
  }

  // Convert date to locale
  const convertDate = (date) => {
    let locale = new Date(date);
    return locale.toLocaleDateString();
  };

  // Convert order status
  const convertOrderStatus = (status) => {
    switch (status) {
      case 1:
        return "In-progress";
      case 2:
        return "Awaiting Pickup";
      case 3:
        return "Completed";
      default:
        return "Ordered";
    }
  };

  // Adds a decimal point to the price
  const getPrice = (num) => {
    return (num / 100).toFixed(2);
  };

  if (isSuccess) {
    if (data.data.length > 0) {
      return (
        <Accordion>
          {data.data.map((order) => (
            <Accordion.Item key={i++} eventKey={i++}>
              <Accordion.Header>
                Restaurant: {order.restaurant.name} &emsp; &emsp; Order ID:{" "}
                {order.order_id} &emsp; &emsp; Date:{" "}
                {convertDate(order.orderAt)} &emsp; &emsp; Order Status:{" "}
                {convertOrderStatus(order.status)}
              </Accordion.Header>
              <Accordion.Body>
                <OrdersInfo order={order.items}>
                  {" "}
                </OrdersInfo>
                <h5>Grand Total: ${getPrice(order.total)}</h5>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      );
    } else {
      return <h4>No orders record available</h4>;
    }
  }
};

export default PendingOrderList;
