import Order from "../models/order.model.js";


//aggregation to get total sales
export const getTotalProfitRepo = async(query) => {
  try {
      const info = await Order.aggregate([ 
        {$match: {rid: parseInt(query.rid), status: 3}},
        {$group: {
          _id: query.rid, // Group all documents into a single group
          totalAmount: { $sum: "$total" } // Calculate the sum of the total field
        }}
      ])
      return [true, info];

  } catch (e) {
    throw Error ("Error while retrieving profit information")
  }
}

/*
  Equivalent to: SELECT items FROM orders inner join items WHERE order.items.item = items._id
*/
export const getTotalPopularItemsRepo = async(query) => { 
  try { 
    //need to populate result with menu item information
    const info = await Order.aggregate([
      {$match: {rid: parseInt(query.rid), status: 3}},
      { $unwind: "$items" }, //Deconstructs an array field from the input documents to output a document for each element. 
      { $group: {
        _id: "$items.item", // group item together by the reference id
        count: { $sum:  "$items.quantity"}, // add the quantities of the items
        item: { $first: { $arrayElemAt: ["$item", 0] }} //return an array, this makes it returns only the first item
      }},
      {
        $lookup: {
          from: "items", // Collection to join
          localField: "_id", // Field from the previous group stage
          foreignField: "_id", // Field in the items collection
          as: "item" // Output array field name
        }
      },
      // Unwind array to get a single document per item
      { $unwind: "$item" },
      { $sort: { count: -1 } }
    ])
    return[true, info];
  } catch (e) {
    throw Error ("Error while retrieving popular items information")
  }
}

//working progress
export const getHourCountRepo = async(query) => {
    const info = await Order.aggregate([
      {$match: {rid: parseInt(query.rid), status: 3}},
      {
        $addFields: {
          orderHour: { $dateToString: { format: "%H", date: "$orderAt", timezone: "America/Edmonton" } } //convert to Edmonton timezone
        }
      },
      { // Group by the 'orderHour' field and count the number of orders for each hour
        $group: {
          _id: "$orderHour",
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }, //sort by hour
    ]);
    return[true, info];
}