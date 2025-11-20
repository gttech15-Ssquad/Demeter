import Image from "next/image";

export interface CardBackground {
  type: "gradient" | "color" | "image";
  value: string;
}

interface Props {
  background: CardBackground;
  cardNumber?: string;
  expiryDate?: string;
  cardHolder?: string;
}

export default function MyVirtualCard({
  background,
  cardNumber,
  expiryDate,
  cardHolder,
}: Props) {
  const renderBackground = () => {
    if (background.type === "gradient") {
      return (
        <div className={`absolute inset-0 ${background.value}`}>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-black/30 to-transparent"></div>
        </div>
      );
    }

    if (background.type === "color") {
      return (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: background.value }}
        />
      );
    }

    if (background.type === "image") {
      return (
        <div className="absolute p-0 m-0 inset-0">
          <div
            className="w-[120%] p-0 -ml-10 h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${background.value})` }}
          ></div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative h-52 rounded-xl overflow-hidden">
      {renderBackground()}

      <Image
        src={"/images/gtLogo.png"}
        width={48}
        height={48}
        alt="Bank Logo"
        className="absolute top-4 right-4"
      />

      <div className="absolute top-1/2 -translate-y-1/2 left-4 w-8 h-6 bg-yellow-900 rounded"></div>

      <div className="absolute bottom-8 left-4">
        <div className="text-sm font-medium text-white">{cardHolder}</div>
      </div>

      <Image
        src={"/images/masterCardLogo.png"}
        width={62}
        height={41}
        alt="Bank Logo"
        className="absolute bottom-4 right-4"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-1">
        <div className="w-1 h-1 bg-white rounded-full" />
        <div className="w-1 h-1 bg-white rounded-full" />
        <div className="w-1 h-1 bg-white rounded-full" />
      </div>
    </div>
  );
}
