"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, User } from "lucide-react";
import { StatusBar } from "@/src/components/dashboard/stutus-bar-props";
import { HomeScreen } from "@/src/components/pages/homedash";
import { VirtualCardScreen } from "@/src/components/pages/virtual-card-screen";
import { BottomNavigation } from "@/src/components/dashboard/bottom-nav";
import Link from "next/link";
import {
  TransactionHistory,
  TransactionList,
} from "@/src/components/pages/transaction-history";
import TransactionSearch from "@/src/components/shared/SearchFilter";
import { CardSettingsList } from "@/src/components/pages/card-settings-screen";

export default function CardSettings() {
  const router = useRouter();

  const [currentScreen, setCurrentScreen] = useState("card");

  const [activeTab, setActiveTab] = useState<"virtual" | "physical">("virtual");

  return (
    <div className="flex-1 text-white overflow-y-auto pb-0">
      <div className="flex items-center justify-between px-5 pt-3">
        <Link href="/cards">
          {" "}
          <button className="p-1 cursor-pointer">
            <ArrowLeftIcon size={20} />
          </button>
        </Link>

        {/* <div className="font-medium">Transaction History</div>
        <div className="w-5"></div> */}
      </div>

      <h2 className="px-5 text-2xl font-semibold">Card Settings</h2>

      <CardSettingsList />
    </div>
  );
}

const trans = {
  transactions_by_date: [
    {
      date: "November 13, 2025",
      transactions: [
        {
          id: "12156912407",
          description: "GT VirtuPay 12156912407",
          type: "Card transaction",
          amount_ngn: 6400.0,
          source: "9676",
        },
        {
          id: "12156786314",
          description: "GT VirtuPay 12156786314",
          type: "Card transaction",
          amount_ngn: 1700.0,
          source: "9676",
        },
      ],
    },
    {
      date: "November 6, 2025",
      transactions: [
        {
          id: "1204679543",
          description: "GT VirtuPay 1204679543",
          type: "Card transaction",
          amount_ngn: 3900.0,
          source: "9676",
        },
      ],
    },
    {
      date: "October 25, 2025",
      transactions: [
        {
          id: "12025785326",
          description: "GT VirtuPay 12025785326",
          type: "Card transaction",
          amount_ngn: 11400.0,
          source: "9676",
        },
        {
          id: "12006334659",
          description: "GT VirtuPay 12006334659",
          type: "Card transaction",
          amount_ngn: 1100.0,
          source: "9676",
        },
      ],
    },
    {
      date: "October 12, 2025",
      transactions: [
        {
          id: "1204679543_2",
          description: "GT VirtuPay 1204679543",
          type: "Card transaction",
          amount_ngn: 3900.0,
          source: "9676",
        },
      ],
    },
  ],
};
