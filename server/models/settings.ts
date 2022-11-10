import { model, Schema } from "mongoose";

const settingsSchema = new Schema({
  tempLimitSup: { type: Number, required: false },
  tempLimitInf: { type: Number, required: false },
  frDate: { type: Date, required: false },
  toDate: { type: Date, required: false },
  alertUser: [{ type: String, ref: "User", required: false }],
});

settingsSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Settings = model("Settings", settingsSchema);

export default Settings;
