import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  address: {
    street: String,
    city: String,
    zipcode: String,
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

// Create a virtual property `fullName` with a getter and setter.
userSchema.virtual('fullName').
  get(function () { return `${this.firstName} ${this.lastName}`; }).
  set(function (v) {
    // `v` is the value being set, so use the value to set
    // `firstName` and `lastName`.
    const firstName = v.substring(0, v.indexOf(' '));
    const lastName = v.substring(v.indexOf(' ') + 1);
    this.set({ firstName, lastName });
  });


export default userSchema;
