"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, UserPlus, X } from "lucide-react";
import { Filter, ListFilter, MoreHorizontal, Plus } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Header from "../profilenav/header";
import FXStatus from "../profilenav/fxstatus";
import PersonalData, { DataItem } from "../profilenav/personaldetails";
import NavigationRow from "../profilenav/navigationrow";
import Limits from "../profilenav/limits";
import { UserAddIcon } from "../icons/pack_1";
import {
  Card2Icon,
  ChartUPIcon,
  CreditCardIcon,
  LimitSettingsIcon,
} from "../icons/fix-color_type";

import { Transaction, TransactionGroup } from "@/src/types/transaction";

interface Props {
  refetch?: () => void;
  next?: () => void;
  edit?: string;
  children?: React.ReactNode;
  onNavigate?: (screen: string) => void;
}

export const TransactionHistory = ({
  children,
  edit,
  refetch,
  onNavigate,
}: Props) => {
  const router = useRouter();
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="my-6 flex h-[90vh] w-full flex-col gap-6 overflow-y-scroll">
      <main className="px-5 pt-4 pb-2 space-y-6">
        <Header name="Philip" tier="Tier 3" />

        <button className="border-[#E15C42] whitespace-nowrap  h-10 border bg-[#392223] rounded-4xl  px-4 flex  gap-2 items-center justify-center hover:border-orange-500 transition-colors">
          <UserAddIcon className="text-orange-500 " />
          <span className="text-orange-500 text-md">Invite</span>
        </button>

        <SectionLabel label="FX rate" />

        <FXStatus message="At this moment, FX Sales is not available. FX rates and session status will appear as soon as it becomes accessible." />
        <SectionLabel label="Personal data" />
        <PersonalData
          fullName="Philip Gbounmi Toriola"
          phone="+234******2250"
          email="P******2@GMAIL.COM"
        />
        <SectionLabel label="Card" />
        <Link href="/cards">
          <DataItem Icon={CreditCardIcon} value="Manage Your Cards" />
        </Link>

        <SectionLabel label="Link external accounts" />

        <DataItem Icon={ChartUPIcon} value="Link GTFM account" />

        <SectionLabel label="Settings" />
        <DataItem
          Icon={LimitSettingsIcon}
          value="Limits"
          label="overview of transaction limits"
        />
      </main>
    </div>
  );
};

interface SectionLabelProps {
  label: string;
}

function SectionLabel({ label }: SectionLabelProps) {
  return (
    <label className="text-[10px] text-gray-400 leading-[22px] tracking-[0px]">
      {label}
    </label>
  );
}

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
}) => {
  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(transaction.amount_ngn);

  return (
    <div className="flex justify-between items-center py-3">
      {/* Left Side: Icon and Details */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-[#1E1F23] border border-[#313139] rounded-full flex items-center justify-center">
          <Card2Icon />
        </div>

        {/* Text Details */}
        <div className="flex flex-col">
          <span className="text-white text-sm ">{transaction.description}</span>
          <span className="text-[#A1A1A1] text-xs">{transaction.type}</span>
        </div>
      </div>

      {/* Right Side: Amount and Source */}
      <div className="flex flex-col items-end">
        <span className="text-white text-sm">
          - ₦{Math.floor(transaction.amount_ngn).toLocaleString()}
          <span className="text-xs ">
            .{transaction.amount_ngn.toFixed(2).split(".")[1]}
          </span>
        </span>
        <span className="text-[#A1A1A1] text-xs">
          {`From • ${transaction.source}`}
        </span>
      </div>
    </div>
  );
};

// components/TransactionList.tsx

interface TransactionListProps {
  groups: TransactionGroup[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ groups }) => {
  return (
    <div className="w-full max-w-md  p-4 ">
      {groups.map((group, groupIndex) => (
        <div key={group.date} className="mb-4">
          {/* Date Heading */}
          <h3 className="text-gray-400 text-xs font-normal mb-3 mt-4">
            {group.date}
          </h3>

          {/* List of Transactions for this date */}
          <div className="flex flex-col divide-y divide-gray-800">
            {group.transactions.map((transaction, index) => (
              <Link
                key={transaction.id + index}
                href={`/transactions/${transaction.id}`}
              >
                <TransactionItem
                  key={transaction.id + index}
                  transaction={transaction}
                />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
