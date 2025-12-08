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
import CardDetailsDrawer, { CardDetailsFull } from "../cards/cardDetailsDrawer";
import { CardDetails } from "../cards/card-types";
import { ToggleSelectItem } from "../shared/SelectToggle";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "@/src/utils";
import { endpoints } from "@/src/config/endpoints";
import { MerchantSetting, MerchantSettingsResponse } from "@/src/types/user";
import SpinnerOverlay from "../shared/spinner-overlay";
import { toast } from "sonner";
import { useUserStore } from "@/src/store/z-store/user";
type VirtualCardScreenProps = {
  onNavigate: (screen: string) => void;
  cardId: string;
};

export const cardBackgrounds: CardBackground[] = [
  {
    type: "gradient",
    value: "bg-gradient-to-br from-orange-500 via-yellow-500 to-red-500",
  },
  { type: "color", value: "#0f172a" },
  { type: "image", value: "/images/card1.png" },
];

export function MerchantManagementScreen({
  onNavigate,
  cardId,
}: VirtualCardScreenProps) {
  const { signOut, user } = useUserStore();
  const queryClient = useQueryClient();
  const [showPin, setShowPin] = useState(false);
  const [pendingAction, setPendingAction] = useState<() => void>(() => {});
  const {
    data: settingsRes,
    isFetching: isFetchingDetails,
    isError,
  } = useQuery({
    queryFn: () =>
      instance.get(`${endpoints().merchants.getCardSettings(cardId)}`),
    queryKey: ["v-cards-merchant-details", cardId],
  });

  // console.log(cardres);

  const vCardMerchant = settingsRes?.data as
    | MerchantSettingsResponse
    | undefined;
  const merchantSettings = vCardMerchant?.merchantSettings || [];

  const {
    data: cardres,
    isFetching: isFetchingCardDetails,
    refetch,
  } = useQuery({
    queryFn: () => instance.get(`${endpoints().cards.getFullDetails(cardId)}`),
    queryKey: ["v-cards-details", cardId],
  });

  console.log(cardres);

  const vCard = cardres?.data as CardDetailsFull | undefined;

  const toggleMerchantMutation = useMutation({
    mutationFn: ({
      merchantId,
      isEnabled,
    }: {
      merchantId: string;
      isEnabled: boolean;
    }) =>
      instance.post(
        `${endpoints().merchants.toggleSpecific(cardId, merchantId)}`
      ),
    onSuccess: (data, variables) => {
      // Invalidate the query to refetch the updated list
      queryClient.invalidateQueries({
        queryKey: ["v-cards-merchant-details", cardId],
      });
      toast.success(
        `${variables.isEnabled ? "Enabled" : "Disabled"} merchant successfully.`
      );
    },
    onError: (error) => {
      toast.error("Failed to update merchant status.");
    },
  });

  // 3. Handler for the Toggle Action (wraps the mutation with PIN confirmation)
  const handleToggle = (merchantId: string, currentStatus: boolean) => {
    // The action to be performed AFTER PIN confirmation
    const action = () => {
      toggleMerchantMutation.mutate({ merchantId, isEnabled: !currentStatus });
      setShowPin(false); // Close dialog after action is queued
    };

    // Set the action and open the PIN dialog
    setPendingAction(() => action);
    setShowPin(true);
  };

  // --- Render Logic ---

  if (isFetchingDetails) {
    return (
      <div className="flex-1 flex items-center justify-center text-white bg-[#121212]">
        <SpinnerOverlay />
      </div>
    );
  }

  if (isError || !vCardMerchant) {
    return (
      <div className="flex-1 p-5 text-red-500 bg-[#121212]">
        Failed to load merchant settings.
      </div>
    );
  }

  // const [showPin, setShowPin] = useState(false);
  // const [pendingAction, setPendingAction] = useState<() => void>(() => {});

  return (
    <div className="flex-1  overflow-x-hidden overflow-y-auto">
      {/* Card Display */}
      <div className="px-5 py-8">
        <MyVirtualCard
          background={cardBackgrounds[vCard?.designType || 0]}
          cardHolder={`${user?.firstName} ${user?.middleName?.charAt(0) || ""} ${user?.lastName}`}
          cardNumber={vCard?.cardNumberMasked}
        />

        <div className="text-sm font-medium flex justify-center text-white mt-5">
          My main virtual card
        </div>
      </div>

      {/* Card Actions */}
      <div className="px-2 mx-4 pt-4 text-gray-400">
        {/* <div className="space-y-4">
          <ToggleSelectItem
            iconSrc="/images/spotify.png"
            name="Spotify"
            description="Stream trending albums & songs, listen to podcasts & play the music you love."
            blocked
            enabled={true}
            onToggle={}
            requireConfirmation
          />
          <ToggleSelectItem
            iconSrc="/images/spotify.png"
            name="Spotify"
            description="Stream trending albums & songs, listen to podcasts & play the music you love. listen to podcasts & play the music you love."
            // blocked
            enabled={false}
            onToggle={}
            requireConfirmation
          />
          <ToggleSelectItem
            iconSrc="/images/spotify.png"
            name="Spotify"
            description="Stream trending albums & songs, listen to podcasts & play the music you love."
            // blocked
            enabled={true}
            onToggle={}
            requireConfirmation
          />

          <ToggleSelectItem
            iconSrc="/images/spotify.png"
            name="Spotify"
            description="Stream trending albums & songs, listen to podcasts & play the music you love. listen to podcasts & play the music you love."
            // blocked
            enabled={}
            onToggle={}
            requireConfirmation
          />
        </div> */}

        <div className="space-y-4">
          {merchantSettings.map((setting: MerchantSetting) => (
            <ToggleSelectItem
              key={setting.merchant.id}
              // iconSrc={getIconSrc(setting.merchant.code)}
              iconSrc="/images/spotify.png"
              name={setting.merchant.name}
              description={setting.merchant.description}
              enabled={setting.isEnabled}
              // Pass the toggle handler which is wrapped in PIN confirmation
              onToggle={() =>
                handleToggle(setting.merchant.id, setting.isEnabled)
              }
              requireConfirmation
              blocked={!setting.isEnabled}

              // // Optimistic update styling: Show spinner if this specific item is pending
              // isPending={toggleMerchantMutation.isPending &&
              //            (toggleMerchantMutation.variables as any)?.merchantId === setting.merchant.id}
            />
          ))}
        </div>
      </div>

      <ConfirmPinDialog
        isOpen={showPin}
        onClose={() => setShowPin(false)}
        onSuccess={pendingAction}
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
