import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // mobile: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    points: { type: Number, default: 0 },       // Optional, default to 0
    amount: { type: Number, default: 0 },      // Optional, default to 0
    withdrawal: { type: Number, default: 0 }   // Optional, default to 0
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare hashed password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("users", userSchema);

export default User;
