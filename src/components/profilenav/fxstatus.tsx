import { Info } from "lucide-react";

interface FXStatusProps {
  message: string;
}

export default function FXStatus({ message }: FXStatusProps) {
  return (
    <div className="w-full bg-[#1E1F23] rounded-md border border-[#313139] p-4 text-gray-400">
      <Info className="w-5 h-5 " />

      <div className="flex items-center  l mt-2 justify-between text-[11px] leading-[22px] tracking-[0px]">
        {message}
      </div>
    </div>
  );
}
