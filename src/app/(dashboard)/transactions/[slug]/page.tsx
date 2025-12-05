"use client";

import { SectionLabel } from "@/src/components/dashboard/profileNav";
import {
  Card2Icon,
  Card3Icon,
  ReceiptIcon,
} from "@/src/components/icons/fix-color_type";
import SpinnerOverlay from "@/src/components/shared/spinner-overlay";
import { endpoints } from "@/src/config/endpoints";
import { DetailedTransaction } from "@/src/types/user";
import { instance } from "@/src/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function CreateInstitutionPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = use(props.params);
  const transId = params.slug;

  const {
    data: cardres,
    isFetching: isFetchingDetails,
    refetch,
  } = useQuery({
    queryFn: () =>
      instance.get(`${endpoints().transactions.getDetails(transId)}`),
    queryKey: ["v-card-trans-details", transId],
  });

  console.log(cardres);

  const transaction = cardres?.data as DetailedTransaction | undefined;
  console.log(transaction);

  if (isFetchingDetails) {
    return (
      <>
        {" "}
        <SpinnerOverlay />
      </>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen w-full bg-gray-900 p-6 text-red-500">
        Error loading transaction or transaction not found.
      </div>
    );
  }

  const {
    amountMinorUnits,
    currency,
    merchantName,
    type,
    status,
    createdAt,
    description,
    referenceId,
    cardId,
  } = transaction;

  const formattedAmount = formatAmount(amountMinorUnits);
  const formattedDate = formatTransactionDate(createdAt);
  const statusColor =
    status === "COMPLETED" ? "text-green-500" : "text-yellow-500";
  // Assuming 'Account debited' is the reference ID for this context
  const accountDebited = referenceId;

  // if (isFetchingDetails)
  // 	return (
  // 		<div className="min-h-screen w-full animate-pulse bg-gray-50 p-6"> </div>
  // 	)
  // return (
  //   <div className="flex-1 text-white overflow-y-auto pb-0">
  //     <div className="flex items-center justify-between px-5 py-3">
  //       <Link href="/cards">
  //         {" "}
  //         <button className="p-1 cursor-pointer">
  //           <ArrowLeftIcon size={20} />
  //         </button>
  //       </Link>
  //     </div>

  //     <div className="px-5 text-2xl flex w-full justify-between font-semibold">
  //       <p className=" ">
  //         + ₦{Math.floor(amount).toLocaleString()}
  //         <span className="text-sm ">.{amount.toFixed(2).split(".")[1]}</span>
  //       </p>

  //       <div className="w-10 h-10 bg-[#1E1F23] border border-[#313139] rounded-full flex items-center justify-center">
  //         <Card2Icon />
  //       </div>
  //     </div>

  //     <div className="px-5  flex flex-col gap-2 text-gray-400 ">
  //       <p className="text-xs px-2">Card transaction</p>

  //       <p className="text-xs px-2">November 13, 2025 at 2:34 PM</p>

  //       <button className="border-[#E15C42] mt-2 whitespace-nowrap w-[108px]  h-10 border bg-[#392223] rounded-4xl  px-4 flex  gap-2 items-center justify-center hover:border-orange-500 transition-colors">
  //         <ReceiptIcon className="text-orange-500 " />
  //         <span className="text-orange-500 text-md">Receipt</span>
  //       </button>
  //     </div>

  //     <div className="mt-6 flex flex-col gap-2 px-5">
  //       <SectionLabel label="Details" />
  //       <div className="w-full bg-[#1E1F23] border border-[#313139] flex justify-between items-center gap-4 rounded-md p-4 py-2 text-white">
  //         <p className="text-sm  ">GT VirtuPay 12156912407</p>
  //       </div>

  //       <div className="w-full bg-[#1E1F23] border border-[#313139] flex flex-col gap-4 rounded-md p-4 py-5 text-white">
  //         <div className="  flex justify-between items-center gap-1">
  //           <p className="text-xs text-gray-400  ">Account debited</p>
  //           <p className="text-xs  ">12156912407</p>{" "}
  //         </div>
  //         <div className="  flex justify-between items-center gap-1">
  //           <p className="text-xs text-gray-400  ">Beneficiary</p>
  //           <p className="text-xs  ">GT VirtuPay 12156912407</p>{" "}
  //         </div>
  //         <div className=" border-t border-[#313139] pt-2 flex justify-center items-center gap-1">
  //           <p className="text-xs text-gray-400 flex items-center gap-1 ">
  //             <Card3Icon /> Paid by virtual card
  //           </p>
  //         </div>
  //       </div>

  //       <div className="w-full text-sm flex-col bg-[#1E1F23] border border-[#313139] flex gap-1 rounded-md p-4 py-2 text-white">
  //         <p className="text-sm  ">
  //           GT VirtuPay 12156912407 Chowdecklang 003560
  //         </p>
  //         <p>683382003560 Зірg0001539983********9368</p>
  //       </div>

  //       <div className="w-full mt-4 bg-[#1E1F23] border border-[#313139] flex flex-col rounded-md p-4 py-2 text-white">
  //         <Link href="/merchant">
  //           <div className="w-full flex justify-between items-center gap-4 rounded-md p-2 text-white">
  //             <p className="text-sm  ">Manage online merchant</p>

  //             <div className="flex items-center gap-1 text-sm">
  //               {" "}
  //               Chowdeck <ChevronRight />
  //             </div>
  //           </div>
  //         </Link>

  //         <div className="w-full flex justify-between items-center gap-4 rounded-md p-2 text-white">
  //           <p className="text-sm  ">Report dispense error</p>

  //           <div className="flex items-center gap-1 text-sm">
  //             <ChevronRight />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex-1 text-white overflow-y-auto pb-0 bg-[#121212]">
      {/* Header and Back Button */}
      <div className="flex items-center justify-between px-5 py-3">
        <Link href="/cards">
          <button className="p-1 cursor-pointer">
            <ArrowLeftIcon size={20} />
          </button>
        </Link>
      </div>

      {/* Amount and Icon */}
      <div className="px-5 text-2xl flex w-full justify-between font-semibold">
        <p className=" ">
          + ₦{formattedAmount.major}
          <span className="text-sm ">.{formattedAmount.minor}</span>
        </p>

        <div className="w-10 h-10 bg-[#1E1F23] border border-[#313139] rounded-full flex items-center justify-center">
          <Card2Icon />
        </div>
      </div>

      {/* Transaction Type, Date, Status, and Receipt */}
      <div className="px-5 flex flex-col gap-2 text-gray-400 ">
        <p className="text-xs px-2">{type}</p>
        <p className="text-xs px-2">{formattedDate}</p>

        {/* Status */}
        {/* <p className={`text-xs px-2 font-bold ${statusColor}`}>
          Status: {status}
        </p> */}

        <button className="border-[#E15C42] mt-2 whitespace-nowrap w-[108px] h-10 border bg-[#392223] rounded-full px-4 flex gap-2 items-center justify-center hover:border-orange-500 transition-colors">
          <ReceiptIcon className="text-orange-500 " />
          <span className="text-orange-500 text-md">Receipt</span>
        </button>
      </div>

      {/* Details Section */}
      <div className="mt-6 flex flex-col gap-2 px-5">
        <SectionLabel label="Details" />

        {/* Merchant Name / Description */}
        <div className="w-full bg-[#1E1F23] border border-[#313139] flex justify-between items-center gap-4 rounded-md p-4 py-2 text-white">
          <p className="text-sm">{merchantName}</p>
        </div>

        {/* Detailed Breakdown Card */}
        <div className="w-full bg-[#1E1F23] border border-[#313139] flex flex-col gap-4 rounded-md p-4 py-5 text-white">
          <div className="flex justify-between items-center gap-1">
            <p className="text-xs text-gray-400">Reference ID</p>
            <p className="text-xs">{referenceId}</p>
          </div>

          <div className="flex justify-between items-center gap-1">
            <p className="text-xs text-gray-400">Description</p>
            <p className="text-xs">{description}</p>
          </div>

          {/* This is a guess: assuming this shows the account/card that was debited */}
          <div className="flex justify-between items-center gap-1">
            <p className="text-xs text-gray-400">Account debited</p>
            <p className="text-xs">{accountDebited}</p>{" "}
          </div>

          {/* Beneficiary is the Merchant Name */}
          <div className="flex justify-between items-center gap-1">
            <p className="text-xs text-gray-400">Beneficiary</p>
            <p className="text-xs">{merchantName}</p>{" "}
          </div>

          <div className="border-t border-[#313139] pt-2 flex justify-center items-center gap-1">
            <p className="text-xs text-gray-400 flex items-center gap-1 ">
              <Card3Icon /> Paid by virtual card
            </p>
          </div>
        </div>

        {/* Raw Transaction Data (The original box was too dense, simplified here)
        <div className="w-full text-sm flex-col bg-[#1E1F23] border border-[#313139] flex gap-1 rounded-md p-4 py-2 text-white">
          <p className="text-sm font-semibold">Raw Transaction Data:</p>
          <p className="text-xs text-gray-400 break-words">
            {JSON.stringify({ id: transId, status, currency })}
          </p>
        </div> */}

        {/* Management Links */}
        <div className="w-full mt-4 bg-[#1E1F23] border border-[#313139] flex flex-col rounded-md p-4 py-2 text-white">
          <Link href={`/merchant?card=${transaction.cardId}`}>
            <div className="w-full flex justify-between items-center gap-4 rounded-md p-2 text-white">
              <p className="text-sm">Manage {merchantName} subscription</p>

              <div className="flex items-center gap-1 text-sm">
                <ChevronRight size={16} />
              </div>
            </div>
          </Link>

          {/* <div className="w-full flex justify-between items-center gap-4 rounded-md p-2 text-white border-t border-[#313139] mt-1 pt-1">
            <p className="text-sm">Report a dispense error</p>
            <div className="flex items-center gap-1 text-sm">
              <ChevronRight size={16} />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

const formatAmount = (
  amountMinor: number
): { major: string; minor: string; full: number } => {
  // Assuming 100 minor units per major unit (e.g., kobo to Naira)
  const full = amountMinor;
  const major = Math.floor(full).toLocaleString();
  const minor = full.toFixed(2).split(".")[1];
  return { major, minor, full };
};

/** Converts ISO 8601 string to readable date and time. */
const formatTransactionDate = (isoString: string): string => {
  const date = new Date(isoString);
  return (
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) +
    " at " +
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );
};
