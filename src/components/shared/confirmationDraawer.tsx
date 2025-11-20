// import Image from "next/image";
// import React from "react";

// interface CardDetailsDrawerProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const ConfirmationDrawer: React.FC<CardDetailsDrawerProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   // 1. Backdrop uses 'absolute' positioning to cover the parent div
//   const backdropClass = isOpen
//     ? "absolute inset-0 bg-black/70 bg-opacity-10 transition-opacity duration-300 z-40"
//     : "hidden";

//   // 2. Drawer uses 'absolute' positioning, anchored to the parent's bottom edge
//   const drawerClass = `
//     absolute bottom-0 left-0 right-0 max-h-[80vh]
//     bg-[#1F2229] rounded-t-2xl shadow-2xl p-6 pt-4
//     transform transition-transform duration-300 ease-in-out
//     z-50
//     ${isOpen ? "translate-y-0" : "translate-y-full"}
//   `;

//   return (
//     <>
//       {/* Backdrop */}
//       <div className={backdropClass} onClick={onClose} aria-hidden={true} />

//       {/* Drawer Container */}
//       <div
//         className={drawerClass}
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="card-details-title"
//       >
//         <div className="flex justify-center mb-4">
//           <div className="w-12 h-1.5 bg-gray-700 rounded-full"></div>
//         </div>

//         <h3
//           id="card-details-title"
//           className="text-white text-2xl font-semibold mb-6"
//         >
//           Card details
//         </h3>

//         {/* Details List (max-height adjusted if needed, but relative max-h should work) */}
//         <div className="overflow-y-auto mr-2 max-h-[calc(80vh-100px)]">
//           <Image
//             src="/images/areyousureimg.png"
//             alt="confirmation illustration"
//             width={240}
//             height={240}
//             className="mx-auto mb-6"
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ConfirmationDrawer;

// ConfirmationDrawer.tsx
// import React from "react";
// import Image from "next/image";

// interface ConfirmationDrawerProps {
//   isOpen: boolean;
//   onClose: () => void; // Used for Cancel and Backdrop close
//   onConfirm: () => void; // The action to execute on Confirm
//   children: React.ReactNode;
//   title: string;
//   confirmText: string;
//   cancelText?: string; // Optional cancel button text
// }

// const ConfirmationDrawer: React.FC<ConfirmationDrawerProps> = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   children,
//   title,
//   confirmText,
//   cancelText = "Cancel", // Default cancel text
// }) => {
//   const handleConfirm = () => {
//     onConfirm(); // Execute the action passed from the parent
//     onClose(); // Close the drawer
//   };

//   // 1. Backdrop uses 'absolute' positioning to cover the parent div
//   const backdropClass = isOpen
//     ? "absolute inset-0 bg-black/70 bg-opacity-10 transition-opacity duration-300 z-40"
//     : "hidden";

//   // 2. Drawer uses 'absolute' positioning, anchored to the parent's bottom edge
//   const drawerClass = `absolute bottom-0 left-0 right-0 max-h-[80vh]
//     bg-[#1F2229] rounded-t-2xl shadow-2xl p-6 pt-4
//     transform transition-transform duration-300 ease-in-out
//     z-50
//     ${isOpen ? "translate-y-0" : "translate-y-full"}`;

//   return (
//     <>
//       {/* Backdrop */}
//       <div className={backdropClass} onClick={onClose} aria-hidden={true} />

//       {/* Drawer Container */}
//       <div
//         className={drawerClass}
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="confirmation-title"
//       >
//         <div className="flex justify-center mb-4">
//           <div className="w-12 h-1.5 bg-gray-700 rounded-full"></div>
//         </div>

//         <h3
//           id="confirmation-title"
//           className="text-white text-2xl font-semibold mb-6"
//         >
//           {title}
//         </h3>

//         {/* Content passed as children */}
//         <div className="overflow-y-auto mr-2 max-h-[calc(80vh-160px)]">
//           {children}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-4 mt-6">
//           <button
//             onClick={onClose}
//             className="w-1/2 py-3 bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-600 transition-colors"
//           >
//             {cancelText}
//           </button>
//           <button
//             onClick={handleConfirm}
//             className="w-1/2 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
//           >
//             {confirmText}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ConfirmationDrawer;

import Image from "next/image";
import React, { ReactNode, useState } from "react";

// Types
interface ConfirmationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: ReactNode;
  imageSrc?: string;
  confirmText?: string;
  cancelText?: string;
}

// Confirmation Drawer Component
export const ConfirmationDrawer: React.FC<ConfirmationDrawerProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "Please confirm your action",
  imageSrc = "/images/areyousureimg.png",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const backdropClass = isOpen
    ? "absolute inset-0 bg-black/70 bg-opacity-10 transition-opacity duration-300 z-40"
    : "hidden";

  const drawerClass = `absolute bottom-0 left-0 right-0 max-h-[80vh] 
    bg-[#1F2229] rounded-t-2xl shadow-2xl p-6 pt-4 
    transform transition-transform duration-300 ease-in-out 
    z-50
    ${isOpen ? "translate-y-0" : "translate-y-full hidden"}`;

  return (
    <>
      <div className={backdropClass} onClick={onClose} aria-hidden={true} />
      <div
        className={drawerClass}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
      >
        <div className="flex justify-center mb-4">
          <div className="w-12 h-1.5 bg-gray-700 rounded-full"></div>
        </div>

        <div className="overflow-y-auto mr-2 max-h-[calc(80vh-100px)]">
          <h3
            id="confirmation-title"
            className="text-white text-3xl font-semibold mb-3"
          >
            {title}
          </h3>

          <p className="text-gray-400 text-[14px] mb-8">{message}</p>
          <Image
            src={imageSrc}
            alt="confirmation illustration"
            width={240}
            height={240}
            className="mx-auto mb-6"
          />

          <div className="flex h-10 gap-3">
            <button
              onClick={onConfirm}
              className="flex-1  px-4 bg-[#1A1A1A]  text-white rounded-sm font-medium transition-colors"
            >
              {confirmText}
            </button>
            <button
              onClick={onClose}
              className="flex-1  px-4 bg-[#E15C42] text-white rounded-sm font-medium transition-colors"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
