// components/CardDetailsDrawer.tsx (Revised)
import React from "react";
import { CardDetails } from "./card-types";
import CardDetailItem from "./card-details-card";
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/src/utils";
import { endpoints } from "@/src/config/endpoints";
import { useUserStore } from "@/src/store/z-store/user";

interface CardDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  details?: CardDetails;
  cardId: string;
  // NOTE: Ensure the parent component has 'relative' positioning in its CSS
}

const CardDetailsDrawer: React.FC<CardDetailsDrawerProps> = ({
  isOpen,
  onClose,
  details,
  cardId,
}) => {
  const {
    data: cardres,
    isFetching: isFetchingDetails,
    refetch,
  } = useQuery({
    queryFn: () => instance.get(`${endpoints().cards.getFullDetails(cardId)}`),
    queryKey: ["v-cards-details", cardId],
  });
  const { signOut, user } = useUserStore();
  console.log(cardres);

  const vCard = cardres?.data as CardDetailsFull | undefined;
  // const cards = vCards || [];
  // console.log(vCards);

  // 1. Backdrop uses 'absolute' positioning to cover the parent div
  const backdropClass = isOpen
    ? "absolute inset-0 bg-black/70 bg-opacity-10 transition-opacity duration-300 z-40"
    : "hidden";

  // 2. Drawer uses 'absolute' positioning, anchored to the parent's bottom edge
  const drawerClass = `
    absolute bottom-0 left-0 right-0 max-h-[80vh] 
    bg-[#1F2229] rounded-t-2xl shadow-2xl p-6 pt-4 
    transform transition-transform duration-300 ease-in-out 
    z-50
    ${isOpen ? "translate-y-0" : "translate-y-full hidden"}
  `;

  return (
    <>
      {/* Backdrop */}
      <div className={backdropClass} onClick={onClose} aria-hidden={true} />

      {/* Drawer Container */}
      <div
        className={drawerClass}
        role="dialog"
        aria-modal="true"
        aria-labelledby="card-details-title"
      >
        <div className="flex justify-center mb-4">
          <div className="w-12 h-1.5 bg-gray-700 rounded-full"></div>
        </div>

        <h3
          id="card-details-title"
          className="text-white text-2xl font-semibold mb-6"
        >
          Card details
        </h3>

        {/* Details List (max-height adjusted if needed, but relative max-h should work) */}
        <div className="overflow-y-auto mr-2 max-h-[calc(80vh-100px)]">
          {/* ... CardDetailItem components here ... */}
          <CardDetailItem value={vCard?.cardNumber ?? ""} label="Card number" />
          <CardDetailItem value={String(1234567)} label="Account number" />
          <CardDetailItem
            value={`${vCard?.expiryMonth}/${String(vCard?.expiryYear).slice(-2)} `}
            label="Expiry date"
          />
          <CardDetailItem value={String(vCard?.cvv)} label="CVV" />
        </div>
      </div>
    </>
  );
};

export default CardDetailsDrawer;

/**
 * Interface for the detailed response of a single virtual or physical card.
 */
export interface CardDetailsFull {
  id: string;
  cardNumber: string; // The full, unmasked card number (sensitive)
  cardNumberMasked: string; // Masked card number for display
  expiryMonth: number;
  expiryYear: number;
  cvv: string; // Card Verification Value (sensitive)
  isFrozen: boolean;
  isCancelled: boolean;
  createdAt: string; // ISO 8601 string
  cardToken: string; // A unique token for API operations
  designType: number;
  transactionLimitMinorUnits: number; // Transaction limit in the smallest currency unit (e.g., cents)
}
