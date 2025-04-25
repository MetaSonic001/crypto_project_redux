import { store } from "./store"
import { setAssets } from "./features/crypto-slice"
import type { CryptoAsset } from "./features/crypto-slice"

// Save state to localStorage
export const saveState = (state: { assets: CryptoAsset[] }) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("cryptoTrackerState", serializedState)
  } catch (error) {
    console.error("Could not save state to localStorage:", error)
  }
}

// Load state from localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cryptoTrackerState")

    if (serializedState === null) {
      return undefined
    }

    const state = JSON.parse(serializedState)

    // Dispatch the loaded assets to Redux store
    if (state.assets && state.assets.length > 0) {
      store.dispatch(setAssets(state.assets))
    }

    return state
  } catch (error) {
    console.error("Could not load state from localStorage:", error)
    return undefined
  }
}
