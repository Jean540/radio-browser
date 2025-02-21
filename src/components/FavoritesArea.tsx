import { RadioContext } from "@/contexts/FavoriteRadioContext";
import Image from "next/image";
import React, { useContext } from "react";
import { Search } from "lucide-react";

type Props = {
  setShowMenu: () => void;
};

export const FavoritesArea = ({ setShowMenu }: Props) => {
  const radioContext = useContext(RadioContext);
  console.log(radioContext);
  return (
    <div className="bg-[#2F2F33] flex flex-1 flex-col items-center p-7 max-[640px]:p-3">
      <div className="grid grid-cols-2 max-[640px]:grid-cols-1 w-full">
        <h1 className="font-bold text-[28px] col-span-2 text-center  max-[640px]:leading-[20px] max-[640px]:mb-[40px]">
          Radio Browser
        </h1>
        <p className="self-start ">FAVORITE RADIOS</p>

        <button
          onClick={setShowMenu}
          className="max-[640px]:order-first flex items-center ml-auto "
        >
          <Search size={28} color="#1267fc" />
          <span className="ml-1 max-[640px]:hidden">Search stations</span>
        </button>
      </div>
      {radioContext?.radio != undefined && radioContext?.radio.length > 0 && (
        <ul className="bg-[#4D4D56] p-[8px] flex flex-col w-full gap-2 text-black rounded-[10px] mt-1">
          {radioContext.radio.map((radio, key) => (
            <li
              className="bg-[#62626C] flex items-center gap-5 text-[24px] p-2 rounded-md"
              key={key}
            >
              <div className="size-[54px] bg-[#2F2F33] rounded-full"></div>
              <div>
                <p className="text-[24px] font-bold">{radio.name}</p>
                <p className="text-[16px]">{radio.country}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
