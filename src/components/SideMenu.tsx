"use client";
import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { Station } from "@/types/Station";
import { RadioContext } from "@/contexts/FavoriteRadioContext";
import { Radio } from "@/types/Radio";
import { Menu } from "lucide-react";
import { Check } from "lucide-react";

let timer: NodeJS.Timeout;

type Props = {
  setShowMenu: () => void;
};

export const SideMenu = ({ setShowMenu }: Props) => {
  const radioContext = useContext(RadioContext);

  const [stations, setStations] = useState<Station[]>();
  const [searched, setSearched] = useState("");
  // const [favoriteStation, setFavoriteStation] = useState("");

  useEffect(() => {
    api.getStations(searched).then((res) => setStations(res));
  }, [searched]);

  const searchStation = (inputValue: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSearched(inputValue);
    }, 2000);
  };

  const handleFavoriteStationBtt = async (station: Station) => {
    const radio: Radio[] = await api.getRadio(station.stationuuid);
    console.log(radio[0].name);
    if (radioContext) {
      if (
        !radioContext.radio.find((r) => r.stationuuid == station.stationuuid)
      ) {
        radioContext.dispatch({
          type: "ADD_RADIO",
          payload: radio[0],
        });
      } else {
        alert("Essa Radio já foi adicionada");
      }
    }
  };

  return (
    <div className="bg-[#1E1E21] text-center p-4 w-[244px] h-full max-[550px]:fixed max-[550px]:w-full max-[550px]:text-center ">
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
        {stations &&
          stations.map((station, key) => (
            <li
              className="bg-[#4D4D56] flex items-center h-[48px] justify-between p-2 rounded-[10px]"
              key={key}
              onClick={() => handleFavoriteStationBtt(station)}
            >
              <p className="text-left">{station.name}</p>
              <Check size={25} color="#1267fc" />
            </li>
          ))}
      </ul>
    </div>
  );
};
