import { ActionDispatch, createContext, ReactNode, useReducer } from "react";
import api from "../api/api";
import { Radio } from "@/types/Radio";

type AddRadio = {
  type: "ADD_RADIO";
  payload: Radio;
};

type RemoveRadio = {
  type: "REMOVE_RADIO";
  payload: {
    stationuuid: string;
  };
};

type EditRadio = {};

type SetFavoriteRadio = {};

type RadioReducerActions = AddRadio | RemoveRadio;

const radioReducer = (radio: Radio[], actions: RadioReducerActions) => {
  switch (actions.type) {
    case "ADD_RADIO":
      radio = [...radio, actions.payload];
      break;
    case "REMOVE_RADIO":
      radio = [
        ...radio.filter((r) => r.stationuuid != actions.payload.stationuuid),
      ];
      break;
  }
  return radio;
};

type RadioContextType = {
  radio: Radio[];
  dispatch: ActionDispatch<[actions: RadioReducerActions]>;
};

export const RadioContext = createContext<null | RadioContextType>(null);

export const RadioProvider = ({ children }: { children: ReactNode }) => {
  const [radio, dispatch] = useReducer(radioReducer, []);
  return (
    <RadioContext.Provider value={{ radio, dispatch }}>
      {children}
    </RadioContext.Provider>
  );
};
