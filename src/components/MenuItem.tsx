import { Radio } from "@/types/Radio";
import React from "react";
import { Check } from "lucide-react";

type Props = {
  radio: Radio;
  handleFavoriteStationBtt: (r: Radio) => void;
};

export const MenuItem = ({ radio, handleFavoriteStationBtt }: Props) => {
  return (
    <li
      className="bg-[#4D4D56] flex items-center h-[48px] justify-between p-2 rounded-[10px] cursor-pointer"
      onClick={() => handleFavoriteStationBtt(radio)}
    >
      <p className="text-left truncate">
        {radio.name.trim() != "" ? radio.name : "Sem nome"}
      </p>
      {radio.favorited && <Check size={25} color="#1267fc" strokeWidth="3px" />}
    </li>
  );
};
