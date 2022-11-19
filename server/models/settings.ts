import { model, Schema } from "mongoose";

const settingsSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  tempLimitSup: { type: Number, required: false },
  tempLimitInf: { type: Number, required: false },
  hoursLess: { type: Number, required: false },
  alertUser: { type: [Schema.Types.ObjectId], ref: "User" },
  sendMail: { type: Boolean, required: false },
  sendWasap: { type: Boolean, required: false },
  maxTemp: { type: Number, required: false },
  minTemp: { type: Number, required: false },
});

settingsSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Settings = model("Settings", settingsSchema);

export default Settings;
