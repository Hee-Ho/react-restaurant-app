import dbConnection from "./database/database.js";
import { addCustomerToRepo, getCustomerRepo } from "./repositories/customer.repository.js";
import { addRestaurantToRepo, addItemRepo, addEmployeeRepo } from "./repositories/restaurant.repository.js";
import { getTotalProfitRepo, getTotalPopularItemsRepo, getHourCountRepo } from "./repositories/analytic.repository.js";
import { reOrderRepo } from "./repositories/cart.repository.js";
import Order from "./models/order.model.js";

dbConnection();
const customer = [
  {
    name: "Jack",
    username: "Jackker",
    email: "jack@mymail.com",
    address: {
      street: "123 Nowhere",
      city: "Leduc",
      postalcode: "TEEHEE",
    },
  },
  {
    name: "John",
    username: "Johnster",
    email: "jjohn@mymail.com",
    address: {
      street: "133 Nowhere",
      city: "Edmonton",
      postalcode: "T05H6Y",
    },
  },
];

const restaurant = [
  {
    name: "Deliscio",
    email: "Iwant@pizza.ca",
    address: {
      street: " 456 somewhere",
      city: "Edmonton",
      postalcode: "HEEHEE",
    },
  },
  {
    name: "Asianres",
    email: "Asianres@pizza.ca",
    address: {
      street: " 789 somewwhere",
      city: "Edmonton",
      postalcode: "H33H33",
    },
  },
  {
    name: "Freckle.B",
    email: "freckle@burger.ca",
    address: {
      street: " 231 saints row",
      city: "Edmonton",
      postalcode: "S6R T3P",
    },
  },
];

const delisios = [
  {
    name: "Special Pizza",
    category: 1,
    price: 24.99,
  },
  {
    name: "Royal Hawaiian Pizza",
    category: 1,
    price: 16.99,
  },
  {
    name: "Meat Lover Pizza",
    category: 1,
    price: 20.99,
  },
  {
    name: " Buffalo Chicken Fingers",
    category: 1,
    price: 17.99,
  },
  {
    name: " Mac & Cheese",
    category: 1,
    price: 19.99,
  },
  {
    name: "Cheesy Bread Sticks",
    category: 2,
    price: 10.79,
  },
  {
    name: "New York Cheesecake",
    category: 3,
    price: 9.29,
  },
  {
    name: "Soju and Melona",
    category: 3,
    price: 12.99,
  },
];

const asianres = [
  {
    name: "Spring Rolls",
    category: 2,
    price: 16.99,
  },
  {
    name: "Pho Bo Vien",
    category: 1,
    price: 18.99,
  },
  {
    name: "Pho Dac Biet",
    category: 1,
    price: 20.99,
  },
  {
    name: "Phoritto",
    category: 1,
    price: 15.99,
  },
  {
    name: " Tofu Fries",
    category: 2,
    price: 9.99,
  },
  {
    name: "Cafe Sua Da",
    category: 3,
    price: 5.99,
  },
  {
    name: "Rice n Porkchops",
    category: 1,
    price: 17.99,
  },
  {
    name: "Vietnamese Sub",
    category: 1,
    price: 17.5,
  },
];

const freckle = [
  {
    name: "The Original Burger",
    category: 1,
    price: 16.99,
  },
  {
    name: "Kingburger Supreme",
    category: 1,
    price: 18.99,
  },
  {
    name: "Classic Chicken Sandwich",
    category: 1,
    price: 15.99,
  },
  {
    name: "6 Chicken Tenders",
    category: 1,
    price: 19.99,
  },
  {
    name: "Crispy Fries",
    category: 2,
    price: 3.99,
  },
  {
    name: "Onion Rings",
    category: 2,
    price: 4.99,
  },
  {
    name: "Best Milkshake",
    category: 3,
    price: 6.69,
  },
  {
    name: "Fountain Pop",
    category: 3,
    price: 2.99,
  },
];

const deli_worker = [
  {
    username: "Delisio.Owner",
    pos: 1,
  },
  {
    username: "Delisio.ShiftM",
    pos: 2,
  },
  {
    username: "Delisio.Worker",
    pos: 3,
  },
];

const asia_worker = [
  {
    username: "Asianres.Owner",
    pos: 1,
  },
  {
    username: "Asianres.ShiftM",
    pos: 2,
  },
  {
    username: "Asianres.Worker",
    pos: 3,
  },
];

const freckle_worker = [
  {
    username: "Freckle.Owner",
    pos: 1,
  },
  {
    username: "Freckle.ShiftM",
    pos: 2,
  },
  {
    username: "Freckle.Worker",
    pos: 3,
  },
];

//create a customer
const insertCustomer = async () => {
  for (let c of customer) {
    await addCustomerToRepo(c);
  }
};

//create a restaurant
const insertRestaurant = async () => {
  for (let r of restaurant) {
    await addRestaurantToRepo(r);
  }
};

//add menu items to restaurants
const createMenuItem = async () => {
  for (let item of delisios) {
    await addItemRepo({ rid: 1 }, item);
  }
  for (let item of asianres) {
    await addItemRepo({ rid: 2 }, item);
  }
  for (let item of freckle) {
    await addItemRepo({ rid: 3 }, item);
  }
};

const addWorker = async () => {
  for (let item of deli_worker) {
    await addEmployeeRepo({ rid: 1 }, item);
  }
  for (let item of asia_worker) {
    await addEmployeeRepo({ rid: 2 }, item);
  }
  for (let item of freckle_worker) {
    await addEmployeeRepo({ rid: 3 }, item);
  }
};

const test = async() => {
    //let p = await getTotalProfitRepo({rid: 3});
    let info = await getTotalPopularItemsRepo({rid: 3});
    //let o = await getHourCountRepo({rid: 3});
    //console.log(o);
    /*let body = {
      rid: 3,
      order_id: 1711026363102
    }
    let order = await reOrderRepo({cid: 1}, body);
    //console.log(order.items[0].item);*/
    console.log(info[1]);
    
}

//insertCustomer();
//insertRestaurant();
//createMenuItem();
//addWorker();
test()
