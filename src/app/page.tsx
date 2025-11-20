"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { StatusBar } from "@/src/components/dashboard/stutus-bar-props";
import { HomeScreen } from "@/src/components/pages/homedash";
import { VirtualCardScreen } from "@/src/components/pages/virtual-card-screen";
import { BottomNavigation } from "@/src/components/dashboard/bottom-nav";
import { ProfileNav } from "../components/dashboard/profileNav";

export default function Home() {
  const router = useRouter();

  const [currentScreen, setCurrentScreen] = useState("home");

  return (
    <div className="w-full  text-white flex flex-col items-center justify-center">
      <div className="w-full  relative flex flex-col">
        {currentScreen === "home" && (
          <>
            <HomeScreen onNavigate={setCurrentScreen} />

            <BottomNavigation
              currentScreen={currentScreen}
              onNavigate={setCurrentScreen}
            />
          </>
        )}

        {currentScreen === "profile" && (
          <ProfileNav onNavigate={setCurrentScreen} />
        )}
        {currentScreen === "card" && (
          <VirtualCardScreen onNavigate={setCurrentScreen} />
        )}
      </div>
    </div>
  );
}
