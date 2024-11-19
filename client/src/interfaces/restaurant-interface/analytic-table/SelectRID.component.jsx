import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Form } from "react-bootstrap";
import { getAllRestaurants } from "../../../actions/restaurantAction";
import "./SelectRID.styles.css";

/*component fetches and displays a list of restaurants for selection,
handling loading, error, and success states, rendering a dropdown menu with
restaurant options upon success.*/
const RIDSelector = ({ selectRID }) => {
  const { isError, isSuccess, isLoading, data } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getAllRestaurants,
    refetchOnMount: true,
  });

  const handleChange = async (option) => {
    //handle change for selecting SID in dropbox
    selectRID(option.target.value);
  };

  if (isError) {
    return <h4>Unable to retrieve restaurant list </h4>;
  }

  if (isLoading) {
    return <h4>Please wait, retrieving restaurant list </h4>;
  }

  if (isSuccess) {
    return (
      <div className="rid_selector">
        <Form.Select
          className="selector"
          size="lg"
          aria-label="Default select example"
          onChange={handleChange}
        >
          {data.data.map((row) => (
            <option key={row.rid} value={row.rid}>
              {" "}
              {row.name}{" "}
            </option>
          ))}
        </Form.Select>
      </div>
    );
  }
};

export default RIDSelector;
