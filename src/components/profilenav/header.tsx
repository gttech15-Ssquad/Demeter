import { Info } from "lucide-react";
import { ProfileEditIcon } from "../icons/fix-color_type";

interface HeaderProps {
  name: string;
  tier: string;
}

export default function Header({ name, tier }: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-start gap-4">
        <div>
          <h1 className="text-4xl font-semibold mb-1">Hello, {name} !</h1>
          <div className="text-xs flex gap-2 items-center text-gray-500 border-2 border-gray-800 rounded-sm py-1 px-2">
            Banking Account:<span className="text-white">{tier}</span>
            <span>
              <Info className="w-3 h-3 text-[#E85D04]" />
            </span>
          </div>
        </div>
      </div>

      <ProfileEditIcon />
    </header>
  );
}
