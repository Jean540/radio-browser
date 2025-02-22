import { Radio } from "@/types/Radio";
import React, { useState, useEffect, useContext } from "react";
import { Play } from "lucide-react";
import { Square } from "lucide-react";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import { RadioContext } from "@/contexts/FavoriteRadioContext";

type Props = {
  radio?: Radio;
  playedRadio: Radio | null;
  setPlayedRadio: (r: Radio | null) => void;
  header: boolean;
};

export const FavoriteItem = ({
  radio,
  playedRadio,
  setPlayedRadio,
  header,
}: Props) => {
  const radioContext = useContext(RadioContext);

  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (playedRadio && playedRadio !== radio) {
      audioRef.current?.pause();
    }
  }, [playedRadio, radio]);

  const handleChangePlayStatus = () => {
    if (!header) {
      if (radio && playedRadio === radio) {
        audioRef.current?.pause();
        setPlayedRadio(null);
      } else if (radio) {
        if (playedRadio) {
          setPlayedRadio(null);
        }
        audioRef.current?.play();
        setPlayedRadio(radio);
      }
    }
  };

  const handleEditRadioName = () => {
    const newName = window.prompt("Informe o novo nome", radio?.name);
    if (radio && newName?.trim())
      radioContext?.dispatch({
        type: "EDIT_RADIO",
        payload: { stationuuid: radio?.stationuuid, name: newName },
      });
  };

  const handleDeletRadio = () => {
    if (radio) {
      if (radio == playedRadio) {
        audioRef.current?.pause();
        setPlayedRadio(null);
      }
      radioContext?.dispatch({
        type: "REMOVE_RADIO",
        payload: radio,
      });
    }
  };

  return (
    <li
      className="bg-[#62626C] flex items-center gap-5 text-[24px] p-2 rounded-md"
      style={{ background: header ? "#4D4D56" : "#62626c" }}
    >
      <div
        className="size-[48px] rounded-full flex justify-center items-center "
        style={{
          background: header ? "transparent" : "#2F2F33",
          cursor: header ? "initial" : "pointer",
        }}
        onClick={handleChangePlayStatus}
      >
        {playedRadio && playedRadio === radio ? (
          <Square size={26} color="black" fill="100%" />
        ) : (
          <Play size={26} color="black" fill="100%" />
        )}
      </div>
      <audio ref={audioRef}>
        {radio && <source src={radio.url} type="audio/mp3" />}
      </audio>
      <div>
        <p className="text-[24px] font-bold text-black">
          {radio ? radio.name : "NOME DA RÁDIO ATUAL"}
        </p>
        {radio && !header && (
          <p className="text-[16px] max-[650px]:hidden ">{radio.country}</p>
        )}
      </div>
      {!header && (
        <div className="ml-auto flex gap-4">
          <Pencil
            size={27}
            color="black"
            fill="100%"
            className="max-[650px]:hidden cursor-pointer"
            onClick={handleEditRadioName}
          />
          <Trash
            size={27}
            color="black"
            fill="100%"
            onClick={handleDeletRadio}
            className="cursor-pointer"
          />
        </div>
      )}
    </li>
  );
};
//750
