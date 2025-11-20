import React, { useState } from "react";
import { ArrowLeftIcon, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type VirtualCardScreenProps = {
  onNavigate: (screen: string) => void;
};

export function VirtualCardScreen({ onNavigate }: VirtualCardScreenProps) {
  const [activeTab, setActiveTab] = useState<"virtual" | "physical">("virtual");

  return (
    <div className="flex-1 overflow-y-auto pb-16">
      <div className=" w-full relative flex items-center justify-center px-5 py-3 ">
        <div>
          <Image
            src="/images/createcard.png"
            alt="Virtual Card Banner"
            width={1000}
            height={1000}
          />
        </div>
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
    </div>
  );
}
