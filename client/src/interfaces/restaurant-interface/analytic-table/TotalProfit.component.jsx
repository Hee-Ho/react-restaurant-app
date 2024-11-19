import React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table } from "react-bootstrap";
import { getPrice } from "../DisplayItemFunctions";
import { getProfit } from "../../../actions/restaurantAction";

/*
component fetches and displays total profit information for a restaurant,
handling loading, error, and success states, rendering the profit amount
in a table format upon success, or indicating null.
*/
const TotalProfit = ({ rid }) => {
  const [profit, setProfit] = useState();
  const [currentRID, setCurrentRID] = useState(0);

  const { isError, isSuccess, isLoading, data } = useQuery({
    queryKey: ["profit", rid],
    queryFn: () => getProfit(rid),
    refetchOnMount: true,
  });

  if (isError) {
    return <h4>Unable to retrieve profit information </h4>;
  }

  if (isLoading) {
    return <h4>Please wait, retrieving profit information </h4>;
  }

  if (isSuccess) {
    if (currentRID !== rid) {
      if (data.data.length > 0) {
        setProfit(getPrice(data.data[0].totalAmount));
      } else {
        setProfit(getPrice(0));
      }
      setCurrentRID(rid);
    }
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Total Profit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> ${profit} </td>
          </tr>
        </tbody>
      </Table>
    );
  }
};

export default TotalProfit;
