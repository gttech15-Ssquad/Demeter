"use client";

import { useEffect, useState, FC } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { useUserStore } from "@/src/store/z-store/user";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { endpoints } from "@/src/config/endpoints";
import { userProps } from "@/src/types/user";
import { HttpError } from "@/src/types/common";
import SpinnerOverlay from "@/src/components/shared/spinner-overlay";

export default function PinSignIn() {
  const router = useRouter();
  const [savedPhoneNumber, setSavedPhoneNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const maxPinLength = 6;

  const { signIn } = useUserStore();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (payload: { phoneNumber: string; pin: string }) =>
      axios.post(`${endpoints().auth.login}`, payload),
    mutationKey: ["signin"],
    onSuccess: ({ data }) => {
      console.log("check here form userprops");
      console.log(data);
      const user = data as userProps;
      console.log(user);
      localStorage.setItem("vw3dew32werwrdrtewrww33dfw", user.phoneNumber);
      signIn(user);
      setPin("");
      router.push("/");
      // toast.success(message);
      router.push("/");
    },
    onError: ({ response }: HttpError) => {
      setError(true);
      setPin("");
      const { message } = response.data;
      typeof message === "string"
        ? toast.error(message)
        : toast.error(message[0]);
    },
  });

  useEffect(() => {
    const stored = localStorage.getItem("vw3dew32werwrdrtewrww33dfw");
    if (stored) {
      setSavedPhoneNumber(stored);
      setPhoneNumber(stored);
    }
  }, []);

  const handleLogin = async () => {
    const payload = { phoneNumber, pin };

    mutateAsync(payload);
  };

  const handleNumberClick = (num: number) => {
    if (pin.length < maxPinLength) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);

      // Auto-submit when PIN is complete
      if (newPin.length === maxPinLength) {
        // setTimeout(() => {

        //   // Replace with real authentication
        //   if (newPin === "123456") {
        //     router.push("/"); // Navigate to dashboard
        //   } else {
        //     setError(true);
        //     setPin("");
        //   }
        // }, 300);

        const payload = { phoneNumber, pin: newPin };

        mutateAsync(payload);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError(false);
  };

  if (!phoneNumber) {
    return (
      <PhoneNumberBlock
        onNumberSubmit={(num) => {
          setPhoneNumber(num);
        }}
      />
    );
  }

  if (isPending) {
    return <SpinnerOverlay />;
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-between p-6 pb-8">
      {/* Status Bar */}
      <div className="w-full flex justify-between items-center text-white text-xs mb-8">
        <span>
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
          <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
          <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
        </div>
      </div>

      {/* Profile Icon & Text */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-[#2a2a2a] flex items-center justify-center mb-8">
          <User size={32} className="text-gray-400" />
        </div>

        <p className="text-gray-400 text-sm mb-8">Enter password</p>

        {/* PIN Dots */}
        <div className="flex gap-3 mb-12">
          {[...Array(maxPinLength)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i < pin.length
                  ? error
                    ? "bg-red-500"
                    : "bg-[#E15C42]"
                  : "bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-x-16 gap-y-8 mb-8">
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
      </div>

      {/* Forgot Password */}
      <button className="text-[#FF6B6B] text-sm font-medium mb-2">
        Forgot password?
      </button>

      {/* Bottom Indicator */}
      <div className="w-32 h-1 bg-white/30 rounded-full"></div>
    </div>
  );
}

type PhoneNumberBlockProps = {
  onNumberSubmit: (phone: string) => void;
};

export const PhoneNumberBlock: FC<PhoneNumberBlockProps> = ({
  onNumberSubmit,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = /^0\d{10}$/.test(phoneNumber);

  const handleContinue = () => {
    if (!isValid) {
      toast.error("Enter a valid phone number");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      onNumberSubmit(phoneNumber);
    }, 400);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center px-6 mt-8">
      <h1 className="text-white text-xl font-semibold mb-3">Welcome</h1>

      <p className="text-gray-400 text-sm mb-10 text-center">
        Enter your phone number to continue
      </p>

      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="xxxxxxxxxxx"
        className="w-full bg-[#2a2a2a] text-white p-4 rounded-lg text-center 
        tracking-widest text-lg outline-none border border-[#333]
        focus:border-[#E5654A] transition"
      />

      <button
        onClick={handleContinue}
        disabled={!isValid || loading}
        className="w-full mt-10 py-3 rounded-lg text-white font-medium text-base 
        bg-[#E5654A] disabled:bg-[#E5654A]/40 disabled:text-gray-300 
        transition active:scale-95"
      >
        {loading ? "Please wait..." : "Continue"}
      </button>

      <div className="flex justify-center mt-12">
        <div className="w-32 h-1 bg-white/30 rounded-full"></div>
      </div>
    </div>
  );
};

// import React, { useState } from 'react'
// import { EyeIcon, EyeOffIcon } from 'lucide-react'
// interface SignInScreenProps {
//   onSignIn: () => void
// }
// export function SignInScreen({ onSignIn }: SignInScreenProps) {
//   const [showPassword, setShowPassword] = useState(false)
//   const [userId, setUserId] = useState('')
//   const [password, setPassword] = useState('')
//   const handleSignIn = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Simple validation - in production, this would call an API
//     if (userId && password) {
//       onSignIn()
//     }
//   }
//   return (
//     <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center">
//       <div className="w-full max-w-[390px] h-[844px] bg-black overflow-hidden relative flex flex-col">
//         {/* Status Bar */}
//         <div className="h-10 px-5 flex items-center justify-between text-white text-sm">
//           <div>9:41</div>
//           <div className="flex items-center gap-1">
//             <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
//               <rect width="16" height="12" rx="2" fill="white" />
//               <rect x="14" y="4" width="2" height="4" rx="1" fill="white" />
//             </svg>
//           </div>
//         </div>
//         {/* Content */}
//         <div className="flex-1 flex flex-col px-6 pt-12">
//           {/* Logo */}
//           <div className="flex items-center gap-2 mb-8">
//             <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-xl">GT</span>
//             </div>
//             <span className="text-xl font-semibold">GTBank</span>
//           </div>
//           {/* Welcome Text */}
//           <div className="mb-8">
//             <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
//             <p className="text-gray-400 text-sm">Sign in to continue</p>
//           </div>
//           {/* Sign In Form */}
//           <form onSubmit={handleSignIn} className="flex-1 flex flex-col">
//             <div className="mb-4">
//               <label className="text-sm text-gray-400 mb-2 block">
//                 User ID
//               </label>
//               <input
//                 type="text"
//                 value={userId}
//                 onChange={(e) => setUserId(e.target.value)}
//                 className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
//                 placeholder="Enter your user ID"
//               />
//             </div>
//             <div className="mb-6">
//               <label className="text-sm text-gray-400 mb-2 block">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 pr-12"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
//                 >
//                   {showPassword ? (
//                     <EyeOffIcon size={20} />
//                   ) : (
//                     <EyeIcon size={20} />
//                   )}
//                 </button>
//               </div>
//             </div>
//             <button
//               type="button"
//               className="text-orange-500 text-sm mb-8 text-left"
//             >
//               Forgot password?
//             </button>
//             <button
//               type="submit"
//               className="w-full bg-orange-500 text-white rounded-lg py-4 font-medium mb-4 hover:bg-orange-600 transition-colors"
//             >
//               Sign In
//             </button>
//             <div className="text-center">
//               <span className="text-gray-400 text-sm">
//                 Don't have an account?{' '}
//               </span>
//               <button type="button" className="text-orange-500 text-sm">
//                 Sign Up
//               </button>
//             </div>
//             {/* Biometric Option */}
//             <div className="mt-auto mb-8 flex flex-col items-center">
//               <button
//                 type="button"
//                 className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mb-2"
//               >
//                 <svg
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path d="M12 10v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
//                 </svg>
//               </button>
//               <span className="text-xs text-gray-400">Use biometric</span>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff } from "lucide-react";

// export default function SignInPage() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignIn = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Simple mock authentication
//     if (email && password) {
//       router.push("/");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-dark flex flex-col p-6">
//       <div className="flex-1 flex flex-col justify-center">
//         <div className="mb-12">
//           <h1 className="text-4xl font-bold text-white mb-2">Welcome back</h1>
//           <p className="text-gray-400">Sign in to continue</p>
//         </div>

//         <form onSubmit={handleSignIn} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-3 bg-dark-card border border-dark-lighter rounded-xl text-white focus:outline-none focus:border-primary"
//               placeholder="your@email.com"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-3 bg-dark-card border border-dark-lighter rounded-xl text-white focus:outline-none focus:border-primary"
//                 placeholder="Enter password"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//           </div>

//           <button className="text-primary text-sm font-medium">
//             Forgot password?
//           </button>

//           <button
//             type="submit"
//             className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl transition-colors"
//           >
//             Sign In
//           </button>
//         </form>

//         <p className="text-center text-gray-400 mt-8">
//           Don't have an account?{" "}
//           <button className="text-primary font-medium">Sign Up</button>
//         </p>
//       </div>
//     </div>
//   );
// }
