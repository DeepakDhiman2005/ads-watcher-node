import express from "express";
import User from "../models/User.js";
import calculateAmount from "../functions/calculateAmount.js";

// router
const pointsRoute = express.Router();

// Update points
pointsRoute.post("/update", async (req, res) => {
    try {
        const { _id, point, type } = req.body;
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        switch (type) {
            case "increase":
                if (!user.points) user.points = 0;
                user.points += parseInt(point);
                break;
            case "decrease":
                if (!user.points) user.points = 0;
                user.points -= parseInt(point);
                break;
            default:
                return res.status(400).json({ message: "Invalid operation type" });
        }

        await user.save(); // Save the updated user document to the database

        res.status(200).json({ message: "Points updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

pointsRoute.post("/amount", async (req, res) => {
    try {
        const { _id, points } = req.body;
        // console.log(_id, accountNumber, amount);
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.amount = calculateAmount(points);
        await user.save();

        res.status(200).json({ message: "Points convert in amount successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

pointsRoute.post("/convertWithdraw", async (req, res) => {
    try {
        const { _id, amount } = req.body;

        // Validate input
        if (!_id || !amount) {
            return res.status(400).json({ message: "User ID and amount are required." });
        }

        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Parse amount
        const Amount = parseFloat(amount);

        // Validate amount
        if (isNaN(Amount) || Amount <= 0) {
            return res.status(400).json({ message: "Invalid amount value." });
        }

        if (Amount >= 5) {
            user.withdrawal = user.amount;
            await user.save();
            return res.status(200).json({ message: "Amount converted successfully for withdrawal." });
        } else {
            return res.status(400).json({ message: "Amount must be greater than $5 to withdraw." });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred. Please try again later." });
    }
});


pointsRoute.post("/withdraw", async (req, res) => {
    try {
        const { _id, accountNumber, amount } = req.body;
        // console.log(_id, accountNumber, amount);
        // const user = await User.findById(_id);

        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }

        res.status(200).json({ message: "Withdraw money successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default pointsRoute;