import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useQuery } from "@tanstack/react-query"; //react-query
import {
  getOrdersP,
  updateOrderStatus,
} from "../../../actions/restaurantAction"; //get pending order
import OrdersInfo from "./OrderInfoTable.component"; //for holding order items
import { getPrice } from "../DisplayItemFunctions";

const PendingOrderList = ({ rid }) => {
  let i = 0;
  const [statusFilter, setStatusFilter] = useState(""); // State for selected status

  //get restaurant orders history
  const { isError, isSuccess, isLoading, data } = useQuery({
    queryKey: ["pending", rid],
    queryFn: () => getOrdersP(rid),
  });

  const handleSave = async (order) => {
    const { order_id, schedule } = order;
    const h = new Date(schedule).getHours();
    const m = new Date(schedule).getMinutes();

    let statusValue;
    switch (statusFilter) {
      case "In-progress":
        statusValue = 1;
        break;
      case "Awaiting Pickup":
        statusValue = 2;
        break;
      case "Completed":
        statusValue = 3;
        break;
      default:
        // Default to 1 if no valid status is selected
        statusValue = 1;
    }

    try {
      await updateOrderStatus(rid, {
        order_id,
        status: statusFilter,
        h,
        m,
        wid: 1,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
    window.location.reload();
  };

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
                {convertOrderStatus(order.status)} &emsp; &emsp; Pick Up
                schedule: {convertpickUp(order.schedule)}
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Name: {order.customer.name} <br />
                  Customer ID: {order.customer.cid} <br />
                </p>
                <OrdersInfo order={order.items} />
                <h5>Grand Total: ${getPrice(order.total)}</h5>
                <div>
                  <label htmlFor="statusFilter">Item Status:</label>{" "}
                  {/* Label for dropdown */}
                  <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option disabled value="">
                      Item Status
                    </option>
                    <option value="1">In-progress</option>
                    <option value="2">Awaiting Pickup</option>
                    <option value="3">Completed</option>
                  </select>
                </div>
                <button
                  onClick={() => handleSave(order)}
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
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
      return "Awaiting Pickup";
    case 3:
      return "Completed";
    default:
      return "Ordered";
  }
};

const convertpickUp = (schedule) => {
  return schedule === 0 ? "Immediate Pickup" : "Later Pickup";
};

export default PendingOrderList;
