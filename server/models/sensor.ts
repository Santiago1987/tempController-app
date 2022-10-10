import { model, Schema } from "mongoose";

const sensorSchema = new Schema({
  sensorNumber: { type: Number, required: true },
  date: { type: Date, required: true },
  temperature: { type: Number, required: true },
  chipID: { type: String, ref: "Module" },
});

sensorSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Sensor = model("Sensor", sensorSchema);

export default Sensor;
