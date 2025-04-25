import { configureStore } from "@reduxjs/toolkit"
import cryptoReducer from "./features/crypto-slice"
import demoCryptoReducer from "./features/demo-crypto-slice"

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    demoCrypto: demoCryptoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch