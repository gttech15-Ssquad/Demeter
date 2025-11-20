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
import { ConfirmationDrawer } from "../shared/confirmationDraawer";
import ConfirmPinDialog from "../shared/confirmPin";

interface Props {
  refetch?: () => void;
  next?: () => void;
  edit?: string;
  children?: React.ReactNode;
  onNavigate?: (screen: string) => void;
}

export const CardSettingsList = ({
  children,
  edit,
  refetch,
  onNavigate,
}: Props) => {
  const router = useRouter();
  const [openForm, setOpenForm] = useState(false);

  const [showPin, setShowPin] = useState(false);
  const [pendingAction, setPendingAction] = useState<() => void>(() => {});

  const openPinFor = (action: () => void) => {
    setPendingAction(() => action);
    setShowPin(true);
  };

  const [showFreezeConfirmation, setShowFreezeConfirmation] = useState(false);

  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  const handleFreezeConfirm = () => {
    openPinFor(() => {
      console.log("freeze card"), setShowFreezeConfirmation(false);
    });
  };

  const handleFreezeCancel = () => {
    setShowFreezeConfirmation(false);
  };

  const handleCancelConfirm = () => {
    openPinFor(() => {
      console.log("cancel card"), setShowCancelConfirmation(false);
    });
  };

  const handleCancelCardCancel = () => {
    setShowCancelConfirmation(false);
    setShowFreezeConfirmation(true);
  };

  const styledPhrase =
    '<span style="color: #E15C42; ">this action cannot be reversed</span>';

  return (
    <div className="mt-6 flex  w-full flex-col gap-6 overflow-y-scroll">
      <main className="px-5 pt-4 space-y-6">
        <DataItem
          onClick={() => router.push("/settings/limits")}
          Icon={LimitSettingsIcon}
          value=" Set transaction limits"
          label="set the transaction limits"
        />

        <DataItem
          Icon={LimitSettingsIcon}
          value="Manage card PIN"
          label="change your card PIN"
        />
        <DataItem
          onClick={() => setShowFreezeConfirmation(true)}
          Icon={LimitSettingsIcon}
          value="Freeze card"
          label="Temporarily disable this card"
        />
        <DataItem
          onClick={() => setShowCancelConfirmation(true)}
          Icon={LimitSettingsIcon}
          value="Cancel card"
          label="cancel and delete this card"
        />
      </main>

      <ConfirmPinDialog
        isOpen={showPin}
        onClose={() => setShowPin(false)}
        onSuccess={pendingAction}
      />

      <ConfirmationDrawer
        isOpen={showFreezeConfirmation}
        onClose={handleFreezeConfirm}
        cancelText=" Freeze this card"
        confirmText="Cancel"
        onConfirm={handleFreezeCancel}
        title={`Are you sure?`}
        message={`Freezing ${"My main virtual card"} will prevent all card payments and online subscriptions. Select “Freeze this card” to freeze the card or select "Cancel" to continue using your VirtuPay card without any issues. `}
        imageSrc="/images/areyousureimg.png"
      />

      <ConfirmationDrawer
        isOpen={showCancelConfirmation}
        onClose={handleCancelConfirm}
        cancelText=" Cancel this card"
        confirmText="Freeze instead"
        onConfirm={handleCancelCardCancel}
        title={`Are you sure?`}
        message={
          <>
            If My main virtual card is canceled, you will not be able to perform
            transactions with this card any more because{" "}
            <span style={{ color: "#E15C42" }}>
              this action cannot be reversed
            </span>
            .
          </>
        }
        imageSrc="/images/areyousureimg.png"
      />
    </div>
  );
};
