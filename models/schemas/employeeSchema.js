import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    address: {
        street: String,
        city: String,
        zipcode: String,
    },
});

export default employeeSchema;
