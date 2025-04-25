import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

export interface CryptoAsset {
  id: string
  name: string
  symbol: string
  logo: string
  price: number
  change1h: number
  change24h: number
  change7d: number
  marketCap: number
  volume24h: number
  circulatingSupply: number
  maxSupply: number | null
  chartData: string
}

interface SortConfig {
  key: string
  direction: "asc" | "desc"
}

interface CryptoState {
  assets: CryptoAsset[]
  loading: boolean
  error: string | null
  sortConfig: SortConfig
  filterValue: string
}

const initialState: CryptoState = {
  assets: [],
  loading: false,
  error: null,
  sortConfig: {
    key: "marketCap",
    direction: "desc",
  },
  filterValue: "",
}

// Map WebSocket IDs to asset IDs
const wsIdToAssetId: Record<string, string> = {
  bitcoin: "bitcoin",
  ethereum: "ethereum",
  tether: "tether",
  binancecoin: "binancecoin",
  ripple: "xrp",
  solana: "solana",
  cardano: "cardano",
  polkadot: "polkadot",
  dogecoin: "dogecoin",
  avalanche: "avalanche-2",
}

// Async thunk for fetching crypto data
export const fetchCryptoData = createAsyncThunk("crypto/fetchData", async () => {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h,24h,7d")

    if (!response.ok) {
      throw new Error("Failed to fetch crypto data")
    }

    const data = await response.json()

    return data.map((asset: any) => ({
      id: asset.id,
      name: asset.name,
      symbol: asset.symbol.toUpperCase(),
      logo: asset.image,
      price: asset.current_price,
      change1h: asset.price_change_percentage_1h_in_currency ?? 0,
      change24h: asset.price_change_percentage_24h_in_currency ?? 0,
      change7d: asset.price_change_percentage_7d_in_currency ?? 0,
      marketCap: asset.market_cap,
      volume24h: asset.total_volume,
      circulatingSupply: asset.circulating_supply,
      maxSupply: asset.max_supply,
      chartData: generateChartPath((asset.price_change_percentage_24h_in_currency ?? 0) >= 0),
    }))
  } catch (error) {
    throw new Error("Failed to fetch crypto data. Please try again later.")
  }
})

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updatePrices: (state, action: PayloadAction<{ id: string; updates: Partial<CryptoAsset> }>) => {
      const { id, updates } = action.payload
      
      // Find the asset by WebSocket ID mapping
      const assetId = wsIdToAssetId[id] || id
      const assetIndex = state.assets.findIndex((asset) => asset.id === assetId)
      
      if (assetIndex !== -1) {
        // Update price and other fields
        state.assets[assetIndex] = { 
          ...state.assets[assetIndex], 
          ...updates,
          // Update chart data based on price trend
          chartData: updates.change24h !== undefined 
            ? generateChartPath(updates.change24h >= 0) 
            : state.assets[assetIndex].chartData
        }
      }
    },
    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload
    },
    setFilterValue: (state, action: PayloadAction<string>) => {
      state.filterValue = action.payload
    },
    setAssets: (state, action: PayloadAction<CryptoAsset[]>) => {
      state.assets = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false
        state.assets = action.payload
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "An unknown error occurred"
      })
  },
})

export const { updatePrices, setSortConfig, setFilterValue, setAssets } = cryptoSlice.actions

// Selectors
export const selectAllAssets = (state: RootState) => state.crypto.assets
export const selectAssetById = (state: RootState, id: string) => state.crypto.assets.find((asset) => asset.id === id)
export const selectSortConfig = (state: RootState) => state.crypto.sortConfig
export const selectFilterValue = (state: RootState) => state.crypto.filterValue
export const selectLoading = (state: RootState) => state.crypto.loading
export const selectError = (state: RootState) => state.crypto.error

// Selector for filtered and sorted assets
export const selectFilteredSortedAssets = (state: RootState) => {
  const { assets, filterValue, sortConfig } = state.crypto

  // Filter assets
  const filteredAssets = filterValue
    ? assets.filter(
        (asset) =>
          asset.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          asset.symbol.toLowerCase().includes(filterValue.toLowerCase()),
      )
    : assets

  // Sort assets
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    const key = sortConfig.key as keyof CryptoAsset

    if (typeof a[key] === "string" && typeof b[key] === "string") {
      return sortConfig.direction === "asc"
        ? (a[key] as string).localeCompare(b[key] as string)
        : (b[key] as string).localeCompare(a[key] as string)
    }

    if (typeof a[key] === "number" && typeof b[key] === "number") {
      return sortConfig.direction === "asc"
        ? (a[key] as number) - (b[key] as number)
        : (b[key] as number) - (a[key] as number)
    }

    return 0
  })

  return sortedAssets
}

// Generate SVG path for chart
function generateChartPath(isPositiveTrend: boolean): string {
  // Generate points for path
  const numPoints = 24;
  const points = [];
  
  // Start with a base value
  let value = 50;
  const maxValue = 90;
  const minValue = 10;
  
  // Generate a smooth upward or downward trend with fluctuations
  for (let i = 0; i < numPoints; i++) {
    // Random fluctuation
    const fluctuation = (Math.random() * 10 - 5);
    
    // Add trend bias
    const trendBias = isPositiveTrend ? 1.5 : -1.5;
    
    // Update value with fluctuation and trend
    value = value + fluctuation + trendBias;
    
    // Constrain within bounds
    value = Math.max(minValue, Math.min(maxValue, value));
    
    // Add point to path
    points.push(`${(i * 100) / (numPoints - 1)},${100 - value}`);
  }
  
  // Create SVG path
  return `M${points.join(' L')}`;
}

export default cryptoSlice.reducer