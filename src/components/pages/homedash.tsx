"use client";

import React, { useState } from "react";
import {
  ChevronRightIcon,
  EyeIcon,
  PlusCircleIcon,
  ArrowRightIcon,
  MoreHorizontalIcon,
  EyeOff,
} from "lucide-react";
import {
  AccountDetailsIcon,
  CopyIcon,
  ProfileIcon,
  TransferIcon,
} from "../icons/pack_1";
import {
  BuyairtimeIcon,
  BuydataIcon,
  FXSalesIcon,
  NearMeIcon,
} from "../icons/fix-color_type";
import TransactionRow from "../cards/transactional_row";
import TransactionItem from "../cards/transactional_row";
import Image from "next/image";
import { ProfileNav } from "../dashboard/profileNav";
import { useUserStore } from "@/src/store/z-store/user";
import { useQuery } from "@tanstack/react-query";
import { endpoints } from "@/src/config/endpoints";
import {
  formatCurrency,
  formatfordecimal,
  formatWithoutCurrency,
  instance,
} from "@/src/utils";
import { AccountProps } from "@/src/types/user";
interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}
export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { signOut, user } = useUserStore();

  const [showbalance, setShowBalance] = useState(false);
  const {
    data: dashaccount,
    isFetching: isFetchingAcct,
    refetch,
  } = useQuery({
    queryFn: () => instance.get(`${endpoints().accounts.getBalance}`),
    queryKey: ["useraccount", user?.userId],
  });

  const dashAccount = dashaccount?.data as AccountProps;

  console.log(dashAccount);
  return (
    <div className="flex-1 relative overflow-y-auto px-5 pb-16">
      {/* Header */}
      <div className="flex flex-col sticky top-0 items-center mt-2 mb-6">
        <div className="flex w-full flex-col">
          <div className="flex items-center gap-2">
            <ProfileIcon
              className="cursor-pointer"
              onClick={() => onNavigate("profile")}
            />

            <span className="text-sm font-medium">
              Hello, {user?.firstName}!
            </span>
          </div>

          <div className="flex justify-between mt-2 h-8 items-centrer">
            <div className="text-xs text-gray-500 border-2 border-gray-800 rounded-sm py-1 px-2 ">
              {dashAccount?.accountType}
            </div>
            <div className="text-xs flex gap-2  text-gray-500 border-2 border-gray-800 rounded-sm py-1 px-2">
              {dashAccount?.accountNumber}
              <span>
                <CopyIcon className="text-[#E85D04]" />
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Balance */}
      <div className="mb-6">
        <div className="flex items-center  gap-2 mb-2">
          {showbalance ? (
            <div className="flex gap-2">
              {" "}
              <span className="text-sm mt-4 ">N</span>{" "}
              <span className="text-3xl flex justify-center items-center font-bold">
                {formatWithoutCurrency(dashAccount.balanceMinorUnits)}
                {formatfordecimal(dashAccount.balanceMinorUnits)}
              </span>
            </div>
          ) : (
            <span className="text-5xl flex justify-center items-center font-bold">
              {" "}
              •••{" "}
            </span>
          )}

          <span
            className="flex justify-center mt-4 items-center"
            onClick={() => setShowBalance(!showbalance)}
          >
            {showbalance ? (
              <EyeOff size={18} className="text-gray-500" />
            ) : (
              <EyeIcon size={18} className="text-gray-500" />
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Book Balance</span>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex  gap-2 overflow-x-scroll  mb-8">
        <button className="border-[#E15C42] whitespace-nowrap  h-10 border bg-[#392223] rounded-4xl  px-4 flex  gap-2 items-center justify-center hover:border-orange-500 transition-colors">
          <PlusCircleIcon size={20} className="text-orange-500 " />
          <span className="text-orange-500 text-md">Fund account</span>
        </button>
        <button className="border-[#E15C42] whitespace-nowrap  h-10 border bg-[#392223] rounded-4xl  px-4 flex  gap-2 items-center justify-center hover:border-orange-500 transition-colors">
          <TransferIcon className="text-orange-500 h-4 mt-1  w-5" />
          <span className="text-orange-500 text-md">Transfer</span>
        </button>
        <button className="border-[#E15C42] whitespace-nowrap  h-10 border bg-[#392223] rounded-4xl  px-4 flex  gap-2 items-center justify-center hover:border-orange-500 transition-colors">
          <AccountDetailsIcon className="text-orange-500 h-5  w-5 " />
          <span className="text-orange-500 text-md">Account details </span>
        </button>
      </div>
      {/* Shortcuts */}
      <div className="mb-8">
        <h2 className="text-base font-bold lineheight-22 mb-4">Shortcut</h2>
        <div className="grid grid-cols-5 gap-4">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mb-2">
              <NearMeIcon />
            </div>
            <span className="text-xs text-gray-400 text-center">Near me</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mb-2">
              <BuydataIcon />
            </div>
            <span className="text-xs text-gray-400 text-center">Buy data</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mb-2">
              <BuyairtimeIcon />
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap text-center">
              Buy airtime
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mb-2">
              <FXSalesIcon />
            </div>
            <span className="text-xs text-gray-400 text-center">FX sales</span>
          </div>
        </div>
      </div>
      {/* Transaction History */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold">Transaction history</h2>
          <button className="flex items-center text-xs text-gray-400 ">
            See more <ChevronRightIcon size={14} />
          </button>
        </div>

        <TransactionItem
          dateLabel="Today"
          transactionId="1000042511100600061449612345"
          amount={1000.0}
          type="Transfer"
          toLastDigits="9676"
        />

        {/* <TransactionRow
          transactionId={"11111"}
          type={"Transfer"}
          amount={1000}
          destination={"10000435110006000"}
          isCredit={false}
        /> */}
        {/* <div className="bg-gray-900 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-3">Today</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-red-500 rounded-full"></div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Transfer</div>
                <div className="text-xs text-gray-500">
                  10000435110006000...
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-green-500 mb-1">
                +₦1,000.00
              </div>
              <div className="text-xs text-gray-500">Tax • 6578</div>
            </div>
          </div>
        </div> */}
      </div>
      {/* Investments */}
      <div>
        <h2 className="text-base font-semibold mb-4">Investments</h2>
        <img
          alt="vault"
          src="/images/homevault.png"
          width={1000}
          height={1000}
          onClick={() => onNavigate("card")}
        />

        <div className="mt-8 text-sm font-medium">
          Link your Guaranty Trust Fund Management
        </div>
      </div>
    </div>
  );
}
