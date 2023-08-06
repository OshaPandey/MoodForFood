const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
    try {
        const { order_data, email, order_date } = req.body;

        // Find the user's existing order by email
        let existingOrder = await Order.findOne({ email });

        const newOrderData = {
            Order_date: order_date,
            order_data: order_data
        };

        if (existingOrder === null) {
            // Create a new order entry if user's order doesn't exist
            await Order.create({
                email: email,
                order_data: [newOrderData]
            });

            res.json({ success: true });
        } else {
            // Update the existing order's order_data array
            existingOrder.order_data.unshift(newOrderData);
            await existingOrder.save();

            res.json({ success: true });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/myorderData", async (req, res) => {
try {
    let myData=await Order.findOne({"email":req.body.email})
    res.json({orderData:myData})
} catch (error) {
    
    res.status(500).send("Server Error");
    
}
})

module.exports = router;
