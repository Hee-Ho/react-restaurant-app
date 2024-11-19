import mongoose, { Schema } from "mongoose";

/** Item categories
 * 1 = Main
 * 2 = Appetizer/Side
 * 3 = Dessert and Beverage
 */

const getPrice = (num) => {
  return (num / 100).toFixed(2);
};

const setPrice = (num) => {
  return (num * 100).toFixed(0);
};

const getItemStatus = (bol) => {
  if (bol) {
    return "Available";
  } else {
    return "Sold out";
  }
};

const setAvailibility = (num) => {
  if (num < 1) {
    return false;
  }
  return true;
};

//Status: true for available, false for unavailable
const ItemSchema = new Schema(
    {
        name: { type: String, required: true},
        mid: {type: Number}, 
        rid: {type: Number},
        available: { type: Boolean, default: true, set: setAvailibility},
        category: {type: Number,required: true},
        price: { type: Number, get: getPrice, set: setPrice ,required: true }
    }
)

const Item = mongoose.model("Item", ItemSchema);
export default Item;
