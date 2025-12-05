import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, X } from "lucide-react";
import { toast } from "sonner";

interface CreatePinDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newPin: string) => void;
  setNewPin: (newPin: string) => void;
}

export default function CreatePinDialog({
  isOpen,
  setNewPin,
  onClose,
  onSuccess,
}: CreatePinDialogProps) {
  const [pin, setPin] = useState("");
  const [confirmpin, setConfirmPin] = useState("");
  const [confirmStage, setConfirmStage] = useState(false);
  const [error, setError] = useState(false);
  const maxPinLength = 4;

  if (!isOpen) return null;

  const handleNumberClick = (num: number) => {
    if (!confirmStage) {
      if (pin.length < maxPinLength) {
        const newPin = pin + num;
        setPin(newPin);
        setError(false);
        if (newPin.length === maxPinLength) {
          setTimeout(() => {
            if (!confirmStage && !confirmpin) {
              setNewPin(newPin);
              setConfirmStage(true);

              setError(false);
            } else {
              setError(true);
              setPin("");
              setConfirmStage(false);
              setConfirmPin("");
            }
          }, 300);
        }
      }
    } else {
      if (confirmpin.length < maxPinLength) {
        const newPin = confirmpin + num;
        setConfirmPin(newPin);
        setError(false);
        if (newPin.length === maxPinLength) {
          setTimeout(() => {
            if (confirmStage && confirmpin && pin) {
              if (newPin === pin) {
                setNewPin(newPin);
                onSuccess(newPin);

                setPin("");
                setConfirmStage(false);
                setConfirmPin("");
              } else {
                setError(true);
                toast.error("Passwords do not match");
                setPin("");
                setConfirmStage(false);
                setConfirmPin("");
              }

              setError(false);
            } else {
              setError(true);
              setPin("");
              setConfirmStage(false);
              setConfirmPin("");
            }
          }, 300);
        }
      }
    }
  };

  const handleDelete = () => {
    !confirmStage
      ? setPin(pin.slice(0, -1))
      : setConfirmPin(confirmpin.slice(0, -1));
    setError(false);
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center p-6 z-60">
      <div className="w-full max-w-sm bg-[#1a1a1a] h-[95vh] rounded-2xl p-6 flex flex-col items-center">
        <div className="mt-12 flex w-full">
          {" "}
          <X
            className="cursor-pointer"
            onClick={() => {
              (setPin(""),
                setConfirmPin(""),
                setConfirmStage(false),
                onClose());
            }}
          />
        </div>
        <div className="">
          {confirmStage ? (
            <div className="flex flex-col">
              <p className=" text-4xl font-bold mb-2">Confirm Pin</p>
              <p>
                Enter 4-digit virtual card PIN one more time to be sure it's
                correct.
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              <p className=" text-4xl font-bold mb-2">Create Pin</p>
              <p>
                Please create a new 4-digit virtual card PIN that does not use
                consecutive numbers, repeating digits, your birthday or phone
                number.
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-20 mb-12">
          {[...Array(maxPinLength)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i < (!confirmStage ? pin.length : confirmpin.length)
                  ? error
                    ? "bg-red-500"
                    : "bg-[#E15C42]"
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
