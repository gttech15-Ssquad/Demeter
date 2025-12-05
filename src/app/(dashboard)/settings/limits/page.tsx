"use client";

import { useState } from "react";
import { ArrowLeft, Delete } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ConfirmPinDialog from "@/src/components/shared/confirmPin";
import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "@/src/utils";
import { endpoints } from "@/src/config/endpoints";
import { CardDetailsFull } from "@/src/components/cards/cardDetailsDrawer";
import { HttpError } from "@/src/types/common";
import { toast } from "sonner";

export default function Page() {
  const searchParams = useSearchParams();

  const cardId = searchParams.get("card") ?? "";

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
  const [rawAmount, setRawAmount] = useState(
    `${vCard?.transactionLimitMinorUnits ?? 0}`
  );
  const [showKeypad, setShowKeypad] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [pendingAction, setPendingAction] = useState<() => void>(() => {});

  const { isPending, mutateAsync: setLimitMutateAsync } = useMutation({
    mutationFn: (payload: { limitMinorUnits: number }) =>
      instance.post(`${endpoints().cards.setLimit(cardId)}`, payload),
    mutationKey: ["v-cards_limit"],
    onSuccess: ({ data }) => {
      router.push(`/settings?card=${cardId}`);
      console.log(data);
      const message = data.message;

      toast.success(message);
    },
    onError: ({ response }: HttpError) => {
      const { message } = response.data;
      typeof message === "string"
        ? toast.error(message)
        : toast.error(message[0]);
    },
  });

  const openPinFor = (action: () => void) => {
    setPendingAction(() => action);
    setShowPin(true);
  };

  const router = useRouter();

  const formatCurrency = (value: string) => {
    if (!value) return "₦0.00";

    const num = parseInt(value, 10);
    return "₦" + num.toLocaleString("en-NG", { minimumFractionDigits: 2 });
  };

  const handleDigitPress = (digit: string) => {
    setRawAmount((prev) => prev + digit);
  };

  const handleDelete = () => {
    setRawAmount((prev) => prev.slice(0, -1));
  };

  const handleSetLimit = () => {
    openPinFor(() => {
      console.log("Transaction limit set to:", formatCurrency(rawAmount));
      setShowKeypad(false);
      const payload = {
        limitMinorUnits: Number(rawAmount),
      };
      setLimitMutateAsync(payload);
      // router.push(`/settings?card=${cardId}`);
    });
  };

  return (
    <div className="min-h-[95vh] bg-[#0E0E0E] text-white flex flex-col px-4 pt-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link className="cursor-pointer" href="/settings">
          {" "}
          <button className="p-2">
            <ArrowLeft size={22} color="white" />
          </button>{" "}
        </Link>

        <h1 className="text-xl font-semibold">Set transaction limit</h1>
      </div>

      {/* Card Info */}
      <div className="bg-[#1A1A1A] rounded-lg p-4 ">
        <p className="text-sm opacity-70">My main virtual card</p>

        <div className="  flex items-center justify-between">
          <span className="text-xs opacity-40">Current limit</span>
          <input
            onClick={() => setShowKeypad(true)}
            value={formatCurrency(rawAmount ?? 0)}
            className=" text-right bg-transparent outline-none font-semibold"
            style={{ caretColor: "white" }}
          />
        </div>

        <p className="text-xs opacity-40 ">Allowed limit ₦5,000,000</p>
      </div>

      <div
        className={`transition-all duration-300 ${
          showKeypad ? "mt-40" : "mt-auto mb-6"
        }`}
      >
        <button
          disabled={!rawAmount || isPending}
          onClick={() => handleSetLimit()}
          className=" w-[172px] h-[39px] bg-[#E15C42] ml-auto flex items-center justify-center rounded-lg text-center font-semibold text-white"
        >
          Set limit
        </button>
      </div>

      {/* Numeric Keypad */}
      {showKeypad && (
        <div className="absolute bottom-0 left-0 right-0 bg-[#1A1A1A] p-5 grid grid-cols-3 gap-2">
          {[
            { digit: "1", base: "abc" },
            { digit: "2", base: "abc" },
            { digit: "3", base: "abc" },
            { digit: "4", base: "abc" },
            { digit: "5", base: "abc" },
            { digit: "6", base: "abc" },
            { digit: "7", base: "abc" },
            { digit: "8", base: "abc" },
            { digit: "9", base: "abc" },
          ].map((digit) => (
            <button
              key={digit.digit}
              onClick={() => handleDigitPress(digit.digit)}
              className="bg-[#2A2A2A] flex flex-col cursor-pointer  py-2 rounded-md "
            >
              <span className="text-sm">{digit.digit}</span>
              <span className="text-xs"> {digit.base}</span>
            </button>
          ))}

          <div></div>

          <button
            onClick={() => handleDigitPress("0")}
            className="bg-[#2A2A2A] flex flex-col cursor-pointer  py-2 rounded-md "
          >
            0
          </button>
          {/* Delete */}
          <button
            onClick={handleDelete}
            className=" py-4 rounded-lg flex cursor-pointer justify-center items-center"
          >
            <Delete size={20} />
          </button>

          <ConfirmPinDialog
            isOpen={showPin}
            onClose={() => setShowPin(false)}
            onSuccess={pendingAction}
          />
        </div>
      )}
    </div>
  );
}
