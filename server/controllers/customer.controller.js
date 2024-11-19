import { getCustomerRepo, getAllCustomersRepo } from "../repositories/customer.repository.js";

export const getCustomer = async(req, res) => {
    const { cid } = req.params;
    try {
        const customer = await getCustomerRepo({cid: cid})
        return res.status(200).json({ 
            status: 200,
            success: customer[0], 
            data: customer[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            message: e.message
        });
    }
}

export const getAllCustomers = async(req, res) => {
    try {
        const customer = await getAllCustomersRepo();
        return res.status(200).json({ 
            status: 200,
            success: customer[0], 
            data: customer[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            message: e.message
        });
    }
}