import Module from "../models/module";
import { ModuleUtils } from "../../types";

export let moduleList: ModuleUtils[] = [];

export const loadModulelist = async () => {
  try {
    let list = await Module.find();
    moduleList = list.map((m) => {
      let { chipID, name, sensors } = m;

      let activeSensors: string[] = [];

      for (let index in sensors) {
        if (sensors[index].active) {
          activeSensors[index] = sensors[index].name;
        }
      }

      return { chipID, name, sensors: activeSensors };
    });
  } catch (err) {
    console.error(err);
  }
  return;
};
