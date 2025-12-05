export interface userProps {
  accessToken: string;
  expiresIn: number;
  userId: string;
  phoneNumber: string;
  fullName: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface AccountProps {
  /**
   * The unique identifier for the account.
   */
  accountNumber: string;
  /**
   * The type of account, e.g., "SAVINGS" or "CURRENT".
   */
  accountType: "SAVINGS" | "CURRENT" | string;
  /**
   * The current balance of the account in minor currency units (e.g., Kobo for NGN).
   */
  balanceMinorUnits: number;
  /**
   * The currency code for the account, e.g., "NGN".
   */
  currency: string;
  /**
   * The timestamp when the account was created (ISO 8601 format).
   */
  createdAt: string;
}

/**
 * Interface for a single virtual or physical card object.
 */
export interface Card {
  id: string;
  cardNumberMasked: string;
  expiryMonth: number;
  expiryYear: number;
  isFrozen: boolean;
  isCancelled: boolean;
  designType: number;
  createdAt: string; // Typically an ISO 8601 string
}

/**
 * Interface for the entire API response object containing the list of cards and user limits.
 */
export interface CardListResponse {
  cards: Card[];
  totalCount: number;
  maxCardsPerUser: number;
  cardCreationFeeMinorUnits: number;
}

/**
 * Interface for a single financial transaction record.
 */
export interface Transaction {
  id: string; // Unique ID for the transaction
  cardId: string; // ID of the card used for the transaction
  merchantId: string; // ID of the merchant
  merchantName: string; // Name of the merchant
  amountMinorUnits: number; // Transaction amount in minor units (e.g., cents)
  currency: string; // Currency code (e.g., "USD", "EUR")
  type: string; // Type of transaction (e.g., "debit", "credit", "transfer")
  status: string; // Transaction status (e.g., "completed", "pending", "failed")
  referenceId: string; // External reference ID for the transaction
  description: string;
  createdAt: string; // Timestamp of creation (ISO 8601 format)
}

/**
 * Interface for the API response containing a list of transactions.
 */
export interface TransactionListResponse {
  transactions: Transaction[];
  totalCount: number; // Total number of transactions for the card/query
  cardId: string; // The ID of the card the transactions belong to
}

/**
 * Interface for a single detailed transaction record.
 */
export interface DetailedTransaction {
  id: string; // Unique ID for the transaction (UUID)
  cardId: string; // ID of the card used (UUID)
  merchantId: string; // ID of the merchant (UUID)
  merchantName: string; // Name of the merchant (e.g., "Spotify")
  amountMinorUnits: number; // Transaction amount in minor units (e.g., kobo/cents)
  currency: string; // Currency code/name (e.g., "naira")
  type: string; // Category or type of transaction (e.g., "entertainment")
  status: "COMPLETED" | "PENDING" | "FAILED" | string; // Transaction status
  referenceId: string; // External reference ID
  description: string;
  createdAt: string; // Timestamp of creation (ISO 8601 format)
}

/**
 * Interface for the basic details of a merchant.
 */
export interface MerchantDetails {
  id: string; // Unique ID for the merchant (UUID)
  code: string; // Short code for the merchant (e.g., "NETFLIX")
  name: string; // Full name of the merchant
  categoryCode: string; // Standard merchant category code (MCC)
  description: string;
}

/**
 * Interface for a single merchant setting associated with a card.
 */
export interface MerchantSetting {
  cardId: string; // ID of the card this setting applies to
  merchant: MerchantDetails;
  isEnabled: boolean; // Flag indicating if transactions are allowed for this merchant on the card
}

/**
 * Interface for the API response containing a list of merchant settings for a card.
 */
export interface MerchantSettingsResponse {
  cardId: string; // The ID of the card these settings apply to
  merchantSettings: MerchantSetting[];
  totalCount: number; // Total number of merchant settings returned
}
