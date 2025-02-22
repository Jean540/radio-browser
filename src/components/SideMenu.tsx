"use client";
import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { RadioContext } from "@/contexts/FavoriteRadioContext";
import { Radio } from "@/types/Radio";
import { Menu } from "lucide-react";
import { MenuItem } from "./MenuItem";

let timer: NodeJS.Timeout;

type Props = {
  showMenu: boolean;
  setShowMenu: () => void;
};

export const SideMenu = ({ setShowMenu, showMenu }: Props) => {
  const radioContext = useContext(RadioContext);

  const [radios, setRadios] = useState<Radio[]>();
  const [searched, setSearched] = useState("");

  useEffect(() => {
    api.getStations(searched).then((res: Radio[]) => {
      setRadios(
        res.map((r) => {
          if (
            radioContext?.radios.find(
              (radio) => radio.favorited && radio.stationuuid == r.stationuuid
            )
          ) {
            r.favorited = true;
          }

          return r;
        })
      );
    });
  }, [searched]);

  const searchStation = (inputValue: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSearched(inputValue);
    }, 2000);
  };

  useEffect(() => {
    setRadios(
      radios?.map((r) => {
        if (r.favorited == true) {
          if (
            !radioContext?.radios.find(
              (radio) => radio.stationuuid == r.stationuuid
            )
          ) {
            r.favorited = false;
          }
        }
        return r;
      })
    );
  }, [radioContext?.radios]);

  const handleFavoriteStationBtt = async (radio: Radio) => {
    if (
      radioContext &&
      !radioContext.radios.find((r) => r.stationuuid == radio.stationuuid)
    ) {
      radioContext.dispatch({
        type: "ADD_RADIO",
        payload: radio,
      });
      setRadios(
        radios?.map((r) => {
          if (r.stationuuid == radio.stationuuid) r.favorited = true;
          return r;
        })
      );
    } else {
      alert("Essa Radio já foi adicionada");
    }
  };

  return (
    <div
      className="bg-[#1E1E21]  text-center p-4 w-[244px] h-full max-[800px]:fixed max-[800px]:w-full  overflow-y-auto"
      style={{
        display: showMenu ? "block" : "none",
      }}
    >
      <div className="buttunArea text-end">
        <button onClick={setShowMenu}>
          <Menu size={28} color="#1267fc" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Search here"
        onChange={(e) => searchStation(e.target.value)}
        className="bg-[#4D4D56] text-white rounded-[10px] px-3 py-1 outline-none"
      />
      <ul className="flex flex-col gap-2 mt-5">
        {radios &&
          radios.map((radio, key) => (
            <MenuItem
              key={key}
              radio={radio}
              handleFavoriteStationBtt={handleFavoriteStationBtt}
            />
          ))}
      </ul>
    </div>
  );
};
