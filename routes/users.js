import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const usersRoute = express.Router();

// Register user
usersRoute.post("/signup", async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ username, email, password, role });
        await newUser.save();

        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login user
usersRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, username: user.username, email: user.email, role: user.role }, "your_jwt_secret", { expiresIn: "1h" });

        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, username: user.username, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user data (protected route example)
usersRoute.get("/profile", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, "your_jwt_secret");
        const user = await User.findById(decoded.id).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// users
usersRoute.post("/get", async (req, res) => {
    try {
        const { _id } = req.body;
        const user = await User.findById(_id);
        // console.log(users);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export default usersRoute;
