import { updateItemRepo, getRestaurantRepo, getMenuRepo, getMenuRepoCustomer, addItemRepo, 
    removeItemRepo, getMenuItemRepo, getAllRestaurantRepo, getEmployeesRepo} from "../repositories/restaurant.repository.js";

export const getRestaurant = async(req, res) => {
    const { rid } = req.params;
    try {
        const restaurant = await getRestaurantRepo({rid: rid})
        return res.status(200).json({ 
            status: 200, 
            success: restaurant[0],
            data: restaurant[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            success: false,
            message: e.message
        });
    }
}

export const getAllRestaurants = async(req, res) => {
    try {
        const restaurant = await getAllRestaurantRepo()
        return res.status(200).json({ 
            status: 200, 
            success: restaurant[0],
            data: restaurant[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            success: false,
            message: e.message
        });
    }
}

export const updateItem = async(req, res) => {
    const { rid } = req.params;
    try {
        const menu = await updateItemRepo({rid: rid}, req.body)
        return res.status(200).json({ 
            status: 200, 
            success: menu[0],
            data: menu[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}

export const addItem = async(req, res) => {
    const { rid } = req.params;
    try {
        const restaurant = await addItemRepo({rid: rid}, req.body);
        return res.status(200).json({ 
            status: 200, 
            success: restaurant[0],
            data: restaurant[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            success: false,
            message: e.message
        });
    }
}

export const removeItem = async(req, res) => {
    const { rid } = req.params;
    try {
        const restaurant = await removeItemRepo({rid: rid}, req.body);
        return res.status(200).json({ 
            status: 200, 
            success: restaurant[0],
            data: restaurant[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            success: false,
            message: e.message
        });
    }
}

export const getMenu = async(req, res) => {
    const { rid } = req.params;
    try {
        const menu = await getMenuRepo({rid: rid})
        return res.status(200).json({ 
            status: 200,
            success: menu[0],
            data: menu[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            success: false,
            message: e.message
        });
    }
}

export const getMenuCustomer = async(req, res) => {
    const { rid } = req.params;
    try {
        const menu = await getMenuRepoCustomer({rid: rid})
        return res.status(200).json({ 
            status: 200,
            success: menu[0],
            data: menu[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            success: false,
            message: e.message
        });
    }
}

export const getMenuItem = async(req, res) => {
    const { rid, mid } = req.params;
    try {
        const item = await getMenuItemRepo({rid: rid, mid: mid})
        return res.status(200).json({ 
            status: 200,
            success: item[0],
            data: item[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            success: false,
            message: e.message
        });
    }
}

export const getEmployees = async(req, res) => {
    const { rid } = req.params;
    try {
        const emp = await getEmployeesRepo({rid: rid});
        return res.status(200).json({ 
            status: 200,
            success: emp[0],
            data: emp[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            success: false,
            message: e.message
        });
    }

}


