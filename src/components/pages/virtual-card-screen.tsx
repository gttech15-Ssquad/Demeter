import React, { useState } from "react";
import { ArrowLeftIcon, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { UserAddIcon } from "../icons/pack_1";
import {
  CardDesignIcon,
  CardDetailsIcon,
  CardMerchantIcon,
  CardSettingsIcon,
  CardTransactionsIcon,
  CreditCardIcon,
  FlashIcon,
  LockIcon,
  NewCardIcon,
  StoreIcon,
} from "../icons/fix-color_type";
import MyVirtualCard, { CardBackground } from "../cards/mycard";
import ConfirmPinDialog from "../shared/confirmPin";
import CardDetailsDrawer from "../cards/cardDetailsDrawer";
import { CardDetails } from "../cards/card-types";

type VirtualCardScreenProps = {
  onNavigate: (screen: string) => void;
};

export const cardBackgrounds: CardBackground[] = [
  {
    type: "gradient",
    value: "bg-gradient-to-br from-orange-500 via-yellow-500 to-red-500",
  },
  { type: "color", value: "#0f172a" },
  { type: "image", value: "/images/card1.png" },
];

const mockCardDetails: CardDetails = {
  cardNumber: "5594382937296482",
  accountNumber: "0718259676",
  expiryDate: "08/28",
  cvv: "021",
};
export function VirtualCardScreen({ onNavigate }: VirtualCardScreenProps) {
  const [activeTab, setActiveTab] = useState<"new" | "virtual">("new");

  const [showPin, setShowPin] = useState(false);
  const [pendingAction, setPendingAction] = useState<() => void>(() => {});

  const openPinFor = (action: () => void) => {
    setPendingAction(() => action);
    setShowPin(true);
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // const closePin = () => {
  //   setShowPin(false);
  // };

  const features = [
    { icon: FlashIcon, text: "Apply and activate instantly" },
    { icon: CreditCardIcon, text: "Faster online payments" },
    { icon: StoreIcon, text: "Works on all your favorite stores" },
    { icon: LockIcon, text: "Heavily secure" },
  ];

  const handleTabClick = (tab: "new" | "virtual") => {
    setActiveTab(tab);
  };

  if (activeTab === "new")
    return (
      <div className="flex-1 overflow-y-auto pb-2">
        <div className=" w-full relative flex items-center justify-center px-5 py-3 ">
          <div className="-mt-20 ml-12 ">
            <Image
              src="/images/createcard.png"
              alt="Virtual Card Banner"
              width={1000}
              height={1000}
            />
          </div>
        </div>

        {/* Card Display */}

        <div className="relative px-8 ">
          <div className="">
            <h2 className="text-white text-3xl font-bold leading-auto mr-2 ">
              Get your instant virtual debit card
            </h2>

            <ul className="list-none mt-4 p-0 m-0">
              {features.map((feature, index) => (
                <CardFeature
                  key={index}
                  Icon={feature.icon}
                  text={feature.text}
                />
              ))}
            </ul>

            <button
              onClick={() => setActiveTab("virtual")}
              className="w-full py-2 cursor-pointer text-white text-md font-semibold rounded-md transition duration-200 
                   bg-red-500 hover:bg-red-600 "
              style={{ backgroundColor: "#e5654a" }} // Applying the exact coral color
            >
              Create my virtual card
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex-1  overflow-x-hidden overflow-y-auto">
      {/* Card Display */}
      <div className="px-5 py-8">
        <MyVirtualCard
          background={cardBackgrounds[1]}
          cardHolder="Philip Toriola G "
        />

        <div className="text-sm font-medium flex justify-center text-white mt-5">
          My main virtual card
        </div>
      </div>

      {/* Card Actions */}
      <div className="px-2 mx-4  bg-[#1E1F23] rounded-md border border-[#313139] pt-4 text-gray-400">
        <div className="grid grid-cols-3 py-2  gap-4">
          <div
            onClick={() => openPinFor(() => setIsDrawerOpen(true))}
            className="flex flex-col  items-center"
          >
            <CardDetailsIcon className="cursor-pointer" />
            <span className="text-xs text-center">Card Details</span>
          </div>

          <Link href="/settings">
            <div className="flex flex-col items-center">
              <CardSettingsIcon />
              <span className="text-xs text-center">Card Settings</span>
            </div>
          </Link>

          <div className="flex flex-col items-center">
            <NewCardIcon />
            <span className="text-xs text-center"> Create New Card</span>
          </div>

          <div className="flex flex-col items-center">
            <CardDesignIcon />
            <span className="text-xs text-center">Change Card Design</span>
          </div>

          <Link href="/merchant">
            <div className="flex flex-col items-center">
              <CardMerchantIcon />
              <span className="text-xs text-center">
                Manage Online Merchant
              </span>
            </div>
          </Link>

          <div className="flex flex-col items-center">
            <Link href={"/transactions?id=123456"}>
              <CardTransactionsIcon />{" "}
            </Link>
            <span className="text-xs text-center">Transactions</span>
          </div>
        </div>
      </div>

      <ConfirmPinDialog
        isOpen={showPin}
        onClose={() => setShowPin(false)}
        onSuccess={pendingAction}
      />

      <CardDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        details={mockCardDetails}
      />
    </div>
  );
}

// CardFeature.tsx (Optional: a small component for the list items)
interface CardFeatureProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
}

const CardFeature: React.FC<CardFeatureProps> = ({ Icon, text }) => (
  <li className="flex items-center pb-4  text-white text-md">
    <span className="text-2xl mr-4 w-8 shrink-0 text-center">
      <Icon />
    </span>
    <span>{text}</span>
  </li>
);
