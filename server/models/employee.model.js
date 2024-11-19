import mongoose, {Schema} from "mongoose";

/**
 * 1 = owner - can add menu item, edit item status, change order status, add employee and promote.
 * 2 = shift manager - can edit item status, change order status
 * 3 = worker - can change status order
 */



const EmployeeSchema = new Schema (
    {
        username: {type: String, required: true },
        wid: { type: Number, required: true },
        rid: { type: Number, required: true },
        pos: { type: Number, required: true },
    }
)

const Employee = mongoose.model("Employee", EmployeeSchema)
export default Employee;