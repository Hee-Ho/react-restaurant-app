import { createOrderRepo, getOrdersRepo, getOrdersRepo2, getSpecOrdeRepo, setOrderStatusRepo, 
    getOrdersHistoryRepo, getOrdersHistoryRepoC, setOrderStatusRepoC, getAllOrdersHistoryC, getAllOrdersHistoryR } from "../repositories/order.repository.js";

export const createOrder = async(req, res) => {
    const { cid } = req.params;
    try {
        const order = await createOrderRepo({cid: cid}, req.body);
        return res.status(200).json({
            status: 200,
            success: order[0],
            data: order[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}

//set order status and pick up time
export const setOrderStatus = async(req, res) => {
    const { rid } = req.params;
    try {
        const order = await setOrderStatusRepo(rid, req.body);
        return res.status(200).json({
            status: 200,
            success: order[0],
            data: order[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}

export const setOrderStatusCustomer = async(req, res) => {
    const { cid } = req.params
    try {
        const order = await setOrderStatusRepoC(cid, req.body);
        return res.status(200).json({
            status: 200,
            success: order[0],
            data: order[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}

//--------------------------------------------------Get All Orders for a customer or restaurant------------------------------
export const getOrdersCustomer = async(req, res) => {
    const { cid } = req.params;
    try {
        const orders = await getOrdersRepo({cid: cid});
        return res.status(200).json({
            status: 200,
            success: orders[0],
            data: orders[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}

export const getOrdersRes = async(req, res) => {
    const { rid } = req.params;
    try {
        const orders = await getOrdersRepo2({rid: rid});
        return res.status(200).json({
            status: 200,
            success: orders[0],
            data: orders[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}
//---------------------------------------------------------------------------------------------------------------------------

export const getSpecOrderCustomer = async(req, res) => {
    const { cid } = req.params;
    const { body } = req.body;
    try {
        const orders = await getSpecOrdeRepo(cid, body);
        return res.status(200).json({
            status: 200,
            data: orders
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}

//----------------------------------------------------------Get Orders History within a selected month----------------------------------------
export const getOrdersHistory = async(req, res) => {
    const { rid } = req.params
    try {
        const record = await getOrdersHistoryRepo({rid: rid}, req.body)
        return res.status(200).json({
            status: 200,
            success: record[0],
            data: record[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}

export const getOrdersHistoryC = async(req, res) => {
    const { cid } = req.params
    try {
        const record = await getOrdersHistoryRepoC({cid: cid}, req.body)
        return res.status(200).json({
            status: 200,
            success: record[0],
            data: record[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}

export const getAllOrdersR = async(req, res) => {
    const { rid } = req.params
    try {
        const record = await getAllOrdersHistoryR({rid: rid})
        return res.status(200).json({ 
            status: 200, 
            success: record[0],
            data: record[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}

export const getAllOrdersC = async(req, res) => {
    const { cid } = req.params
    try {
        const record = await getAllOrdersHistoryC({cid: cid})
        return res.status(200).json({ 
            status: 200, 
            success: record[0],
            data: record[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------------

