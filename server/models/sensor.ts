import { model, Schema } from "mongoose";

const sensorSchema = new Schema({
  sensorNumber: { type: Number, required: true },
  module: [
    {
      type: Number,
      ref: "Module",
    },
  ],
  readings: [
    {
      date: { type: Date, required: true },
      temperature: { type: Number, required: true },
    },
  ],
});

const sensor = model("Sensor", sensorSchema);

export default sensor;
