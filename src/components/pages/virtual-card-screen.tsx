import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeftIcon,
  ChevronLeft,
  ChevronRight,
  Info,
  MoreHorizontalIcon,
} from "lucide-react";
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
import MyVirtualCard, { CardBackground, ViewCards } from "../cards/mycard";
import ConfirmPinDialog from "../shared/confirmPin";
import CardDetailsDrawer from "../cards/cardDetailsDrawer";
import { CardDetails } from "../cards/card-types";
import { useUserStore } from "@/src/store/z-store/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "@/src/utils";
import { endpoints } from "@/src/config/endpoints";
import { AxiosInterceptorManager } from "axios";
import { HttpError } from "@/src/types/common";
import { toast } from "sonner";
import CreatePinDialog from "../shared/createPin";
import { AccountProps, Card, CardListResponse } from "@/src/types/user";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Spinner } from "@/components/ui/spinner";
import SpinnerOverlay from "../shared/spinner-overlay";
import CardLockedNotice from "../cards/unfreezedialog";
import { useRouter } from "next/router";

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

// const mockCardDetails: CardDetails = {
//   cardNumber: "5594382937296482",
//   accountNumber: "0718259676",
//   expiryDate: "08/28",
//   cvv: "021",
// };

export function VirtualCardScreen({ onNavigate }: VirtualCardScreenProps) {
  const { signOut, user } = useUserStore();
  const [activeTab, setActiveTab] = useState<
    "new" | "virtual" | "create" | "updateDesign"
  >("new");
  // const [activeCardIndex, setActiveCardIndex] = useState(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<any | null>(null);
  // const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  // const [api, setApi] = useState(null);

  // useEffect(() => {
  //   // TypeScript now knows that if 'api' is NOT null, it MUST be EmblaCarouselType
  //   if (!api) {
  //     return;
  //   }

  //   // Now, 'api.on' is correctly recognized as a method on EmblaCarouselType
  //   api.on("select", () => {
  //     const newIndex = api.selectedScrollSnap();
  //     setActiveCardIndex(newIndex);
  //   });

  //   return () => {
  //     // Safe check for cleanup
  //     api.off("select");
  //   };
  // }, [api, setActiveCardIndex]);

  // useEffect(() => {
  //   if (!api) return;
  //   const onSelect = () => setActiveIndex(api.selectedScrollSnap());
  //   api.on("select", onSelect);
  //   return () => api.off("select", onSelect);
  // }, [api]);
  useEffect(() => {
    if (!api) return;

    const update = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", update);
    update();

    return () => api.off("select", update);
  }, [api]);

  const {
    data: cardres,
    isFetching: isFetchingCards,
    refetch,
  } = useQuery({
    queryFn: () => instance.get(`${endpoints().cards.listAll}`),
    queryKey: ["v-cards", user?.userId],
  });

  const vCards = cardres?.data as CardListResponse | undefined;
  const cards = vCards?.cards || [];

  // useEffect(() => {
  //   if (cardres?.data) {
  //     const vCards = cardres.data as CardListResponse;
  //     setCards(vCards.cards);
  //   }
  // }, [cardres]);

  useEffect(() => {
    if (cards && cards.length > 0) {
      setActiveTab("virtual");
    }
  }, [cards]);

  // const activeCard = cards[activeCardIndex];

  console.log(cards);

  const { isPending: unfreezePending, mutateAsync: unfreezeCardMutateAsync } =
    useMutation({
      mutationFn: (cardId: string) =>
        instance.post(`${endpoints().cards.unfreeze(cardId)}`),
      mutationKey: ["v-cards_unfreeze"],
      onSuccess: ({ data }) => {
        refetch();
        console.log(data);
        const message = data.message;

        toast.success(message);
      },
      onError: ({ response }: HttpError) => {
        const { message } = response.data;
        typeof message === "string"
          ? toast.error(message)
          : toast.error(message[0]);
      },
    });

  const [showPin, setShowPin] = useState(false);
  const [pendingAction, setPendingAction] = useState<() => void>(() => {});

  const openPinFor = (action: () => void) => {
    setPendingAction(() => action);
    setShowPin(true);
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const features = [
    { icon: FlashIcon, text: "Apply and activate instantly" },
    { icon: CreditCardIcon, text: "Faster online payments" },
    { icon: StoreIcon, text: "Works on all your favorite stores" },
    { icon: LockIcon, text: "Heavily secure" },
  ];

  const handleTabClick = (
    tab: "new" | "virtual" | "create" | "updateDesign"
  ) => {
    setActiveTab(tab);
  };

  if (isFetchingCards) {
    return (
      <div className="p-5 text-white">
        <SpinnerOverlay />
      </div>
    );
  }

  if (activeTab === "new" || (activeTab === "virtual" && cards.length === 0))
    return (
      <div className="flex-1 overflow-y-auto pb-2">
        <div className=" w-full relative flex items-center justify-center px-5 py-3 ">
          <div className="-mt-20 ml-12 ">
            <img
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
              onClick={() => handleTabClick("create")}
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

  if (activeTab === "create") {
    return (
      <CreateVirtualCardScreen
        onNext={() => {
          (refetch(), handleTabClick("virtual"));
        }}
        onBack={() => handleTabClick("virtual")}
      />
    );
  }

  if (activeTab === "updateDesign") {
    return (
      <ChangeCardDesign
        onNext={() => {
          (refetch(), handleTabClick("virtual"));
        }}
        onBack={() => handleTabClick("virtual")}
        cardId={selectedCard?.id || ""}
        currentDesign={selectedCard?.designType ?? 0}
      />
    );
  }

  const { data: dashaccount, isFetching: isFetchingAcct } = useQuery({
    queryFn: () => instance.get(`${endpoints().accounts.getBalance}`),
    queryKey: ["useraccount"],
  });

  const dashAccount = dashaccount?.data as AccountProps;

  return (
    <div className="flex-1  overflow-x-hidden overflow-y-auto">
      {/* <div className="px-5 py-8">
        <MyVirtualCard
          background={cardBackgrounds[2]}
          cardHolder={`${user?.firstName} ${user?.middleName.charAt(0)}  ${user?.lastName} `}
        />

        <div className="text-sm font-medium flex justify-center text-white mt-5">
          My main virtual card
        </div>
      </div> */}

      {cards && cards.length > 0 && (
        <Carousel
          opts={{ loop: false, align: "start" }}
          setApi={(inst) => {
            if (!inst) return;
            setApi(inst);
          }}
        >
          <CarouselContent>
            {cards.map((card, index) => (
              <CarouselItem key={card.id}>
                <div className="px-5 py-8">
                  <MyVirtualCard
                    background={cardBackgrounds[card.designType || 0]}
                    cardHolder={`${user?.firstName} ${user?.middleName?.charAt(0) || ""} ${user?.lastName}`}
                    cardNumber={card.cardNumberMasked}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        // <Carousel
        //   opts={{ loop: false, align: "start" }}
        //   setApi={(api) => {
        //     if (!api) return;
        //     api.on("select", () => {
        //       setActiveIndex(api.selectedScrollSnap());
        //     });
        //   }}
        // >
        //   <CarouselContent>
        //     {cards.map((card, index) => (
        //       <CarouselItem key={card.id}>
        //         <div className="px-5 py-8">
        //           <MyVirtualCard
        //             background={cardBackgrounds[card.designType ?? 2]}
        //             cardHolder={`${user?.firstName} ${user?.middleName?.charAt(0)} ${user?.lastName}`}
        //             cardNumber={card.cardNumberMasked}
        //             // expiry={card.expiry}
        //           />

        //           <div className="text-sm font-medium flex justify-center text-white mt-5">
        //             {index === activeIndex
        //               ? "My main virtual card"
        //               : "Virtual card"}
        //           </div>
        //         </div>
        //       </CarouselItem>
        //     ))}
        //   </CarouselContent>
        //   <CarouselPrevious />
        //   <CarouselNext />
        // </Carousel>
      )}

      <div>
        {cards.length > 1 && (
          <div className="flex justify-between mt-6 px-4">
            {/* Prev button: hides at index 0 */}
            {activeIndex > 0 ? (
              <button
                onClick={() => api?.scrollPrev()}
                className="text-white text-sm px-3 py-1 bg-[#26272b]/40 rounded-full"
              >
                <ChevronLeft />
              </button>
            ) : (
              <div />
            )}

            {/* Next button: hides at last index */}
            {activeIndex < cards.length - 1 ? (
              <button
                onClick={() => api?.scrollNext()}
                className="text-white text-sm px-3 py-1 bg-[#26272b]/40 rounded-full"
              >
                <ChevronRight />
              </button>
            ) : (
              <div />
            )}
          </div>
        )}

        <div className="text-sm font-medium flex justify-center text-white -mt-5">
          My main virtual card {selectedCard?.designType}
        </div>
      </div>
      {cards[activeIndex].isFrozen && (
        <div className="px-6 mt-4 py-4">
          <CardLockedNotice
            onUnfreeze={() =>
              openPinFor(() => {
                (setSelectedCard(cards[activeIndex]),
                  unfreezeCardMutateAsync(cards[activeIndex].id));
              })
            }
          />
        </div>
      )}
      {/* Card Actions */}
      <div className="px-2 mx-4 mt-8 bg-[#1E1F23] rounded-md border border-[#313139] pt-4 text-gray-400">
        <div className="grid grid-cols-3 py-2  gap-4">
          <div
            // onClick={() => openPinFor(() => setIsDrawerOpen(true))}
            onClick={() =>
              openPinFor(() => {
                setSelectedCard(cards[activeIndex]);
                setIsDrawerOpen(true);
              })
            }
            className="flex flex-col  items-center"
          >
            <CardDetailsIcon className="cursor-pointer" />
            <span className="text-xs text-center">Card Details</span>
          </div>

          {/* <Link href="/settings">
           */}
          <Link href={`/settings?card=${cards[activeIndex]?.id}`}>
            <div className="flex flex-col items-center">
              <CardSettingsIcon />
              <span className="text-xs text-center">Card Settings</span>
            </div>
          </Link>

          <div className="flex flex-col items-center">
            <NewCardIcon
              className="cursor-pointer"
              onClick={() => setActiveTab("create")}
            />
            <span className="text-xs text-center"> Create New Card</span>
          </div>

          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              (setSelectedCard(cards[activeIndex]),
                setActiveTab("updateDesign"));
            }}
          >
            <CardDesignIcon className="" />
            <span className="text-xs text-center">Change Card Design</span>
          </div>

          <Link href={`/merchant?card=${cards[activeIndex]?.id}`}>
            <div className="flex flex-col items-center">
              <CardMerchantIcon />
              <span className="text-xs text-center">
                Manage Online Merchant
              </span>
            </div>
          </Link>

          <div className="flex flex-col items-center">
            <Link href={`/transactions?card=${cards[activeIndex]?.id}`}>
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

      {/* <CardDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        details={mockCardDetails}
      /> */}
      <CardDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        // details={mockCardDetails}
        accountNumber={dashAccount.accountNumber ?? " "}
        cardId={selectedCard?.id || ""}
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

function CreateVirtualCardScreen({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [cardName, setCardName] = useState("");
  const [cardNewPin, setCardNewPin] = useState("");
  const [selectedDesign, setSelectedDesign] = useState<number>(0);

  const [showCreatePin, setShowCreatePin] = useState(false);
  const [pendingAction, setPendingAction] = useState<(pin: string) => void>(
    () => {}
  );

  const openPinFor = (action: (pin?: string) => void) => {
    setPendingAction(() => action);
    setShowCreatePin(true);
  };

  const { isPending, mutateAsync: createmutateAsync } = useMutation({
    mutationFn: (payload: {
      cardName: string;
      cardPin: string;
      designType: number;
    }) => instance.post(`${endpoints().cards.createVirtualCard}`, payload),
    mutationKey: ["v-cards"],
    onSuccess: ({ data }) => {
      onNext();
      console.log("check here form");
      console.log(data);

      // toast.success(message);
    },
    onError: ({ response }: HttpError) => {
      const { message } = response.data;
      typeof message === "string"
        ? toast.error(message)
        : toast.error(message[0]);
    },
  });

  const handleCreateCard = (pin?: string) => {
    if (pin) {
      const payload = {
        cardName,
        cardPin: pin,
        designType: selectedDesign,
      };
      createmutateAsync(payload);
    }
  };
  // Style adjustments to match the black background and white text from the image
  return (
    <div className="flex-1 flex flex-col bg-black text-white">
      {/* Header */}
      <div className="flex items-center p-4">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeftIcon className="w-6 h-6 text-white" />
        </button>
        <h1 className="flex-1 text-center text-xl font-bold -translate-x-3">
          Create Virtual Card
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        <div className="w-full bg-[#1E1F23] rounded-md border border-[#313139] p-4 mb-4 text-gray-400">
          <Info className="w-5 h-5 " />

          <div className="flex flex-col  l mt-2 justify-between text-[11px] leading-[22px] tracking-[0px]">
            <p className="">
              You can create <span className="text-white">1</span> virtual card
              for free.
            </p>
            <p className="">
              You can add up to <span className="text-white">2</span> more cards
              for <span className="text-white">₦1,000</span> each.
            </p>
          </div>
        </div>

        {/* Card Name Input */}
        <h2 className="text-lg font-semibold mb-2">Card name</h2>
        <input
          type="text"
          placeholder="Enter card name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          className="w-full bg-[#1E1F23] text-white border border-[#313139] p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-6"
        />

        {/* Card Design Selection */}
        <h2 className="text-lg font-semibold mb-4">Choose a card design</h2>
        <div className="grid grid-cols-2 gap-4">
          {[0, 1, 2].map((design) => (
            <div
              key={design}
              onClick={() => setSelectedDesign(design)}
              className={`${selectedDesign === design && "border-4 border-[#E15C42] "} cursor-pointer rounded-xl`}
            >
              <ViewCards background={cardBackgrounds[design]} cardHolder={""} />
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="p-5">
        <button
          disabled={!cardName}
          // onClick={() => openPinFor(() => handleCreateCard())}
          onClick={() => openPinFor((pin) => handleCreateCard(pin))}
          className="w-full py-3 cursor-pointer text-white text-md font-semibold rounded-md transition duration-200"
          style={{ backgroundColor: "#e5654a" }}
        >
          Set your card PIN
        </button>
      </div>

      <CreatePinDialog
        isOpen={showCreatePin}
        setNewPin={setCardNewPin}
        onClose={() => setShowCreatePin(false)}
        // onSuccess={pendingAction}
        onSuccess={(pin) => {
          pendingAction(pin);
          // setShowCreatePin(false)
        }}
      />
    </div>
  );
}

function ChangeCardDesign({
  onBack,
  onNext,
  cardId,
  currentDesign,
}: {
  onBack: () => void;
  onNext: () => void;
  cardId: string;
  currentDesign: number;
}) {
  const [selectedDesign, setSelectedDesign] = useState<number>(0);

  console.log(cardId);

  const [showCreatePin, setShowCreatePin] = useState(false);
  const [pendingAction, setPendingAction] = useState<() => void>(() => {});

  const openPinFor = (action: () => void) => {
    setPendingAction(() => action);
    setShowCreatePin(true);
  };

  const { isPending, mutateAsync: createmutateAsync } = useMutation({
    mutationFn: (payload: { designType: number }) =>
      instance.patch(`${endpoints().cards.updateDesign(cardId)}`, payload),
    mutationKey: ["v-cards"],
    onSuccess: ({ data }) => {
      onNext();
      console.log(data);

      // toast.success(message);
    },
    onError: ({ response }: HttpError) => {
      const { message } = response.data;
      typeof message === "string"
        ? toast.error(message)
        : toast.error(message[0]);
    },
  });

  const handleDesignChange = () => {
    const payload = {
      designType: selectedDesign,
    };
    createmutateAsync(payload);
  };
  // Style adjustments to match the black background and white text from the image
  return (
    <div className="flex-1 flex flex-col bg-black text-white">
      {/* Header */}
      <div className="flex items-center p-4">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeftIcon className="w-6 h-6 text-white" />
        </button>
        <h1 className="flex-1 text-center text-xl font-bold -translate-x-3">
          Change Virtual Card Design
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        {/* <div className="w-full bg-[#1E1F23] rounded-md border border-[#313139] p-4 mb-4 text-gray-400">
          <Info className="w-5 h-5 " />

          <div className="flex flex-col  l mt-2 justify-between text-[11px] leading-[22px] tracking-[0px]">
            <p className="">
              You can create <span className="text-white">1</span> virtual card
              for free.
            </p>
            <p className="">
              You can add up to <span className="text-white">2</span> more cards
              for <span className="text-white">₦1,000</span> each.
            </p>
          </div>
        </div> */}

        {/* Card Name Input */}
        <h2 className="text-lg font-semibold mb-2">Card name</h2>
        {/* <input
          type="text"
          placeholder="Enter card name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          className="w-full bg-[#1E1F23] text-white border border-[#313139] p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-6"
        /> */}

        {/* Card Design Selection */}
        <h2 className="text-lg font-semibold mb-4">Choose a card design</h2>
        <div className="grid grid-cols-2 gap-4">
          {[0, 1, 2].map((design) => (
            <div
              key={design}
              onClick={() => setSelectedDesign(design)}
              className={`${selectedDesign === design && "border-4 border-[#E15C42] "} cursor-pointer rounded-xl`}
            >
              <ViewCards background={cardBackgrounds[design]} cardHolder={""} />
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="p-5">
        <button
          onClick={() => handleDesignChange()}
          // onClick={handleSetPin} // Add actual pin setting logic here
          className="w-full py-3 cursor-pointer text-white text-md font-semibold rounded-md transition duration-200"
          style={{ backgroundColor: "#e5654a" }} // Matching the coral color
        >
          Update Design
        </button>
      </div>

      {/* <CreatePinDialog
        isOpen={showCreatePin}
        onClose={() => setShowCreatePin(false)}
        onSuccess={pendingAction}
        setNewPin={setCardNewPin}
      /> */}
    </div>
  );
}
