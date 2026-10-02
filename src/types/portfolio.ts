export type AssetCategory = "Equities" | "Crypto" | "Fixed Income" | "Commodities" | "Cash";

export interface Holding {
  id: string;
  name: string;
  ticker: string;
  category: AssetCategory;
  allocationPercent: number;
  currentPrice: number;
  change24h: number;
  totalValue: number;
  amountHeld: number;
  sparkline: number[];
  iconBg: string;
}

export interface AssetAllocation {
  category: AssetCategory;
  percentage: number;
  targetPercentage: number;
  value: number;
  color: string;
  accentClass: string;
}

export interface RiskMetrics {
  sharpeRatio: number;
  sharpeRating: "Poor" | "Moderate" | "Good" | "Excellent";
  beta: number;
  volatility: number;
  maxDrawdown: number;
  valueAtRisk95: number;
  healthScore: number;
}

export interface MarketTicker {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  isPositive: boolean;
}

export type TransactionType = "BUY" | "SELL" | "STAKING_REWARD" | "DIVIDEND" | "TRANSFER";
export type TransactionStatus = "COMPLETED" | "PENDING" | "PROCESSING";

export interface Transaction {
  id: string;
  type: TransactionType;
  assetName: string;
  ticker: string;
  amount: number;
  unitPrice: number;
  total: number;
  date: string;
  status: TransactionStatus;
  txHash: string;
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
  benchmarkValue: number;
}

export type TimeFrame = "1D" | "1W" | "1M" | "1Y" | "ALL";

export interface PortfolioSummary {
  totalNetWorth: number;
  change24hAmount: number;
  change24hPercent: number;
  allTimeProfit: number;
  allTimeProfitPercent: number;
  monthlyDividends: number;
  cashAvailable: number;
  currency: string;
  lastUpdated: string;
}
