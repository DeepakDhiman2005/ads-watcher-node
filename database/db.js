import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const DATABASE = process.env.DATABASE;
        await mongoose.connect(DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;
