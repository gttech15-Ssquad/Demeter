import { FC } from "react";
import { Lock } from "lucide-react";

type CardLockedNoticeProps = {
  onUnfreeze: () => void;
};

const CardLockedNotice: FC<CardLockedNoticeProps> = ({ onUnfreeze }) => {
  return (
    <div className="w-full bg-[#1E1F23] rounded-xl p-4 border border-[#313139] flex items-center justify-between">
      <div className="text-gray-300 text-sm leading-relaxed">
        <p>This card has been locked.</p>
        <p className="mt-2">Unfreeze your card to enjoy more benefits.</p>

        <button
          onClick={onUnfreeze}
          className="mt-4 w-[172px] h-[39px] bg-[#E5654A] text-white text-sm font-semibold py-2 px-6 rounded-md"
        >
          Unfreeze
        </button>
      </div>

      <div className="flex items-center justify-center h-16 w-16 rounded-full border border-[#3a3a40]">
        <Lock size={26} strokeWidth={2} color="#E5654A" />
      </div>
    </div>
  );
};

export default CardLockedNotice;
