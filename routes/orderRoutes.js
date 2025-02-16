const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new order (protected route)
router.post('/', authMiddleware, async (req, res) => {
    const { productIds, orderStatus } = req.body;

    try {
        const order = new Order({
            userId: req.user, // Get user ID from JWT token
            productIds,
            orderStatus,
            createdAt: new Date(),
        });

        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
