import React, { useState } from "react";
import { ArrowLeftIcon, MoreHorizontalIcon } from "lucide-react";

type VirtualCardScreenProps = {
  onNavigate: (screen: string) => void;
};

export function VirtualCardScreen({ onNavigate }: VirtualCardScreenProps) {
  const [activeTab, setActiveTab] = useState<"virtual" | "physical">("virtual");

  return (
    <div className="flex-1 overflow-y-auto pb-16">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3">
        <button onClick={() => onNavigate("home")} className="p-1">
          <ArrowLeftIcon size={20} />
        </button>
        <div className="font-medium">GT VirtuPay</div>
        <div className="w-5"></div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 px-5">
        <button
          className={`flex-1 py-3 text-sm font-medium relative ${
            activeTab === "virtual" ? "text-white" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("virtual")}
        >
          Virtual Card
          {activeTab === "virtual" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
          )}
        </button>

        <button
          className={`flex-1 py-3 text-sm font-medium relative ${
            activeTab === "physical" ? "text-white" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("physical")}
        >
          Physical Card
          {activeTab === "physical" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
          )}
        </button>
      </div>

      {/* Card Display */}
      <div className="px-5 py-8">
        <div className="relative h-52 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-yellow-500 to-red-500">
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          <div className="absolute top-4 right-4 bg-orange-600 text-white text-xs px-2 py-1 rounded">
            GTBank
          </div>

          <div className="absolute bottom-8 left-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-5 bg-yellow-400 rounded"></div>
              <div className="w-8 h-5 bg-red-500 rounded-full"></div>
            </div>
            <div className="text-sm font-medium text-white">
              My main virtual card
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="px-5">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-2">
              <div className="w-6 h-6 bg-yellow-500 rounded"></div>
            </div>
            <span className="text-xs text-center">Card Details</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-2">
              <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
            </div>
            <span className="text-xs text-center">Card Settings</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-2">
              <div className="w-6 h-6 bg-yellow-500 flex items-center justify-center text-black font-bold">
                !
              </div>
            </div>
            <span className="text-xs text-center">Manage Dispute</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            </div>
            <span className="text-xs text-center">Change Card Design</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-2">
              <div className="w-6 h-6 bg-purple-500 rounded"></div>
            </div>
            <span className="text-xs text-center">Manage Online Merchant</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <MoreHorizontalIcon size={16} />
              </div>
            </div>
            <span className="text-xs text-center">Transactions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
