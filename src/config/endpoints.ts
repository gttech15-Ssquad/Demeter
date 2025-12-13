// const baseUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

// export const endpoints = (query?: string) => {
//   const auth = {
//     signup: `${baseUrl}/Auth/register`,
//     login: `${baseUrl}/Auth/login`,
//   };

//   return {
//     auth,
//   };
// };

const baseUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

export const endpoints = (query?: string) => {
  const accounts = {
    // GET /api/Accounts/balance
    getBalance: `${baseUrl}/Accounts/balance`,
    // POST /api/Accounts/fund
    fundAccount: `${baseUrl}/Accounts/fund`,
  };

  const auth = {
    // POST /api/Auth/register
    signup: `${baseUrl}/Auth/register`,
    // POST /api/Auth/login
    login: `${baseUrl}/Auth/login`,
  };

  const cards = {
    // GET /api/Cards
    listAll: `${baseUrl}/Cards`,
    // POST /api/Cards
    createVirtualCard: `${baseUrl}/Cards`,
    // GET /api/Cards/{cardId}
    getBasicInfo: (cardId: string) => `${baseUrl}/Cards/${cardId}`,
    // DELETE /api/Cards/{cardId}
    cancelCard: (cardId: string) => `${baseUrl}/Cards/${cardId}`,
    // GET /api/Cards/{cardId}/details
    getFullDetails: (cardId: string) => `${baseUrl}/Cards/${cardId}/details`,
    // POST /api/Cards/{cardId}/freeze
    freeze: (cardId: string) => `${baseUrl}/Cards/${cardId}/freeze`,
    // POST /api/Cards/{cardId}/unfreeze
    unfreeze: (cardId: string) => `${baseUrl}/Cards/${cardId}/unfreeze`,
    // POST /api/Cards/{cardId}/pin
    changePin: (cardId: string) => `${baseUrl}/Cards/${cardId}/pin`,
    // POST /api/Cards/{cardId}/limit
    setLimit: (cardId: string) => `${baseUrl}/Cards/${cardId}/limit`,
    // POST /api/Cards/{cardId}/cvv/verify
    verifyCvv: (cardId: string) => `${baseUrl}/Cards/${cardId}/cvv/verify`,
    // PATCH /api/Cards/{cardId}/design
    updateDesign: (cardId: string) => `${baseUrl}/Cards/${cardId}/design`,
  };

  const merchants = {
    // GET /api/Merchants
    getAll: `${baseUrl}/Merchants`,
    // GET /api/Merchants/{merchantId}
    getSpecific: (merchantId: string) => `${baseUrl}/Merchants/${merchantId}`,
    // GET /api/Merchants/card/{cardId}
    getCardSettings: (cardId: string) => `${baseUrl}/Merchants/card/${cardId}`,
    // POST /api/Merchants/card/{cardId}/merchant/{merchantId}/toggle
    toggleSpecific: (cardId: string, merchantId: string) =>
      `${baseUrl}/Merchants/card/${cardId}/merchant/${merchantId}/toggle`,
  };

  const transactions = {
    // GET /api/Transactions/card/{cardId}
    getHistory: (cardId: string) => `${baseUrl}/Transactions/card/${cardId}`,
    // POST /api/Transactions
    createNew: (cardId: string) => `${baseUrl}/Transactions/card/${cardId}`,
    // GET /api/Transactions/{transactionId}
    getDetails: (transactionId: string) =>
      `${baseUrl}/Transactions/${transactionId}`,
  };

  return {
    accounts,
    auth,
    cards,
    merchants,
    transactions,
    // You can optionally include a general query parameter for search if needed
    // generalQuery: query ? `${baseUrl}/search?q=${query}` : undefined,
  };
};
