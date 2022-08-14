export interface CurrencyPrice {
  buyPrice: number;
  buySpread: number;
  sellPrice: number;
  sellSpread: number;
  transferPrice: number;
  transferSpread: number;
  basePrice: number;
}

export interface BankCurrencyInfo {
  USD: CurrencyPrice;
  JPY: CurrencyPrice;
  EUR: CurrencyPrice;
}
