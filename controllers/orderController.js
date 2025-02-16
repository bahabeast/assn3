const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).populate('productIds');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
