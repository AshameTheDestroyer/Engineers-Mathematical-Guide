import mongoose from "mongoose";

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/Worldictionary_TEST");
});

test("Connection", async () => {
    console.log("Successfully Connected.");
});

afterAll(async () => {
    await mongoose.disconnect();
});
