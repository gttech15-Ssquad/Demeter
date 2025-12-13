import React, { useState } from "react";

import { ArrowRight, DollarSign, Wallet } from "lucide-react";
import { Button } from "./button";
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/src/utils";
import { endpoints } from "@/src/config/endpoints";
import { HttpError } from "@/src/types/common";
import { toast } from "sonner";
export function DepositPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
  });

  interface DepositRequest {
    amountMinorUnits: number;
    description: string;
  }

  const { isPending, mutateAsync: paymutateAsync } = useMutation({
    mutationFn: (payload: DepositRequest) =>
      instance.post(`${endpoints().accounts.fundAccount}`, payload),
    mutationKey: ["v-cards"],
    onSuccess: ({ data }) => {
      console.log(data);

      toast.success("success");
    },
    onError: ({ response }: HttpError) => {
      toast.error("transaction Failed");
      const { message } = response.data;

      typeof message === "string"
        ? toast.error(message)
        : toast.error(message[0]);
    },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Convert amount to minor units (cents)
    // const amountMinorUnits = Math.round(parseFloat(formData.amount) * 100);
    const payload = {
      amountMinorUnits: Number(formData.amount),
      description: formData.description,
    };
    // Simulate API call
    paymutateAsync(payload);
    console.log("Deposit Payload:", payload);

    setIsLoading(false);
    setFormData({
      amount: "",
      description: "",
    });
  };
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <Wallet className="h-8 w-8" />
          </div>
          <span className="text-white"> Make a Deposit</span>
        </h1>
        <p className="mt-2 text-white text-lg">
          Add funds to your account securely.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Amount
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-slate-500 text-lg"></span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                  className="block w-full rounded-lg border border-slate-300 bg-white pl-8 pr-3 py-3 text-lg font-medium text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="0.00"
                />
              </div>
              <p className="mt-1.5 text-sm text-slate-500">
                Enter the amount you wish to deposit.
              </p>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                placeholder="e.g., Monthly savings deposit"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full text-lg py-3"
                isLoading={isLoading}
              >
                Confirm Deposit <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center">
            this is a demo environment.
          </p>
        </div>
      </div>
    </div>
  );
}
