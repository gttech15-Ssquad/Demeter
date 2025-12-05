"use client";

import { useMemo, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/src/utils";
import { endpoints } from "@/src/config/endpoints";
import { TransactionListResponse } from "@/src/types/user";
import { transformTransactions } from "@/src/components/cards/transform-group-by-date";
import { CardDetailsFull } from "@/src/components/cards/cardDetailsDrawer";

export default function ManageCards() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const cardId = searchParams.get("card") || "";

  const [currentScreen, setCurrentScreen] = useState("card");

  const [activeTab, setActiveTab] = useState<"virtual" | "physical">("virtual");

  const {
    data: historyRes,
    isFetching: isFetchingHistory,
    refetch,
  } = useQuery({
    queryFn: () =>
      instance.get(`${endpoints().transactions.getHistory(cardId || "")}`),
    queryKey: ["v-cards-transactions", cardId],
  });

  const ctransRes = historyRes?.data as TransactionListResponse | undefined;
  const cardTrans = ctransRes?.transactions;

  const { data: cardres, isFetching: isFetchingDetails } = useQuery({
    queryFn: () => instance.get(`${endpoints().cards.getFullDetails(cardId)}`),
    queryKey: ["v-cards-details", cardId],
  });

  console.log(cardres);

  const vCard = cardres?.data as CardDetailsFull | undefined;
  const maskedNumber = vCard?.cardNumberMasked || "****0000";

  // const groupedTransactions = transformTransactions(cardTrans, maskedNumber);

  // Inside VirtualCardScreen or your parent component

  // ... existing states and logic

  // NEW STATE: to hold the user's search query
  const [searchQuery, setSearchQuery] = useState("");

  // ... existing logic

  // Existing code for data transformation (assuming it's available)
  const groupedTransactions = transformTransactions(cardTrans, maskedNumber);

  // NEW DERIVED STATE: Filter the grouped transactions whenever searchQuery changes
  const filteredGroups = useMemo(() => {
    if (!searchQuery) {
      return groupedTransactions.transactions_by_date;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    // 1. Map over the existing date groups
    return groupedTransactions.transactions_by_date
      .map((group) => {
        // 2. Filter transactions within each group
        const filteredTransactions = group.transactions.filter(
          (transaction) => {
            // Search across relevant fields (description, type, source)
            return (
              transaction.description.toLowerCase().includes(lowerCaseQuery) ||
              transaction.type.toLowerCase().includes(lowerCaseQuery) ||
              transaction.source.includes(lowerCaseQuery)
            );
          }
        );

        // 3. Return the group only if it contains matching transactions
        if (filteredTransactions.length > 0) {
          return {
            ...group,
            transactions: filteredTransactions,
          };
        }
        return null; // Exclude this group
      })
      .filter((group) => group !== null); // Remove null groups from the final list
  }, [searchQuery, groupedTransactions.transactions_by_date]);

  // ... rest of your component

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
      <h2 className="px-5 text-2xl font-semibold">Transaction history</h2>
      <TransactionSearch
        // Connect the debounced search value to the state setter
        onSearch={(value) => setSearchQuery(value)}
        onFilterChange={(filter) => console.log("filter:", filter)}
      />

      <TransactionList groups={filteredGroups} />
      {/* Optional: Add a message if no results are found */}
      {filteredGroups.length === 0 && searchQuery && (
        <p className="text-gray-500 text-center mt-8">
          No transactions found for "{searchQuery}".
        </p>
      )}
    </div>
  );
}

// const trans = {
//   transactions_by_date: [
//     {
//       date: "November 13, 2025",
//       transactions: [
//         {
//           id: "12156912407",
//           description: "GT VirtuPay 12156912407",
//           type: "Card transaction",
//           amount_ngn: 6400.0,
//           source: "9676",
//         },
//         {
//           id: "12156786314",
//           description: "GT VirtuPay 12156786314",
//           type: "Card transaction",
//           amount_ngn: 1700.0,
//           source: "9676",
//         },
//       ],
//     },
//     {
//       date: "November 6, 2025",
//       transactions: [
//         {
//           id: "1204679543",
//           description: "GT VirtuPay 1204679543",
//           type: "Card transaction",
//           amount_ngn: 3900.0,
//           source: "9676",
//         },
//       ],
//     },
//     {
//       date: "October 25, 2025",
//       transactions: [
//         {
//           id: "12025785326",
//           description: "GT VirtuPay 12025785326",
//           type: "Card transaction",
//           amount_ngn: 11400.0,
//           source: "9676",
//         },
//         {
//           id: "12006334659",
//           description: "GT VirtuPay 12006334659",
//           type: "Card transaction",
//           amount_ngn: 1100.0,
//           source: "9676",
//         },
//       ],
//     },
//     {
//       date: "October 12, 2025",
//       transactions: [
//         {
//           id: "1204679543_2",
//           description: "GT VirtuPay 1204679543",
//           type: "Card transaction",
//           amount_ngn: 3900.0,
//           source: "9676",
//         },
//       ],
//     },
//   ],
// };
