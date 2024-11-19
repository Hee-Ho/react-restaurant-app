import { getCartRepo, createCartRepo, addItemToCartRepo, resetCartRepo,
    editCartRepo, removeItemRepo, reOrderRepo} from "../repositories/cart.repository.js";


export const getCart = async(req, res) => {
    const { cid } = req.params;
    try {
        const cart = await getCartRepo({cid: cid})
        return res.status(200).json({
            status: 200,
            success: cart[0],
            data: cart[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}

export const createCart = async(req, res) => {
    try {
        const cart = await createCartRepo(req.body);
        return res.status(200).json({
            status: 200,
            success: cart[0],
            data: cart[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}

export const addToCart = async(req, res) => {
    const { cid } = req.params;
    try {
        const cart = await addItemToCartRepo({cid: cid}, req.body);
        return res.status(200).json({
            status: 200,
            success: cart[0],
            data: cart[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}

export const resetCart = async(req, res) => {
    const { cid } = req.params;
    try {
        const cart = await resetCartRepo({cid: cid});
        return res.status(200).json({
            status: 200,
            success: cart[0],
            data: cart[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}

export const editCart = async(req, res) => {
    const { cid } = req.params;
    try {
        const cart = await editCartRepo({cid: cid}, req.body);
        return res.status(200).json({
            status: 200,
            success: cart[0],
            data: cart[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}

export const removeFromCart= async(req, res) => {
    const { cid } = req.params;
    try {
        const cart = await removeItemRepo({cid: cid}, req.body);
        return res.status(200).json({
            status: 200,
            success: cart[0],
            data: cart[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}

export const reOrder = async(req, res) => {
    const { cid } = req.params;
    try {
        const cart = await reOrderRepo({cid: cid}, req.body);
        return res.status(200).json({ 
            status: 200, 
            success: cart[0], 
            data: cart[1],
            diff: cart[2]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}