import User from "../models/user";

export let administratorList: string[] = [];

export const loadAdministratorList = async () => {
  try {
    let list = await User.find({ administrator: true });
    administratorList = list.map((m) => m.id);
  } catch (err) {
    console.error(err);
  }
  return;
};
