import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import { addItem } from "../../actions/restaurantAction";

const CreateItem = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [wid, setWid] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParam = (name) => {
    const params = new URLSearchParams(location.search);
    return params.get(name);
  };

  /*
   adds an item to a restaurant's menu, managing loading state
   and validation, and navigates to the home page upon success
   or displays an error alert on failure.
  */
  const handleSaveItem = async () => {
    const restaurantId = getQueryParam("restaurantId");

    const itemData = {
      name,
      price,
      // Default values if left blank
      category: category.length === 0 ? "1" : category,
      wid: wid.length === 0 ? "1" : wid,
    };

    setLoading(true);

    if (name.length === 0 || price.length === 0) {
      alert("Please fill in all fields");
      setLoading(false);
    } else {
      try {
        await addItem(restaurantId, itemData);
        setLoading(false);
        navigate("/RestaurantInterface/home");
      } catch (error) {
        setLoading(false);
        alert("Error adding item. Check console.");
        console.error("Error adding item:", error);
      }
    }
  };

  // advance field toggle
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Food Item</h1>
      {loading && <Spinner />}
      <div className="border-2 border-sky-400 rounded-xl max-w-[600px] p-4 mx-auto">
        {/* Item  */}
        <div className="my-4">
          <label className="text-xl text-gray-700 block mb-2">
            Food Item *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
            required
          />
        </div>

        {/* Price */}
        <div className="my-4">
          <label className="text-xl text-gray-700 block mb-2">Price *</label>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
            required
          />
        </div>

        {/* Button to toggle visibility of additional inputs */}
        <div className="text-center my-4">
          <button
            className={`px-4 py-2 rounded-md ${
              showMore ? "bg-red-500" : "bg-blue-500"
            } text-white focus:outline-none`}
            style={{ cursor: "pointer" }}
            onClick={toggleShowMore}
          >
            {showMore ? "Basic Fields" : "Advance Fields"}
          </button>
        </div>

        {/* Additional inputs (Category and Worker ID) */}
        {showMore && (
          <>
            {/* Category */}
            <div className="my-4">
              <label className="text-xl text-gray-700 block mb-2">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Worker ID */}
            <div className="my-4">
              <label className="text-xl text-gray-700 block mb-2">
                Worker ID
              </label>
              <input
                type="number"
                min="0"
                value={wid}
                onChange={(e) => setWid(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              />
            </div>
          </>
        )}

        <button
          className="px-4 py-2 bg-sky-300 rounded-md mt-4 self-start text-white focus:outline-none"
          onClick={handleSaveItem}
        >
          Add Item
        </button>
      </div>
    </div>
  );
};

export default CreateItem;
