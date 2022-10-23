import { useCallback, useReducer } from "react";
import { ModuleFromBD } from "../../../../types";

type moduleReducerAction =
  | {
      type: "set_chipID";
      payload: string;
    }
  | {
      type: "set_name";
      payload: string;
    }
  | {
      type: "set_ubication";
      payload: string;
    }
  | {
      type: "set_active";
      payload: boolean;
    };

const iniStateModule = {
  chipID: "",
  name: "",
  ubication: "",
  active: false,
};

const moduleReducer = (
  state: ModuleFromBD,
  { type, payload }: moduleReducerAction
) => {
  switch (type) {
    case "set_chipID":
      return { ...state, chipID: payload };
    case "set_name":
      return { ...state, name: payload };
    case "set_ubication":
      return { ...state, ubication: payload };
    case "set_active":
      return { ...state, active: payload };
  }
};

const useModule = () => {
  const [registerModule, setRegisterModule] = useReducer(
    moduleReducer,
    iniStateModule
  );

  const setChipID = useCallback((id: string) => {
    setRegisterModule({ type: "set_chipID", payload: id });
  }, []);

  const setName = useCallback((name: string) => {
    setRegisterModule({ type: "set_name", payload: name });
  }, []);

  const setUbication = useCallback((ubication: string) => {
    setRegisterModule({ type: "set_ubication", payload: ubication });
  }, []);

  const setActive = useCallback((active: boolean) => {
    setRegisterModule({ type: "set_active", payload: active });
  }, []);

  return { registerModule, setChipID, setName, setUbication, setActive };
};

export default useModule;
