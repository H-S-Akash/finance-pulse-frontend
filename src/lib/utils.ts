import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind and conditional CSS classes cleanly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency values with commas and decimals
 */
export function formatCurrency(
  value: number,
  currency: string = "USD",
  decimals: number = 2
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format percentages with + or - signs
 */
export function formatPercent(value: number, includeSign: boolean = true): string {
  const formatted = Math.abs(value).toFixed(2);
  if (value > 0) {
    return includeSign ? `+${formatted}%` : `${formatted}%`;
  } else if (value < 0) {
    return includeSign ? `-${formatted}%` : `${formatted}%`;
  }
  return `${formatted}%`;
}

/**
 * Format compact numbers for billions/millions ($1.4B, $850K)
 */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
}
