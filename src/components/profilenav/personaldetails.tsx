import { ChevronLeft, ChevronRight } from "lucide-react";
import { MailIcon, PhoneIcon, UserIcon } from "../icons/fix-color_type";
import { IconPropsT } from "../icons/icon_type";

interface PersonalDataProps {
  fullName: string;
  phone: string;
  email: string;
}

interface DataItemProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string;
  label?: string;
  onClick?: () => void;
}

export default function PersonalData({
  fullName,
  phone,
  email,
}: PersonalDataProps) {
  return (
    // <section className="bg-cardBg p-5 rounded-xl space-y-6">
    //   <h2 className="text-lg font-medium text-zinc-200">Personal data</h2>

    //   <div className="space-y-5">
    //     <DataItem icon="👤" label="Full name" value={fullName} />
    //     <DataItem icon="📱" label="Phone number" value={phone} />
    //     <DataItem icon="✉️" label="Email" value={email} />
    //   </div>
    // </section>

    <div className="w-full bg-[#1E1F23] flex flex-col gap-4 rounded-md border border-[#313139] p-4 text-white">
      <div className="flex items-center gap-4">
        <UserIcon />

        <div className="flex gap-2 flex-col">
          <p className="text-sm  ">{fullName}</p>

          <span className="text-xs text-gray-500">Full name</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <PhoneIcon />

        <div className="flex gap-2 flex-col">
          <p className="text-sm  ">{phone}</p>

          <span className="text-xs text-gray-500">Phone number</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <MailIcon />

        <div className="flex gap-2 flex-col">
          <p className="text-sm  ">{email}</p>

          <span className="text-xs text-gray-500">Email</span>
        </div>
      </div>
    </div>
  );
}

export function DataItem({ Icon, label, value, onClick }: DataItemProps) {
  return (
    <div
      onClick={onClick}
      className={`w-full ${
        onClick && "cursor-pointer"
      } bg-[#1E1F23] border border-[#313139] flex justify-between items-center gap-4 rounded-md p-4 py-5 text-white`}
    >
      <div className="flex items-center gap-4">
        <Icon />

        <div className="flex gap-2 flex-col">
          <p className="text-sm  ">{value}</p>

          {label && <span className="text-xs text-gray-500">{label}</span>}
        </div>
      </div>

      <ChevronRight />
    </div>
  );
}
