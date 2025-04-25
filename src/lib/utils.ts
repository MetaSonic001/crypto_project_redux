import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency with appropriate abbreviations for large numbers
export function formatCurrency(value: number, decimals = 2): string {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(decimals)}T`
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(decimals)}B`
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(decimals)}M`
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(decimals)}K`
  } else {
    return `$${value.toFixed(decimals)}`
  }
}

// Format large numbers with appropriate abbreviations
export function formatNumber(value: number): string {
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`
  } else if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`
  } else {
    return value.toLocaleString()
  }
}

// Format percentage with + or - sign
export function formatPercentage(value: number): string {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(2)}%`
}
