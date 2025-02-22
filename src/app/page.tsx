"use client";
import { FavoritesArea } from "@/components/FavoritesArea";
import { SideMenu } from "@/components/SideMenu";
import { RadioProvider } from "@/contexts/FavoriteRadioContext";
import { useState } from "react";

const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <RadioProvider>
      <div className="flex h-full">
        <SideMenu showMenu={showMenu} setShowMenu={() => setShowMenu(false)} />
        <FavoritesArea setShowMenu={() => setShowMenu(true)} />
      </div>
    </RadioProvider>
  );
};

export default HomePage;
