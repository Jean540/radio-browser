import { ActionDispatch, createContext, ReactNode, useReducer } from "react";
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

type EditRadio = {
  type: "EDIT_RADIO";
  payload: {
    stationuuid: string;
    name: string;
  };
};

type RadioReducerActions = AddRadio | RemoveRadio | EditRadio;

const radioReducer = (radio: Radio[], actions: RadioReducerActions) => {
  switch (actions.type) {
    case "ADD_RADIO":
      // limpando o \t do nome
      let name = actions.payload.name.includes("\t")
        ? actions.payload.name.split("\t")[1]
        : actions.payload.name;
      radio = [...radio, { ...actions.payload, favorited: true, name }];
      break;
    case "REMOVE_RADIO":
      radio = [
        ...radio.filter((r) => r.stationuuid != actions.payload.stationuuid),
      ];
      break;
    case "EDIT_RADIO":
      radio = [
        ...radio.filter((r) => {
          if (r.stationuuid == actions.payload.stationuuid) {
            r.name = actions.payload.name;
          }
          return r;
        }),
      ];
  }
  return radio;
};

type RadioContextType = {
  radios: Radio[];
  dispatch: ActionDispatch<[actions: RadioReducerActions]>;
};

export const RadioContext = createContext<null | RadioContextType>(null);

export const RadioProvider = ({ children }: { children: ReactNode }) => {
  const [radios, dispatch] = useReducer(radioReducer, []);
  return (
    <RadioContext.Provider value={{ radios, dispatch }}>
      {children}
    </RadioContext.Provider>
  );
};
