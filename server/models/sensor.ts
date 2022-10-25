import { model, Schema } from "mongoose";

const sensorSchema = new Schema({
  date: { type: Date, required: true },
  temperature: [Number],
  chipID: { type: String, ref: "Module", required: true },
});

sensorSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Sensor = model("Sensor", sensorSchema);

export default Sensor;
