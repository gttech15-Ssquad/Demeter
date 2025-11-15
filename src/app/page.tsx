"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { StatusBar } from "@/src/components/dashboard/stutus-bar-props";
import { HomeScreen } from "@/src/components/pages/homedash";
import { VirtualCardScreen } from "@/src/components/pages/virtual-card-screen";
import { BottomNavigation } from "@/src/components/dashboard/bottom-nav";

export default function Home() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const maxPinLength = 6;

  const handleNumberClick = (num: number) => {
    if (pin.length < maxPinLength) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);

      // Auto-submit when PIN is complete
      if (newPin.length === maxPinLength) {
        setTimeout(() => {
          // Replace with real authentication
          if (newPin === "123456") {
            router.push("/dashboard"); // Navigate to dashboard
          } else {
            setError(true);
            setPin("");
          }
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError(false);
  };

  const [currentScreen, setCurrentScreen] = useState("home");

  return (
    <div className="w-full  text-white flex flex-col items-center justify-center">
      <div className="w-full  relative flex flex-col">
        {currentScreen === "home" && (
          <HomeScreen onNavigate={setCurrentScreen} />
        )}
        {currentScreen === "card" && (
          <VirtualCardScreen onNavigate={setCurrentScreen} />
        )}
        <BottomNavigation
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
        />
      </div>
    </div>
  );
}
