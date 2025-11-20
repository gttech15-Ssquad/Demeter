"use client";

import { SectionLabel } from "@/src/components/dashboard/profileNav";
import {
  Card2Icon,
  Card3Icon,
  ReceiptIcon,
} from "@/src/components/icons/fix-color_type";
import { ArrowLeftIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function CreateInstitutionPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = use(props.params);
  const slug = params.slug;
  const router = useRouter();
  const searchParams = useSearchParams();

  const institutionId = searchParams.get("id");
  const [amount, setAmount] = useState(6400);

  // if (isFetchingDetails)
  // 	return (
  // 		<div className="min-h-screen w-full animate-pulse bg-gray-50 p-6"> </div>
  // 	)
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

      <div className="px-5 text-2xl flex w-full justify-between font-semibold">
        <p className=" ">
          + ₦{Math.floor(amount).toLocaleString()}
          <span className="text-sm ">.{amount.toFixed(2).split(".")[1]}</span>
        </p>

        <div className="w-10 h-10 bg-[#1E1F23] border border-[#313139] rounded-full flex items-center justify-center">
          <Card2Icon />
        </div>
      </div>

      <div className="px-5  flex flex-col gap-2 text-gray-400 ">
        <p className="text-xs px-2">Card transaction</p>

        <p className="text-xs px-2">November 13, 2025 at 2:34 PM</p>

        <button className="border-[#E15C42] mt-2 whitespace-nowrap w-[108px]  h-10 border bg-[#392223] rounded-4xl  px-4 flex  gap-2 items-center justify-center hover:border-orange-500 transition-colors">
          <ReceiptIcon className="text-orange-500 " />
          <span className="text-orange-500 text-md">Receipt</span>
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-2 px-5">
        <SectionLabel label="Details" />
        <div className="w-full bg-[#1E1F23] border border-[#313139] flex justify-between items-center gap-4 rounded-md p-4 py-2 text-white">
          <p className="text-sm  ">GT VirtuPay 12156912407</p>
        </div>

        <div className="w-full bg-[#1E1F23] border border-[#313139] flex flex-col gap-4 rounded-md p-4 py-5 text-white">
          <div className="  flex justify-between items-center gap-1">
            <p className="text-xs text-gray-400  ">Account debited</p>
            <p className="text-xs  ">12156912407</p>{" "}
          </div>
          <div className="  flex justify-between items-center gap-1">
            <p className="text-xs text-gray-400  ">Beneficiary</p>
            <p className="text-xs  ">GT VirtuPay 12156912407</p>{" "}
          </div>
          <div className=" border-t border-[#313139] pt-2 flex justify-center items-center gap-1">
            <p className="text-xs text-gray-400 flex items-center gap-1 ">
              <Card3Icon /> Paid by virtual card
            </p>
          </div>
        </div>

        <div className="w-full text-sm flex-col bg-[#1E1F23] border border-[#313139] flex gap-1 rounded-md p-4 py-2 text-white">
          <p className="text-sm  ">
            GT VirtuPay 12156912407 Chowdecklang 003560
          </p>
          <p>683382003560 Зірg0001539983********9368</p>
        </div>

        <div className="w-full mt-4 bg-[#1E1F23] border border-[#313139] flex flex-col rounded-md p-4 py-2 text-white">
          <Link href="/merchant">
            <div className="w-full flex justify-between items-center gap-4 rounded-md p-2 text-white">
              <p className="text-sm  ">Manage online merchant</p>

              <div className="flex items-center gap-1 text-sm">
                {" "}
                Chowdeck <ChevronRight />
              </div>
            </div>
          </Link>

          <div className="w-full flex justify-between items-center gap-4 rounded-md p-2 text-white">
            <p className="text-sm  ">Report dispense error</p>

            <div className="flex items-center gap-1 text-sm">
              <ChevronRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
