import { model, Schema } from "mongoose";

const temperatureAlertSchema = new Schema({
  chipID: { type: String, required: true },
  sensor: { type: Number, required: true },
  date: { type: Date, required: true },
  temperature: { type: Date, required: true },
});

temperatureAlertSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Module = model("temperatureAlert", temperatureAlertSchema);

export default Module;
