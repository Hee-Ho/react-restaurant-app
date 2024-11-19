import mongoose, {Schema} from "mongoose";

const addressSchema = new Schema(
    {
        street: {type: String, required: true},
        suite: {type: String, required: false},
        city: {type: String, required: true}, 
        postalcode: {type: String, required: true},
    }
);

const CustomerSchema = new Schema (
    {
        name: {type: String, required: true },
        cid: { type: Number, required: true },
        username: {type: String, required: true },
        email: {type: String, required: true },
        address: {type: addressSchema, required: true},
        favorite: [{type: Schema.Types.ObjectId, ref: 'Item'}]
    }
)

const Customer = mongoose.model("Customer", CustomerSchema)
export default Customer;
