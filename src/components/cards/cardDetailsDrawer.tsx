// components/CardDetailsDrawer.tsx (Revised)
import React from "react";
import { CardDetails } from "./card-types";
import CardDetailItem from "./card-details-card";

interface CardDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  details: CardDetails;
  // NOTE: Ensure the parent component has 'relative' positioning in its CSS
}

const CardDetailsDrawer: React.FC<CardDetailsDrawerProps> = ({
  isOpen,
  onClose,
  details,
}) => {
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
          <CardDetailItem value={details.cardNumber} label="Card number" />
          <CardDetailItem
            value={details.accountNumber}
            label="Account number"
          />
          <CardDetailItem value={details.expiryDate} label="Expiry date" />
          <CardDetailItem value={details.cvv} label="CVV" />
        </div>
      </div>
    </>
  );
};

export default CardDetailsDrawer;
