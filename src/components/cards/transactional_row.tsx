// import styles from "../../styles/transitionalRow.module.css";

// import React from "react";

// /**
//  * Interface defining the expected props for the TransactionRow component.
//  */
// interface TransactionRowProps {
//   transactionId: string;
//   type: string; // e.g., "Transfer"
//   amount: number;
//   destination: string; // e.g., "9676"
//   isCredit?: boolean; // True for deposit/credit (green), false for debit (optional)
// }

// const DoubleArrowIcon: React.FC = () => (
//   <svg className={styles.iconSvg} viewBox="0 0 24 24">
//     {/* Double arrow path used in the image */}
//     <path d="M12 4l-1.41 1.41L14.17 9H3v2h11.17l-3.58 3.59L12 17l6-6zM12 20l-1.41-1.41L14.17 13H3v-2h11.17l-3.58-3.59L12 5l6 6z" />
//   </svg>
// );

// const TransactionRow: React.FC<TransactionRowProps> = ({
//   transactionId,
//   type,
//   amount,
//   destination,
//   isCredit = true,
// }) => {
//   // Ensure amount is formatted to two decimal places
//   const [mainAmount, decimalAmount] = amount.toFixed(2).split(".");

//   // Determine the color based on whether it's a credit or debit
//   const amountColor = isCredit ? "#4CAF50" : "#FF5252"; // Green for credit, Red for debit

//   return (
//     <div className={styles.container}>
//       {/* 1. Left Icon Section */}
//       <div className={styles.iconContainer}>
//         <DoubleArrowIcon />
//       </div>

//       {/* 2. Center Text Section */}
//       <div className={styles.detailsContainer}>
//         <div className={styles.mainText}>{transactionId}</div>
//         <div className={styles.subText}>{type}</div>
//       </div>

//       {/* 3. Right Text Section */}
//       <div className={styles.amountContainer}>
//         <div className={styles.amountText} style={{ color: amountColor }}>
//           {isCredit ? "+" : "-"}
//           <span className={styles.nairaSymbol}>₦</span>
//           {mainAmount}
//           <span className={styles.decimal}>.{decimalAmount}</span>
//         </div>
//         <div className={styles.destinationText}>To • {destination}</div>
//       </div>
//     </div>
//   );
// };

// export default TransactionRow;

import React from "react";
import { TransactionalRowIcon } from "../icons/fix-color_type";

interface TransactionItemProps {
  dateLabel: string;
  transactionId: string;
  amount: number;
  type: string;
  toLastDigits: string;
}

export default function TransactionItem({
  dateLabel,
  transactionId,
  amount,
  type,
  toLastDigits,
}: TransactionItemProps) {
  return (
    <div className="w-full bg-[#1E1F23] rounded-xl p-4 text-white">
      {/* Date */}
      <p className="text-sm text-gray-400 mb-3">{dateLabel}</p>

      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-2">
          <TransactionalRowIcon />

          <div className="flex gap-2 flex-col">
            {/* Transaction ID */}
            <p className="text-sm max-w-48 truncate">{transactionId}</p>

            {/* Transfer label */}
            <span className="text-xs text-gray-500">{type}</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-2 items-end">
          {/* Amount */}
          <p className="text-sm text-green-500">
            + ₦{Math.floor(amount).toLocaleString()}
            <span className="text-xs ">.{amount.toFixed(2).split(".")[1]}</span>
          </p>

          {/* Destination */}
          <span className="text-xs text-gray-500">To • {toLastDigits}</span>
        </div>
      </div>
    </div>
  );
}
