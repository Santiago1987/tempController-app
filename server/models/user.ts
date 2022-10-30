import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, require: true },
  userName: { type: String, required: true },
  passwordHash: { type: String, required: true },
  administrator: { type: Boolean, required: true },
  telephone: { type: String, required: true },
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = model("User", userSchema);

export default User;
