"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/src/utils";
import { endpoints } from "@/src/config/endpoints";
import { CardDetailsFull } from "@/src/components/cards/cardDetailsDrawer";

export default function CardSettings() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const cardId = searchParams.get("card") || "";

  const [currentScreen, setCurrentScreen] = useState("card");

  console.log(cardId);

  const [activeTab, setActiveTab] = useState<"virtual" | "physical">("virtual");

  const {
    data: cardres,
    isFetching: isFetchingDetails,
    refetch,
  } = useQuery({
    queryFn: () =>
      instance.get(`${endpoints().cards.getFullDetails(cardId || "")}`),
    queryKey: ["v-cards-details", cardId],
  });
  const vCard = cardres?.data as CardDetailsFull | undefined;

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

      <CardSettingsList cardDetails={vCard} cardId={cardId} />
    </div>
  );
}
