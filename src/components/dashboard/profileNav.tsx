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
  ChartUPIcon,
  CreditCardIcon,
  LimitSettingsIcon,
} from "../icons/fix-color_type";
import { useUserStore } from "@/src/store/z-store/user";

interface Props {
  refetch?: () => void;
  next?: () => void;
  edit?: string;
  children?: React.ReactNode;
  onNavigate: (screen: string) => void;
}

export const ProfileNav = ({ children, edit, refetch, onNavigate }: Props) => {
  const router = useRouter();
  const [openForm, setOpenForm] = useState(false);
  const { signOut, user } = useUserStore();

  const maskEmail = (email: string) => {
    const [user, domain] = email.split("@");
    const first = user.charAt(0);
    const last4 = user.slice(-4);
    return `${first}****${last4}@${domain}`;
  };

  return (
    <div className="my-6 flex h-[90vh] w-full flex-col gap-6 overflow-y-scroll">
      <main className="px-5 pt-4 pb-2 space-y-6">
        <ArrowLeft onClick={() => onNavigate("home")} />
        <Header name={user?.firstName ?? ""} tier="Tier 3" />

        <button className="border-[#E15C42] whitespace-nowrap  h-10 border bg-[#392223] rounded-4xl  px-4 flex  gap-2 items-center justify-center hover:border-orange-500 transition-colors">
          <UserAddIcon className="text-orange-500 " />
          <span className="text-orange-500 text-md">Invite</span>
        </button>

        <SectionLabel label="FX rate" />

        <FXStatus message="At this moment, FX Sales is not available. FX rates and session status will appear as soon as it becomes accessible." />
        <SectionLabel label="Personal data" />
        <PersonalData
          fullName={user?.fullName ?? ""}
          phone={`+234******${user?.phoneNumber.slice(-4)}`}
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

export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <label className="text-[10px] text-gray-400 leading-[22px] tracking-[0px]">
      {label}
    </label>
  );
}
