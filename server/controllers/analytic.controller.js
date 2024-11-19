import { getTotalProfitRepo, getTotalPopularItemsRepo, getHourCountRepo } from "../repositories/analytic.repository.js";

export const getProfit = async(req, res) => {
  const { rid } = req.params;
    try {
      const info = await getTotalProfitRepo({rid: rid})
      return res.status(200).json({ 
          status: 200,
          success: info[0], 
          data: info[1]
      });
  } catch (e) {
      return res.status(400).json({
          status: 400, 
          success: false,
          message: e.message
      });
  }
}

export const getPopularItem = async(req, res) => {
  const { rid } = req.params;
    try {
      const info = await getTotalPopularItemsRepo({rid: rid})
      return res.status(200).json({ 
          status: 200,
          success: info[0], 
          data: info[1]
      });
  } catch (e) {
      return res.status(400).json({
          status: 400, 
          success: false,
          message: e.message
      });
  }
}


//return the array of popular order hour
export const getPopularHours = async(req, res) => {
  const { rid } = req.params;
  try {
    const info = await getHourCountRepo({rid: rid})
    return res.status(200).json({ 
        status: 200,
        success: info[0], 
        data: info[1]
    });
} catch (e) {
    return res.status(400).json({
        status: 400, 
        success: false,
        message: e.message
    });
}
}