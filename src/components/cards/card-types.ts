// types/card.ts
export interface CardDetails {
  cardNumber: string;
  accountNumber: string;
  expiryDate: string;
  cvv: string;
}

// Mock Data (to be passed as a prop)
export const mockCardDetails: CardDetails = {
  cardNumber: "5594382937296482",
  accountNumber: "0718259676",
  expiryDate: "08/28",
  cvv: "021",
};
