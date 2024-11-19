import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useQuery } from "@tanstack/react-query";
import { getOrdersHistory } from "../../../actions/restaurantAction";
import OrdersInfo from "./OrderInfoTable.component";
import { getPrice } from "../DisplayItemFunctions";

/*
component fetches and displays restaurant order history, handling loading,
error, and success states, presenting each order's details in an
accordion format if available.
*/
const OrderHistoryList = ({ rid }) => {
  let i = 0;

  //get restaurant orders history
  const { isError, isSuccess, isLoading, data } = useQuery({
    queryKey: ["history", rid],
    queryFn: () => getOrdersHistory(rid),
  });

  if (isError) {
    return <h4>Unable to retrieve list of orders </h4>;
  }

  if (isLoading) {
    return <h4>Please wait, retrieving orders history </h4>;
  }

  if (isSuccess) {
    if (data.data.length > 0) {
      return (
        <Accordion>
          {data.data.map((order) => (
            <Accordion.Item key={i++} eventKey={i++}>
              <Accordion.Header>
                Order ID: {order.order_id} &emsp; &emsp; Date:{" "}
                {convertDate(order.orderAt)} &emsp; &emsp; Order Status:{" "}
                {convertOrderStatus(order.status)}
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Name: {order.customer.name} <br></br>
                  Customer ID: {order.customer.cid} <br></br>
                </p>
                <OrdersInfo order={order.items}> </OrdersInfo>
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

const convertDate = (date) => {
  let locale = new Date(date);
  return locale.toLocaleDateString();
};

const convertOrderStatus = (status) => {
  switch (status) {
    case 1:
      return "In-progress";
    case 2:
      return "Awaiting-Pickup";
    case 3:
      return "Completed";
    default:
      return "Ordered";
  }
};
export default OrderHistoryList;
