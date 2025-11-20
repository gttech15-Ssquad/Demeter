"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, User } from "lucide-react";
import { StatusBar } from "@/src/components/dashboard/stutus-bar-props";
import { HomeScreen } from "@/src/components/pages/homedash";
import { VirtualCardScreen } from "@/src/components/pages/virtual-card-screen";
import { BottomNavigation } from "@/src/components/dashboard/bottom-nav";
import { MerchantManagementScreen } from "@/src/components/pages/merchant-management-screen";
import Link from "next/link";
import "@/src/styles/marchanttoggle.module.css";

export default function MerchantScreen() {
  const router = useRouter();

  const [currentScreen, setCurrentScreen] = useState("home");

  return (
    <div className="flex-1 text-white overflow-y-auto pb-0">
      <div className="flex items-center justify-between px-5 py-3">
        <Link href="/cards">
          {" "}
          <button className="p-1 cursor-pointer">
            <ArrowLeftIcon size={20} />
          </button>
        </Link>

        {/* <div className="font-medium">Transaction History</div>
        <div className="w-5"></div> */}
      </div>

      <h2 className="px-8 text-2xl font-semibold">Manage online merchant</h2>
      <div className="w-full  relative flex flex-col">
        <MerchantManagementScreen onNavigate={setCurrentScreen} />
      </div>
    </div>
  );
}
