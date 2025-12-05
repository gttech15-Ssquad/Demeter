import { Transaction } from "@/src/types/user"; // Import your Transaction interface

// Define the shape of the desired output
interface GroupedTransaction {
  id: string;
  description: string;
  type: string;
  amount_ngn: number; // Renamed to reflect the transformed, displayable amount
  source: string; // The last 4 digits of the card number (assuming this is the card source)
}

interface TransactionsByDate {
  date: string;
  transactions: GroupedTransaction[];
}

interface TransformedTransactions {
  transactions_by_date: TransactionsByDate[];
}

// Helper function to format the date string (e.g., "November 13, 2025")
const formatDateForGrouping = (dateString: string): string => {
  const date = new Date(dateString);
  // Using 'en-US' locale for the desired format: Month Day, Year
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Transforms a flat list of transactions into an object grouped by date.
 * @param cardTransactions The array of transactions from the API.
 * @returns The transformed object with transactions grouped by date.
 */
export const transformTransactions = (
  cardTransactions: Transaction[] | undefined,
  cardNumberMasked: string // Pass the masked card number to get the source
): TransformedTransactions => {
  if (!cardTransactions || cardTransactions.length === 0) {
    return { transactions_by_date: [] };
  }

  // 1. Get the last 4 digits for the 'source' field
  const source = cardNumberMasked.slice(-4);

  // Use a Map to group transactions by their formatted date string
  const groupedMap = new Map<string, GroupedTransaction[]>();

  cardTransactions.forEach((transaction) => {
    // Determine the date key (e.g., "November 13, 2025")
    const dateKey = formatDateForGrouping(transaction.createdAt);

    // Convert minor units to major units (assuming the smallest unit is 1/100th, like cents/kobo)
    // NOTE: Adjust the division factor if your minor units are different (e.g., 1000)
    const displayAmount = transaction.amountMinorUnits;

    const transformedTransaction: GroupedTransaction = {
      id: transaction.id,
      // You can adjust this description format as needed
      description: `${transaction.merchantName} ${transaction.referenceId}`,
      type: transaction.type,
      amount_ngn: displayAmount,
      source: source,
    };

    // Add the transaction to the correct date group in the Map
    if (groupedMap.has(dateKey)) {
      groupedMap.get(dateKey)?.push(transformedTransaction);
    } else {
      groupedMap.set(dateKey, [transformedTransaction]);
    }
  });

  // 2. Convert the Map to the final array format and sort by date descending
  const transactions_by_date: TransactionsByDate[] = Array.from(
    groupedMap.entries()
  )
    .map(([date, transactions]) => ({
      date: date,
      transactions: transactions,
    }))
    // Optional: Sort groups by date descending (most recent date first)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { transactions_by_date };
};
