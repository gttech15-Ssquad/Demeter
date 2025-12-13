import React, { useEffect, useState } from "react";

import { CreditCard, Lock, ShieldCheck, Store } from "lucide-react";
import { Select } from "./select";
import { Input } from "./input";
import { Button } from "./button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "@/src/utils";
import { endpoints } from "@/src/config/endpoints";
import { CardListResponse, MerchantDetails } from "@/src/types/user";
import { toast } from "sonner";
import { HttpError } from "@/src/types/common";
interface Card {
  id: string;
  last4: string;
  brand: string;
  expiry: string;
}
interface Merchant {
  id: string;
  code: string;
  name: string;
  categoryCode: string;
  description: string;
}

interface TransactionRequest {
  amountMinorUnits: number;
  currency: string;
  merchantId: string;
  type: string;
  description: string;
  referenceId: string;
}
export function CardPaymentPage() {
  const [isLoading, setIsLoading] = useState(false);
  //   const [isFetchingMerchants, setIsFetchingMerchants] = useState(true);
  //   const [cards, setCards] = useState<Card[]>([]);
  //   const [merchants, setMerchants] = useState<Merchant[]>([])m
  const [formData, setFormData] = useState({
    cardId: "",
    amount: "",
    currency: "NGN",
    merchantId: "",
    type: "online_payment",
    description: "",
    referenceId: "",
  });

  //   {
  //   "amountMinorUnits": 0,
  //   "currency": "string",
  //   "merchantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "type": "string",
  //   "description": "string",
  //   "referenceId": "string"
  // }

  const { isPending, mutateAsync: paymutateAsync } = useMutation({
    mutationFn: (payload: TransactionRequest) =>
      instance.post(
        `${endpoints().transactions.createNew(formData.cardId)}`,
        payload
      ),
    mutationKey: ["v-cards"],
    onSuccess: ({ data }) => {
      console.log(data);

      toast.success("success");
    },
    onError: ({ response }: HttpError) => {
      toast.error(`${response?.data?.error}`);
      const { message } = response.data;

      typeof message === "string"
        ? toast.error(message)
        : toast.error(message[0]);
    },
  });

  const {
    data: cardres,
    isFetching: isFetchingCard,
    refetch,
  } = useQuery({
    queryFn: () => instance.get(`${endpoints().cards.listAll}`),
    queryKey: ["v-cards"],
  });

  const vCards = cardres?.data as CardListResponse | undefined;
  const cards = vCards?.cards || [];

  const { data: marchantres, isFetching: isFetchingMar } = useQuery({
    queryFn: () => instance.get(`${endpoints().merchants.getAll}`),
    queryKey: ["v-mar"],
  });

  const merchants = marchantres?.data as MerchantDetails[] | [];

  // Simulate fetching cards on mount
  useEffect(() => {
    // Generate a random reference ID on mount
    setFormData((prev) => ({
      ...prev,
      referenceId: `REF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      amountMinorUnits: Number(formData.amount),
      currency: formData.currency,
      merchantId: formData.merchantId,
      type: formData.type,
      description: formData.description,
      referenceId: formData.referenceId,
    };
    paymutateAsync(payload);
    console.log("Card Payment Payload:", payload);

    setIsLoading(false);
    setFormData((prev) => ({
      ...prev,
      amount: "",
      description: "",
      referenceId: `REF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    }));
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const cardOptions = cards?.map((card) => ({
    value: card.id,
    label: `${card.cardNumberMasked} (Exp ${card.expiryMonth}/${card.expiryYear})`,
  }));
  const merchantOptions = merchants?.map((merchant) => ({
    value: merchant.id,
    label: `${merchant.name} - ${merchant.description}`,
  }));
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <CreditCard className="h-8 w-8" />
          </div>
          <p className="mt-2 text-white text-lg">Online Card Payment</p>
        </h1>
        <p className="mt-2 text-white text-lg">
          Process a secure payment using your saved cards.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card Selection Section */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 text-green-600" />
                Payment Method
              </h3>
              {isFetchingCard ? (
                <div className="animate-pulse h-10 bg-slate-200 rounded-lg w-full"></div>
              ) : (
                <Select
                  name="cardId"
                  label="Select Card"
                  options={cardOptions}
                  value={formData.cardId}
                  onChange={handleChange}
                  required
                  placeholder="Choose a card..."
                />
              )}
            </div>

            {/* Merchant Selection Section */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center">
                <Store className="h-4 w-4 mr-2 text-blue-600" />
                Merchant
              </h3>
              {isFetchingMar ? (
                <div className="animate-pulse h-10 bg-blue-100 rounded-lg w-full"></div>
              ) : (
                <Select
                  name="merchantId"
                  label="Select Merchant"
                  options={merchantOptions}
                  value={formData.merchantId}
                  onChange={handleChange}
                  required
                  placeholder="Choose a merchant..."
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Amount
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-slate-500">N</span>
                  </div>
                  <input
                    type="number"
                    name="amount"
                    step="0.01"
                    min="0.01"
                    required
                    value={formData.amount}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-slate-300 bg-white pl-8 pr-3 py-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <Input
                name="currency"
                label="Currency"
                value={formData.currency}
                onChange={handleChange}
                required
                maxLength={3}
                className="uppercase"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                name="type"
                label="Transaction Type"
                value={formData.type}
                onChange={handleChange}
                required
              />
              <Input
                name="referenceId"
                label="Reference ID"
                value={formData.referenceId}
                onChange={handleChange}
                readOnly
                className="bg-slate-50 text-slate-500 font-mono text-sm"
              />
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
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                placeholder="Payment description..."
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full py-3"
                isLoading={isLoading}
              >
                <Lock className="mr-2 h-4 w-4" /> Pay{" "}
                {formData.amount ? `${formData.amount}` : "Now"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
