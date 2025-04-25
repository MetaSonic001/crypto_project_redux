import { configureStore } from "@reduxjs/toolkit"
import cryptoReducer, {
  updatePrices,
  setSortConfig,
  setFilterValue,
  selectFilteredSortedAssets,
} from "../src/lib/features/crypto-slice"

describe("crypto slice", () => {
  const initialState = {
    assets: [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        price: 50000,
        change24h: 2.5,
        marketCap: 1000000000000,
      },
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        price: 3000,
        change24h: -1.5,
        marketCap: 400000000000,
      },
    ],
    loading: false,
    error: null,
    sortConfig: {
      key: "marketCap",
      direction: "desc",
    },
    filterValue: "",
  }

  let store = configureStore({
    reducer: {
      crypto: cryptoReducer,
    },
    preloadedState: {
      crypto: initialState,
    },
  })

  beforeEach(() => {
    store = configureStore({
      reducer: {
        crypto: cryptoReducer,
      },
      preloadedState: {
        crypto: initialState,
      },
    })
  })

  it("should handle initial state", () => {
    expect(store.getState().crypto).toEqual(initialState)
  })

  it("should handle updatePrices", () => {
    store.dispatch(
      updatePrices({
        id: "bitcoin",
        updates: { price: 55000, change24h: 3.0 },
      }),
    )

    const state = store.getState().crypto
    expect(state.assets[0].price).toEqual(55000)
    expect(state.assets[0].change24h).toEqual(3.0)
  })

  it("should handle setSortConfig", () => {
    store.dispatch(
      setSortConfig({
        key: "price",
        direction: "asc",
      }),
    )

    const state = store.getState().crypto
    expect(state.sortConfig.key).toEqual("price")
    expect(state.sortConfig.direction).toEqual("asc")
  })

  it("should handle setFilterValue", () => {
    store.dispatch(setFilterValue("bit"))

    const state = store.getState().crypto
    expect(state.filterValue).toEqual("bit")
  })

  it("should filter assets correctly", () => {
    store.dispatch(setFilterValue("bit"))

    const state = store.getState()
    const filteredAssets = selectFilteredSortedAssets(state)

    expect(filteredAssets.length).toEqual(1)
    expect(filteredAssets[0].id).toEqual("bitcoin")
  })

  it("should sort assets correctly", () => {
    store.dispatch(
      setSortConfig({
        key: "price",
        direction: "desc",
      }),
    )

    const state = store.getState()
    const sortedAssets = selectFilteredSortedAssets(state)

    expect(sortedAssets[0].id).toEqual("bitcoin")
    expect(sortedAssets[1].id).toEqual("ethereum")
  })

  it("should sort assets in ascending order", () => {
    store.dispatch(
      setSortConfig({
        key: "price",
        direction: "asc",
      }),
    )

    const state = store.getState()
    const sortedAssets = selectFilteredSortedAssets(state)

    expect(sortedAssets[0].id).toEqual("ethereum")
    expect(sortedAssets[1].id).toEqual("bitcoin")
  })
})
