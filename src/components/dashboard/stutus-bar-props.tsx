import React from "react";
export function StatusBar() {
  return (
    <div className="h-10 px-5 sticky top-0 flex bg-[#1A1A1A] z-100 items-center justify-between text-white text-sm">
      <div className="font-semibold">9:41</div>
      <div className="flex items-center gap-1">
        {/* Signal Strength */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="8" width="2" height="4" rx="1" fill="white" />
          <rect x="4" y="5" width="2" height="7" rx="1" fill="white" />
          <rect x="8" y="2" width="2" height="10" rx="1" fill="white" />
          <rect x="12" y="0" width="2" height="12" rx="1" fill="white" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M8 11C8.55228 11 9 10.5523 9 10C9 9.44772 8.55228 9 8 9C7.44772 9 7 9.44772 7 10C7 10.5523 7.44772 11 8 11Z"
            fill="white"
          />
          <path
            d="M8 7C9.10457 7 10 7.89543 10 9"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M8 4C10.2091 4 12 5.79086 12 8"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="21"
            height="11"
            rx="2.5"
            stroke="white"
            strokeOpacity="0.4"
          />
          <rect x="2" y="2" width="18" height="8" rx="1.5" fill="white" />
          <rect
            x="23"
            y="4"
            width="2"
            height="4"
            rx="1"
            fill="white"
            fillOpacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}
