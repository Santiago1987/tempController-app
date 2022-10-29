import { Schema, model } from "mongoose";

const moduleSchema = new Schema({
  chipID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  active: { type: Boolean, required: true },
  ubication: { type: String, required: true },
  sensors: [
    {
      name: { type: String, required: true },
      active: { type: Boolean, requided: true },
    },
  ],
});

moduleSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Module = model("Module", moduleSchema);

export default Module;
