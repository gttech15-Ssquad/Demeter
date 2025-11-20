import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

interface ConfirmPinDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ConfirmPinDialog({
  isOpen,
  onClose,
  onSuccess,
}: ConfirmPinDialogProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const maxPinLength = 4;

  if (!isOpen) return null;

  const handleNumberClick = (num: number) => {
    if (pin.length < maxPinLength) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);

      if (newPin.length === maxPinLength) {
        setTimeout(() => {
          if (newPin === "1234") {
            setPin("");
            setError(false);
            onSuccess();
            onClose();
          } else {
            setError(true);
            setPin("");
          }
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError(false);
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center p-6 z-60">
      <div className="w-full max-w-sm bg-[#1a1a1a] h-[95vh] rounded-2xl p-6 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-[#2a2a2a] flex items-center justify-center mb-8">
          <User size={32} className="text-gray-400" />
        </div>

        <p className="text-gray-400 text-sm mb-8">Enter Pin</p>

        <div className="flex gap-3 mb-12">
          {[...Array(maxPinLength)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i < pin.length
                  ? error
                    ? "bg-red-500"
                    : "bg-white"
                  : "bg-gray-600"
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-x-10 gap-y-6 mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="w-16 h-16 flex items-center justify-center text-white text-2xl font-light hover:bg-white/5 rounded-full transition-colors active:scale-95"
            >
              {num}
            </button>
          ))}

          <div></div>

          <button
            onClick={() => handleNumberClick(0)}
            className="w-16 h-16 flex items-center justify-center text-white text-2xl font-light hover:bg-white/5 rounded-full transition-colors active:scale-95"
          >
            0
          </button>

          <button
            onClick={handleDelete}
            disabled={pin.length === 0}
            className="w-16 h-16 flex items-center justify-center text-white text-xl hover:bg-white/5 rounded-full transition-colors active:scale-95 disabled:opacity-30"
          >
            ⌫
          </button>
        </div>

        <button
          className="text-[#FF6B6B] text-sm font-medium"
          onClick={onClose}
        >
          Forgot pin?
        </button>
      </div>
    </div>
  );
}
