import mongoose from "mongoose";
const { Schema, model } = mongoose;

const test = new Schema(
    {
        titre: String
    },
    { timestamps: true }
)

const Test = model('Test', test);
export default Test;