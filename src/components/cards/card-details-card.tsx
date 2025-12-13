// components/CardDetailItem.tsx
import React from "react";
import { CopyIcon } from "../icons/pack_1";
import { toast } from "sonner";

interface CardDetailItemProps {
  label?: string; // Optional label for fields like 'Account number'
  value: string;
}

const CardDetailItem: React.FC<CardDetailItemProps> = ({ label, value }) => {
  // Simple copy function (can be integrated with a state notification system)
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.info("Copied to clipboard");
  };

  const showCopyIcon = !label || label.toLowerCase().includes("number"); // Show copy icon only for card/account numbers

  return (
    <div className="bg-transparent border border-[#313139] p-4 rounded-xl mb-4">
      <div className="flex justify-between items-center">
        {/* Value */}
        <span className="text-white text-xl font-medium tracking-wider">
          {value}
        </span>

        {/* Copy Icon */}
        {showCopyIcon && (
          <button
            onClick={handleCopy}
            className="text-[#E85D04] hover:text-orange-300 focus:outline-none"
            aria-label={`Copy ${label || "Card Number"}`}
          >
            <CopyIcon className="w-6 h-6 " />
          </button>
        )}
      </div>

      {/* Label/Subtext */}
      {label && (
        <span className="text-gray-500 text-sm block mt-1">{label}</span>
      )}
    </div>
  );
};

export default CardDetailItem;
