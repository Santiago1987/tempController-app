import Module from "../models/module";

export let moduleList: string[] = [];

export const loadModulelist = async () => {
  let list = await Module.find();
  moduleList = list.map((m) => m.chipID);
  return;
};
