import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { removeItem } from "../../actions/restaurantAction";

/* 
handles item deletion, managing loading state and
navigation, triggering deletion using removeItem, and
displaying a confirmation prompt.
*/
const DeleteItem = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { rid, mid } = useParams();

  const handleDeleteItem = async () => {
    setLoading(true);
    try {
      await removeItem(rid, { mid: mid, wid: 1 });
      setLoading(false);
      navigate("/RestaurantInterface/home");
    } catch (error) {
      setLoading(false);
      alert(`Error deleting item. Please check console for details.`);
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Item</h1>
      {loading && <Spinner />}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl max-w-[600px] mx-auto p-8">
        <h3 className="text-2xl mb-8">
          Are you sure you want to delete this item?
        </h3>
        <div className="flex justify-center w-full">
          <button
            className="px-8 py-4 bg-red-600 text-white rounded-md w-full max-w-[200px] focus:outline-none hover:bg-red-700"
            onClick={handleDeleteItem}
            disabled={loading}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItem;
