import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ConfirmationDrawer } from "./confirmationDraawer";
import { useState } from "react";

interface AppPermissionItemProps {
  iconSrc: string;
  name: string;
  description: string;
  blocked?: boolean;
  enabled: boolean;
  onToggle: (value: boolean) => void;
}

// export function ToggleSelweectItem({
//   iconSrc,
//   name,
//   description,
//   blocked,
//   enabled,
//   onToggle,
// }: AppPermissionItemProps) {
//   return (
//     <div className="flex items-center gap-4 bg-[#1E1F23] rounded-md border border-[#313139]  justify-between w-full py-4 px-2">
//       <div className="flex items-center gap-4">
//         {/* <div className="rounded-md bg-[#1a1a1a] p-2 flex items-center justify-center w-12 h-12"> */}
//         <Image src={iconSrc} alt={name} width={40} height={40} />
//         {/* </div> */}

//         <div className="flex justify-center flex-col">
//           <div className="flex items-center gap-2">
//             <p className="text-white font-medium">{name}</p>
//             {blocked && (
//               <Badge
//                 variant="destructive"
//                 className="text-xs px-2 bg-[392223] border-[#E15C42]/40 text-[#E15C42] py-0.5"
//               >
//                 Blocked
//               </Badge>
//             )}
//           </div>
//           <p className="text-[10px] text-gray-400">{description}</p>
//         </div>
//       </div>

//       <Switch
//         style={{ "--thumb-display": "none" } as React.CSSProperties}
//         className=" relative h-8 w-[55px] rounded-full

//     data-[state=checked]:bg-green-500
//     data-[state=unchecked]:bg-neutral-700

//     before:content-['']
//     before:absolute
//     before:top-0.5 before:left-0.5

//     before:h-7
//     before:w-7

//     before:bg-white before:rounded-full
//     before:transition-transform

//     data-[state=checked]:before:translate-x-[23px]

//    **:data-[slot=switch-thumb]:hidden

//   "
//         // checked={enabled}
//         // onCheckedChange={onToggle}
//       />
//     </div>
//   );
// }
interface ToggleSelectItemProps {
  iconSrc: string;
  name: string;
  description: string;
  enabled: boolean;
  blocked?: boolean;
  onToggle: (value: boolean) => void;
  requireConfirmation?: boolean;
  confirmationConfig?: {
    title?: string;
    message?: string;
    imageSrc?: string;
  };
}

export const ToggleSelectItem: React.FC<ToggleSelectItemProps> = ({
  iconSrc,
  name,
  description,
  enabled,
  blocked = false,
  onToggle,
  requireConfirmation = false,
  confirmationConfig,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingValue, setPendingValue] = useState<boolean>(false);

  const handleToggleClick = (newValue: boolean) => {
    if (blocked) return; // Don't allow toggling if blocked

    if (requireConfirmation) {
      setPendingValue(newValue);
      setShowConfirmation(true);
    } else {
      onToggle(newValue);
    }
  };

  const handleConfirm = () => {
    onToggle(pendingValue);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="">
      <div className="flex items-center gap-4 bg-[#1E1F23] rounded-md border border-[#313139] justify-between w-full py-4 px-2">
        <div className="flex items-center gap-4">
          <Image src={iconSrc} alt={name} width={40} height={40} />

          <div className="flex justify-center flex-col">
            <div className="flex items-center gap-2">
              <p className="text-white font-medium">{name}</p>
              {blocked && (
                <Badge
                  variant="destructive"
                  className="text-xs px-2 bg-[#392223] border-[#E15C42]/40 text-[#E15C42] py-0.5"
                >
                  Blocked
                </Badge>
              )}
            </div>
            <p className="text-[10px] text-gray-400">{description}</p>
          </div>
        </div>

        <Switch
          style={{ "--thumb-display": "none" } as React.CSSProperties}
          className="relative h-8 w-[55px] rounded-full
            data-[state=checked]:bg-green-500
            data-[state=unchecked]:bg-neutral-700
            before:content-['']
            before:absolute
            before:top-0.5 before:left-0.5
            before:h-7   
            before:w-7   
            before:bg-white before:rounded-full
            before:transition-transform
            data-[state=checked]:before:translate-x-[23px]
            **:data-[slot=switch-thumb]:hidden
          "
          checked={enabled}
          onCheckedChange={handleToggleClick}
          disabled={blocked}
        />
      </div>

      {requireConfirmation && (
        <ConfirmationDrawer
          isOpen={showConfirmation}
          onClose={handleCancel}
          onConfirm={handleConfirm}
          title={confirmationConfig?.title || `Are you sure?`}
          message={
            confirmationConfig?.message ||
            (enabled
              ? `Turning this off will cause all future transactions at ${name} to fail. If you're sure, select "Confirm" Otherwise, select "Cancel" to keep using your VirtuPay card without issues.`
              : ` Select “Confirm” to authorize future card payments from this merchant.`)
          }
          imageSrc={confirmationConfig?.imageSrc}
        />
      )}
    </div>
  );
};
