"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table"
import {
  selectFilteredSortedAssets,
  fetchCryptoData,
  selectLoading,
  selectError,
} from "../lib/features/crypto-slice"
import CryptoRow from "./crypto-row"
import { saveState } from "../lib/local-storage"
import { Skeleton } from "./ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { AlertCircle } from "lucide-react"

export default function CryptoTable() {
  const assets = useSelector(selectFilteredSortedAssets)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const dispatch = useDispatch()

  // Initial data fetch
  useEffect(() => {
    dispatch(fetchCryptoData() as any)
  }, [dispatch])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (assets.length > 0) {
      saveState({ assets })
    }
  }, [assets])

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}. Please try refreshing the page.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="w-full overflow-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Asset</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">1h %</TableHead>
            <TableHead className="text-right">24h %</TableHead>
            <TableHead className="text-right">7d %</TableHead>
            <TableHead className="text-right">Market Cap</TableHead>
            <TableHead className="text-right">24h Volume</TableHead>
            <TableHead className="text-right">Circulating Supply</TableHead>
            <TableHead className="text-right">Max Supply</TableHead>
            <TableHead className="text-right w-[100px]">7D Chart</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.length > 0 ? (
            assets.map((asset) => <CryptoRow key={asset.id} asset={asset} />)
          ) : (
            <TableRow>
              <TableHead colSpan={10} className="text-center py-8">
                No assets found. Try adjusting your filter.
              </TableHead>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}