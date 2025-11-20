"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, User } from "lucide-react";
import { StatusBar } from "@/src/components/dashboard/stutus-bar-props";
import { HomeScreen } from "@/src/components/pages/homedash";
import { VirtualCardScreen } from "@/src/components/pages/virtual-card-screen";
import { BottomNavigation } from "@/src/components/dashboard/bottom-nav";
import Link from "next/link";

export default function ManageCards() {
  const router = useRouter();

  const [currentScreen, setCurrentScreen] = useState("card");

  const [activeTab, setActiveTab] = useState<"virtual" | "physical">("virtual");

  return (
    <div className="flex-1 text-white overflow-y-auto pb-16">
      <div className="flex items-center justify-between px-5 py-3">
        <Link href="/">
          {" "}
          <button className="p-1">
            <ArrowLeftIcon size={20} />
          </button>
        </Link>

        <div className="font-medium">GT VirtuPay</div>
        <div className="w-5"></div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 px-5">
        <button
          className={`flex-1 py-3 text-sm font-medium relative ${
            activeTab === "virtual" ? "text-white" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("virtual")}
        >
          Virtual Card
          {activeTab === "virtual" && (
            <div className="w-8 absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#E15C42] "></div>
          )}
        </button>

        <button
          className={`flex-1 py-3 text-sm font-medium relative ${
            activeTab === "physical" ? "text-white" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("physical")}
        >
          Physical Card
          {activeTab === "physical" && (
            <div className="w-8 absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#E15C42] "></div>
          )}
        </button>
      </div>

      {activeTab === "virtual" ? (
        <VirtualCardScreen onNavigate={setCurrentScreen} />
      ) : (
        <VirtualCardScreen onNavigate={setCurrentScreen} />
      )}
    </div>
  );
}

//   return (
//     <div className="w-full  text-white flex flex-col items-center justify-center">
//       <div className="w-full  relative flex flex-col">
//         <VirtualCardScreen onNavigate={setCurrentScreen} />
//       </div>
//     </div>
//   );
// }
