import Customer from "../models/customer.model.js";
import Item from "../models/item.model.js";

export const addCustomerToRepo = async(body) => {
    const maxID = await Customer.find().sort({"cid": -1}).limit(1);
    if (maxID.length < 1) {
        body["cid"] = 1;
    } else {
        body["cid"] = maxID[0].cid + 1; //increment current id
    }
    try {
        const customer = await new Customer(body);
        const saved = await customer.save();
        return saved;
    }catch (e) {
        throw Error ("Error while create profile")
    }
}

export const getCustomerRepo = async(query) => {
    try {
        const customer = await Customer.findOne(query).select("-pw -_id");
        if (customer === null) {
            return [false, "Customer not found"]
        }
        return [true, customer];
    } catch (e) {
        throw Error ("Error while attempting to retrieve profile")
    }
} 

export const getAllCustomersRepo = async() => {
    try {
        const customers = await Customer.find().select("-pw -_id");
        return [true, customers];
    } catch (e) {
        throw Error ("Error getting information of all customers")
    }
}

//in working progress
export const addFavoriteRepo = async(query, body) => {
    try {
        const exist = await Customer.exist({cid: query.cid})
        const item = await Item.findOne({rid: body.rid, mid: body.mid});
        if (item === null) {
            return [false, "Can't find item"];
        }
    } catch (e) {
        throw Error ("Error while adding item to favourite");
    }
}




