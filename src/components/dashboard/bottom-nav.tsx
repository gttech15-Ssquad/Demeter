import React from "react";
import {
  HomeIcon,
  ShoppingBagIcon,
  BarChartIcon,
  ArrowRightLeftIcon,
  SettingsIcon,
} from "lucide-react";

type BottomNavigationProps = {
  currentScreen: string;
  onNavigate: (screen: string) => void;
};

export function BottomNavigation({
  currentScreen,
  onNavigate,
}: BottomNavigationProps) {
  return (
    <div className="sticky bottom-0 left-0 right-0 h-16 bg-gray-950 border-t border-gray-800 flex justify-between px-5">
      <button
        className={`flex flex-col items-center justify-center flex-1 ${
          currentScreen === "home" ? "text-white" : "text-gray-500"
        }`}
        onClick={() => onNavigate("home")}
      >
        <HomeIcon size={20} />
        <span className="text-xs mt-1">Home</span>
      </button>

      <button className="flex flex-col items-center justify-center flex-1 text-gray-500">
        <ShoppingBagIcon size={20} />
        <span className="text-xs mt-1">Products</span>
      </button>

      <button className="flex flex-col items-center justify-center flex-1 text-gray-500">
        <BarChartIcon size={20} />
        <span className="text-xs mt-1">Payments</span>
      </button>

      <button className="flex flex-col items-center justify-center flex-1 text-gray-500">
        <ArrowRightLeftIcon size={20} />
        <span className="text-xs mt-1">Transfers</span>
      </button>

      <button className="flex flex-col items-center justify-center flex-1 text-gray-500">
        <SettingsIcon size={20} />
        <span className="text-xs mt-1">Finance</span>
      </button>
    </div>
  );
}
