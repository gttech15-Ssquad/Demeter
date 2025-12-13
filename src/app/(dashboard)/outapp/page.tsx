"use client";

import React, { useState, FC } from "react";
// Assuming these icons are installed and imported correctly (e.g., from 'lucide-react')
import { LayoutDashboard, Wallet, CreditCard, LucideIcon } from "lucide-react";
import { DepositPage } from "@/src/components/demos/depdemo";
import { CardPaymentPage } from "@/src/components/demos/paydemo";

// --- 1. Define Types ---

// Define a type for the possible active views
type ActiveView = "deposit" | "card-payment";

// Define the Props interface for the HeaderButton component
interface HeaderButtonProps {
  icon: LucideIcon; // Use LucideIcon type for the icon component
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

// --- 2. Dummy Components (The content rendered conditionally) ---

const Deposit: FC = () => <DepositPage />;

const CardPayment: FC = () => <CardPaymentPage />;

// --- 3. Helper Component for the Navigation Buttons ---

// Use the FC (Functional Component) type alias and pass the props interface
const HeaderButton: FC<HeaderButtonProps> = ({
  icon: Icon,
  children,
  isActive,
  onClick,
}) => {
  const baseClasses =
    "flex items-center space-x-1.5 py-2 px-3 rounded-md text-sm font-medium transition duration-150 ease-in-out";
  const activeClasses = "bg-blue-50 text-blue-600 hover:bg-blue-100";
  const inactiveClasses =
    "text-slate-500 hover:text-slate-700 hover:bg-slate-50";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </button>
  );
};

// --- 4. Main Component ---

const DashboardHeader: FC = () => {
  // Use <ActiveView> to explicitly type the state
  const [activeView, setActiveView] = useState<ActiveView>("deposit");

  return (
    <>
      {/* Header Bar */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
            </div>

            {/* Navigation Buttons (Replacing NavLink) */}
            <nav className="flex space-x-2">
              <HeaderButton
                icon={Wallet}
                isActive={activeView === "deposit"}
                // The argument to setActiveView must be of type ActiveView
                onClick={() => setActiveView("deposit")}
              >
                Deposit
              </HeaderButton>

              <HeaderButton
                icon={CreditCard}
                isActive={activeView === "card-payment"}
                onClick={() => setActiveView("card-payment")}
              >
                Card Payment
              </HeaderButton>
            </nav>
          </div>
        </div>
      </header>

      {/* Content Area - Conditional Rendering */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {/* Conditional rendering based on the activeView state */}
        {activeView === "deposit" && <Deposit />}
        {activeView === "card-payment" && <CardPayment />}
      </main>
    </>
  );
};

export default DashboardHeader;
