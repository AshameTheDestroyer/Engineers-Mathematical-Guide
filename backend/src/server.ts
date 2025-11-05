import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { AIRouter } from "./services/ai";
import { UserRouter } from "./services/user";
import { FileRouter } from "./services/file";
import { RegistrationRouter } from "./services/registration";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
}

ConnectDB();

app.use(AIRouter);
app.use(UserRouter);
app.use(FileRouter);
app.use(RegistrationRouter);

app.listen(Number(process.env.PORT), () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
