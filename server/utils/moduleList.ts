import Module from "../models/module";

export let moduleList: string[] = [];

export const loadModulelist = async () => {
  try {
    let list = await Module.find();
    moduleList = list.map((m) => m.chipID);
  } catch (err) {
    console.error(err);
  }
  return;
};
