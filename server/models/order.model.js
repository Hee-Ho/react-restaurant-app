import mongoose, {Schema} from "mongoose";

const getPrice = (num) => {
    return (num/100).toFixed(2);
}

const setPrice = (num) => {
    if (!Number.isInteger(num))
        return (num * 100).toFixed(0);
    else
        return num;
}

const getSchedule = (num) => {
    if (num == 0) {
        return "Immediate Pickup";
    }
    else {
        return "Later Pickup";
    }
}

const getTime = (date) => {
    return date.toLocaleString();
}

const getStatus = (num) => {
    if (num < 0) {
        return "Cart"
    }
    switch(num) {
        case 1:
            return "In-progress";
        case 2:
            return "Awaiting-Pickup"
        case 3:
            return "Completed"
        default:
            return "Ordered"
    }
}

//may change the item to use object id instead
const OrderItemSchema = new mongoose.Schema(
    {
        item: {type: Schema.Types.ObjectId, ref: 'Item'},
        quantity: { type: Number, required: true },
        total: { type: Number,  get: getPrice, set: setPrice, required: true}
    }
)

const OrderSchema = new mongoose.Schema(
    {
        order_id: {type: Number},
        items: [{type: OrderItemSchema}],
        customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
        restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
        cid: {type: Number, required: true},
        rid: {type: Number, default: -1},
        total: {type: Number,  get: getPrice, set: setPrice},
        status: {type: Number, default: -1},
        schedule: {type: Number, get: getSchedule},
        pickup: {type: Date},
        orderAt: {type: Date}
    }
)

const Order = mongoose.model("Order", OrderSchema);
export default Order;
