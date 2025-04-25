import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

export interface DemoCryptoAsset {
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

interface DemoCryptoState {
  assets: DemoCryptoAsset[]
  loading: boolean
  error: string | null
  sortConfig: SortConfig
  filterValue: string
  simulationActive: boolean
}

const initialState: DemoCryptoState = {
  assets: [],
  loading: false,
  error: null,
  sortConfig: {
    key: "marketCap",
    direction: "desc",
  },
  filterValue: "",
  simulationActive: true
}

// Demo crypto data
const demoAssets: DemoCryptoAsset[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    price: 60243.52,
    change1h: 0.45,
    change24h: 1.32,
    change7d: 5.67,
    marketCap: 1185632547896,
    volume24h: 28754123654,
    circulatingSupply: 19678450,
    maxSupply: 21000000,
    chartData: "M0,50 L10,48 L20,52 L30,45 L40,55 L50,40 L60,45 L70,35 L80,30 L90,25 L100,20",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    price: 3245.18,
    change1h: -0.23,
    change24h: 2.15,
    change7d: -1.42,
    marketCap: 389452187635,
    volume24h: 15784236547,
    circulatingSupply: 120032541,
    maxSupply: null,
    chartData: "M0,50 L10,55 L20,60 L30,55 L40,65 L50,60 L60,65 L70,60 L80,55 L90,60 L100,55",
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "USDT",
    logo: "https://assets.coingecko.com/coins/images/325/large/tether.png",
    price: 1.00,
    change1h: 0.01,
    change24h: -0.05,
    change7d: 0.02,
    marketCap: 105842367895,
    volume24h: 52741236985,
    circulatingSupply: 105842367895,
    maxSupply: null,
    chartData: "M0,50 L10,50.2 L20,49.8 L30,50.1 L40,49.9 L50,50 L60,50.1 L70,49.9 L80,50 L90,50.2 L100,50",
  },
  {
    id: "binancecoin",
    name: "Binance Coin",
    symbol: "BNB",
    logo: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    price: 605.72,
    change1h: 0.78,
    change24h: -1.05,
    change7d: 3.21,
    marketCap: 93254123654,
    volume24h: 3254789654,
    circulatingSupply: 153854120,
    maxSupply: 200000000,
    chartData: "M0,50 L10,45 L20,48 L30,40 L40,42 L50,38 L60,35 L70,40 L80,38 L90,35 L100,30",
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "XRP",
    logo: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    price: 0.52,
    change1h: -0.35,
    change24h: -2.45,
    change7d: -4.78,
    marketCap: 28457891235,
    volume24h: 1245789632,
    circulatingSupply: 54752145879,
    maxSupply: 100000000000,
    chartData: "M0,50 L10,52 L20,54 L30,58 L40,62 L50,65 L60,70 L70,72 L80,75 L90,78 L100,80",
  },
]

// Function to generate SVG path for chart based on trend
const generateChartPath = (isPositiveTrend: boolean): string => {
  const numPoints = 24;
  const points = [];
  
  let value = 50;
  const maxValue = 90;
  const minValue = 10;
  
  for (let i = 0; i < numPoints; i++) {
    const fluctuation = (Math.random() * 10 - 5);
    const trendBias = isPositiveTrend ? 1.5 : -1.5;
    value = value + fluctuation + trendBias;
    value = Math.max(minValue, Math.min(maxValue, value));
    points.push(`${(i * 100) / (numPoints - 1)},${100 - value}`);
  }
  
  return `M${points.join(' L')}`;
}

// Random price update simulation
const simulateUpdate = (asset: DemoCryptoAsset): DemoCryptoAsset => {
  // Random price change between -2% and +2%
  const priceChangePercent = (Math.random() * 4 - 2) / 100;
  const newPrice = asset.price * (1 + priceChangePercent);
  
  // Random percentage changes
  const change1h = asset.change1h + (Math.random() * 0.4 - 0.2);
  const change24h = asset.change24h + (Math.random() * 0.8 - 0.4);
  const change7d = asset.change7d + (Math.random() * 1.2 - 0.6);
  
  // Random volume change between -1% and +1%
  const volumeChangePercent = (Math.random() * 2 - 1) / 100;
  const newVolume = asset.volume24h * (1 + volumeChangePercent);
  
  // Generate new chart data based on 24h trend
  const chartData = generateChartPath(change24h >= 0);
  
  return {
    ...asset,
    price: newPrice,
    change1h,
    change24h,
    change7d,
    volume24h: newVolume,
    chartData,
  };
}

export const demoCryptoSlice = createSlice({
  name: "demoCrypto",
  initialState,
  reducers: {
    initializeDemoData: (state) => {
      state.assets = demoAssets;
      state.loading = false;
      state.error = null;
    },
    updateDemoAssets: (state) => {
      // Update all assets with random price fluctuations
      state.assets = state.assets.map((asset) => simulateUpdate(asset));
    },
    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload;
    },
    setFilterValue: (state, action: PayloadAction<string>) => {
      state.filterValue = action.payload;
    },
    toggleSimulation: (state) => {
      state.simulationActive = !state.simulationActive;
    }
  },
})

export const { 
  initializeDemoData, 
  updateDemoAssets, 
  setSortConfig, 
  setFilterValue,
  toggleSimulation
} = demoCryptoSlice.actions

// Selectors
export const selectAllDemoAssets = (state: RootState) => state.demoCrypto.assets
export const selectDemoSortConfig = (state: RootState) => state.demoCrypto.sortConfig
export const selectDemoFilterValue = (state: RootState) => state.demoCrypto.filterValue
export const selectSimulationActive = (state: RootState) => state.demoCrypto.simulationActive

// Selector for filtered and sorted assets
export const selectFilteredSortedDemoAssets = (state: RootState) => {
  const { assets, filterValue, sortConfig } = state.demoCrypto

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
    const key = sortConfig.key as keyof DemoCryptoAsset

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

export default demoCryptoSlice.reducer