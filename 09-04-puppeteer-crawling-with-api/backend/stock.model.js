import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    name: String,
    title: Date,
    contents: Number
})

export const Stock = mongoose.model("Stock", StockSchema)