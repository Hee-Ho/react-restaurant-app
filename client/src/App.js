import React from "react";
import { Routes, Route } from "react-router-dom";

import Interface from "./interfaces/home/Interface.js";
import Home from "./interfaces/client-interface/landing/landingScreen.js";
import Menu from "./interfaces/client-interface/restaurant-menu/Menu.js";
import Orders from "./interfaces/client-interface/orders/OrdersScreen.js";
import Login from "./interfaces/client-interface/login/loginScreen.js";

import ManagerHome from "./interfaces/restaurant-interface/ManagerHome.jsx";
import CreateItem from "./interfaces/restaurant-interface/CreateItem.jsx";
import EditItem from "./interfaces/restaurant-interface/EditItem.jsx";
import DeleteItem from "./interfaces/restaurant-interface/DeleteItem.jsx";
import Analytic from "./interfaces/restaurant-interface/Analytic.jsx";
import RestaurantOrders from "./interfaces/restaurant-interface/order/Orders.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
/**
 * Sceen 1
 * ● Students must be able to see all available courses
 * ● Students must be able to register for classes
 * Note: When registering for classes the TimeOfDay must be considered. Students are not allowed to register in multiple classes that overlap on time.
 *
 * Screen 2
 * ● Students must be able to drop classes they are registered in
 * ● Students must be able to see all courses they are registered in
*/

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client = { queryClient }>
      <Routes>
        <Route path="/" element={<Interface />} />

      {/* Client Interface */}
      <Route path="/login" element={<Login />} />
      <Route path="/home/:cid" element={<Home />} />
      <Route path="/orders/:cid" element={<Orders />} />
      <Route path="/menu/:cid/:rid" element={<Menu />} />


        {/* Restaurant Manager Interface */}
        <Route path="/RestaurantInterface/home" element={<ManagerHome />} />
        <Route path="/items/create" element={<CreateItem />} />
        <Route path="/items/edit/:rid/:mid" element={<EditItem />} />
        <Route path="/items/delete/:rid/:mid" element={<DeleteItem />} />
        <Route path= "/RestaurantAnalytic/:rid" element={<Analytic/> } />
        <Route path= "/RestaurantOrders/:rid" element={<RestaurantOrders/> } />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
