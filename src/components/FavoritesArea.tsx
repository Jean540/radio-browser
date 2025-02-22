import { RadioContext } from "@/contexts/FavoriteRadioContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { Search } from "lucide-react";
import { FavoriteItem } from "./FavoriteItem";
import { Radio } from "@/types/Radio";

type Props = {
  setShowMenu: () => void;
};

export const FavoritesArea = ({ setShowMenu }: Props) => {
  const radioContext = useContext(RadioContext);
  const [playedRadio, setPlayedRadio] = useState<null | Radio>(null);

  return (
    <div className="bg-[#2F2F33] flex flex-1 flex-col items-center p-7 max-[640px]:p-3 ">
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
      <div className="w-full ">
        {playedRadio ? (
          <FavoriteItem
            radio={playedRadio}
            playedRadio={playedRadio}
            setPlayedRadio={setPlayedRadio}
            header={true}
          />
        ) : (
          <FavoriteItem
            playedRadio={null}
            setPlayedRadio={setPlayedRadio}
            header={true}
          />
        )}
      </div>
      {radioContext?.radios != undefined && radioContext?.radios.length > 0 && (
        <ul className="bg-[#4D4D56] p-[8px] flex flex-col w-full gap-2 text-black rounded-[10px] mt-1 overflow-y-auto">
          {radioContext.radios.map((radio, key) => (
            <FavoriteItem
              key={key}
              radio={radio}
              playedRadio={playedRadio}
              setPlayedRadio={setPlayedRadio}
              header={false}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
