import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, require: false },
  userName: { type: String, required: true },
  passwordHash: { type: String, required: true },
  administrator: { type: Boolean, required: true },
  telephone: { type: String, required: false },
  adminID: { type: Schema.Types.ObjectId, ref: "User", required: false },
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
    delete returnedObject.adminID;
  },
});

const User = model("User", userSchema);

export default User;
