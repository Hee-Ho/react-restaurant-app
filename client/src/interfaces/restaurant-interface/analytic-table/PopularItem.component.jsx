import React from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query"; //react-query
import { getPopularItems } from "../../../actions/restaurantAction";

/*
component fetches and displays popular items analytics for a restaurant,
handling loading, error, and success states, presenting the data in a table format
if available or indicating if null.
*/
const PopularItems = ({ rid }) => {
  const [popItems, setpopItems] = useState([]);
  const [currentRID, setCurrentRID] = useState(0);

  const { isError, isSuccess, isLoading, data } = useQuery({
    queryKey: ["restaurant", rid],
    queryFn: () => getPopularItems(rid),
  });

  if (isError) {
    return <h4>Unable to retrieve analytic information </h4>;
  }

  if (isLoading) {
    return <h4>Please wait, retrieving analytic information </h4>;
  }

  if (isSuccess) {
    if ((popItems.length < 1 && data.data.length > 1) || currentRID !== rid) {
      //set rendering limit
      setpopItems(data.data);
      setCurrentRID(rid);
    }
    if (popItems.length > 0 && popItems !== undefined) {
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Menu ID</th>
              <th>Item Name</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {popItems.map((row) => (
              <tr key={row.item.mid}>
                <td>{row.item.mid}</td>
                <td>{row.item.name}</td>
                <td>{row.count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else {
      return <h4> No Popular Item Data Available </h4>;
    }
  }
};

export default PopularItems;
