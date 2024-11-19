import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { BsBarChart } from "react-icons/bs";
import { FaReceipt } from "react-icons/fa6";
import Spinner from "../../components/Spinner";
import { getMenu } from "../../actions/restaurantAction";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineArrowLeft,
} from "react-icons/ai";

const ManagerHome = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(() => {
    // Retrieve the selected restaurant from localStorage or default to 1
    return parseInt(localStorage.getItem("selectedRestaurant"), 10) || 1;
  });
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  /*
  fetches menu data from three different sources asynchronously,
  combines the data into a single array, updates the component's
  state with the combined data, and manages loading state during
  the fetching process in a React functional component.
  */
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const menuData1 = await getMenu(1);
        const menuData2 = await getMenu(2);
        const menuData3 = await getMenu(3);

        const combinedItems = [
          ...menuData1.data,
          ...menuData2.data,
          ...menuData3.data,
        ];
        setItems(combinedItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Save the selected restaurant to localStorage when it changes
    localStorage.setItem("selectedRestaurant", selectedRestaurant);
  }, [selectedRestaurant]);

  const handleDropdownChange = (event) => {
    setSelectedRestaurant(parseInt(event.target.value));
  };

  const handleEditItem = (rid, mid) => {
    // Handle edit functionality here
    console.log(`Edit item with restaurant ID: ${rid} and menu ID: ${mid}`);
  };

  const handleDeleteItem = (rid, mid) => {
    // Handle delete functionality here
    console.log(`Delete item with restaurant ID: ${rid} and menu ID: ${mid}`);
  };

  return (
    <div className="p-4">
      {/* Header of ManagerHome */}
      <div className="flex justify-between items-center mb-4">
        <Link to="http://localhost:3000" className="text-sky-800 text-4xl ml-4">
          <AiOutlineArrowLeft />
        </Link>

        <h1 className="text-3xl">Items</h1>

        <Link to={`/RestaurantOrders/${selectedRestaurant}`}>
          <FaReceipt className="text-sky-800 text-4xl ml-4" />
        </Link>

        <Link to={`/RestaurantAnalytic/${selectedRestaurant}`}>
          <BsBarChart className="text-sky-800 text-4xl ml-4" />
        </Link>
        <Link to={`/items/create?restaurantId=${selectedRestaurant}`}>
          <MdOutlineAddBox className="text-sky-800 text-4xl ml-4" />
        </Link>
      </div>
      <div className="flex flex-col items-left">
        <label className="mr-2 text-gray-600">Manager Login:</label>
        <select
          id="dropdown"
          style={{ width: "200px", maxWidth: "100%", backgroundImage: "none" }}
          onChange={handleDropdownChange}
          value={selectedRestaurant}
        >
          <option value={1}>Deliscio</option>
          <option value={2}>Asianres</option>
          <option value={3}>Freckle.B</option>
        </select>
      </div>
      <br />
      <br />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spinner />
        </div>
      ) : (
        // table
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="text-center">
              <th className="py-2 w-1/6">Menu ID</th>
              <th className="py-2 w-2/6">Food Item</th>
              <th className="py-2 w-1/6">Availability</th>
              <th className="py-2 w-1/6">Restaurant Branch</th>
              <th className="py-2 w-1/6">Price</th>
              <th className="py-2 w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter((item) => selectedRestaurant == item.rid)
              .map((item, index) => (
                <tr
                  key={item._id}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                  // highlight effects
                  style={{ transition: "background-color 0.2s" }}
                  onMouseEnter={() => {
                    document
                      .getElementById(`row-${item._id}`)
                      .classList.add("hover:bg-green-300");
                  }}
                  onMouseLeave={() => {
                    document
                      .getElementById(`row-${item._id}`)
                      .classList.remove("hover:bg-green-300");
                  }}
                  // Table cells
                  id={`row-${item._id}`}
                >
                  <td className="py-2 border text-center">{item.mid}</td>
                  <td className="py-2 border text-center">{item.name}</td>
                  <td className="py-2 border text-center">
                    {item.available === true ? "Available" : "Sold Out"}
                  </td>
                  <td className="py-2 border text-center">
                    {item.rid === 1
                      ? "Deliscio"
                      : item.rid === 2
                      ? "Asianres"
                      : item.rid === 3
                      ? "FreckleB"
                      : ""}
                  </td>
                  <td className="py-2 border text-center">
                    ${(item.price / 100).toFixed(2)}
                  </td>
                  <td className="py-2 px-5 border text-center">
                    <div className="flex justify-center gap-x-5">
                      <Link to={`/items/edit/${item.rid}/${item.mid}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-yellow-500" />
                      </Link>
                      <Link to={`/items/delete/${item.rid}/${item.mid}`}>
                        <AiOutlineDelete className="text-2xl text-red-600 hover:text-red-400" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManagerHome;
