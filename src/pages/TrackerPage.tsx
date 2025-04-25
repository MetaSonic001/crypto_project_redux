"use client"

import { Provider } from "react-redux"
import { store } from "../lib/store"
import CryptoTable from "../components/crypto-table"
import CryptoHeader from "../components/crypto-header"
import { useEffect } from "react"
import { loadState } from "../lib/local-storage"
import { ThemeProvider } from "../components/theme-provider"

export default function TrackerPage() {
  // Load state from localStorage on initial render
  useEffect(() => {
    loadState()
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="crypto-theme">
        <main className="container mx-auto py-8 px-4">
          <CryptoHeader />
          <CryptoTable />
        </main>
      </ThemeProvider>
    </Provider>
  )
}