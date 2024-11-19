import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dbConnection from "./database/database.js";
import customerRouter from "./routes/customer.route.js";
import restaurantRouter from "./routes/restaurant.route.js";
import Item from "./models/item.model.js"; //some schema error issue that need this here to be resolve

const app = express();
const port = 8000;

// Middleware
app.use(cors());
dbConnection();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "server is running" });
});

app.use("/customer", customerRouter);
app.use("/restaurant", restaurantRouter);

app.listen(port, function () {
  console.log(`Server is listening on port ${port}!`);
});
