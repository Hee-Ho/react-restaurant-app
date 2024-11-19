import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import { updateItem, getMenuItem } from "../../actions/restaurantAction";
import { getPrice } from "./DisplayItemFunctions";

/*
loading state and state variables for editing an item's price
and status, fetching data with useQuery, and updating the price
state upon successful data retrieval with useEffect.
*/
const EditItem = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { rid, mid } = useParams();
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("1");

  const { isSuccess, data } = useQuery({
    queryKey: ["item", rid, mid],
    queryFn: () => getMenuItem(rid, mid),
  });

  useEffect(() => {
    if (isSuccess && price.length === 0) {
      setPrice(getPrice(data.data.price));
    }
  }, [isSuccess]);

  /* 
  Updates an item with specified parameters, handles loading state,
  alerts if required fields are missing, and navigates or
  logs errors accordingly.
  */
  const handleSaveItem = async () => {
    setLoading(true);

    if (price.length === 0) {
      alert("Please fill in all fields");
      setLoading(false);
    } else {
      try {
        await updateItem(rid, {
          mid: mid,
          wid: 1,
          price: price,
          status: Number(status),
        });
        setLoading(false);
        navigate("/RestaurantInterface/home");
      } catch (error) {
        setLoading(false);
        alert("Error updating item. Check console.");
        console.error("Error updating item:", error);
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Edit Food Item</h1>
        {loading && <Spinner />}
        <div className="border-2 border-sky-400 rounded-xl max-w-[600px] p-4 mx-auto">
          <div className="my-4 flex items-center">
            <label className="text-xl mr-4 text-gray-700 w-28">Price $</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          <div className="my-4 flex items-center">
            <label className="text-xl mr-4 text-gray-700 w-28">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            >
              <option value="0">Sold Out</option>
              <option value="1">Available</option>
            </select>
          </div>

          <button
            className="px-4 py-2 bg-sky-300 rounded-md mt-4 self-start text-white focus:outline-none"
            onClick={handleSaveItem}
          >
            Save Item
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default EditItem;
