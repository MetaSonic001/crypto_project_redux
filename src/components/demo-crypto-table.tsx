"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table"
import {
  selectFilteredSortedDemoAssets,
  selectSimulationActive,
  toggleSimulation,
  updateDemoAssets
} from "../lib/features/demo-crypto-slice"
import CryptoRow from "./crypto-row"
import { Button } from "./ui/button"
import { Pause, Play } from "lucide-react"

export default function DemoCryptoTable() {
  const assets = useSelector(selectFilteredSortedDemoAssets)
  const simulationActive = useSelector(selectSimulationActive)
  const dispatch = useDispatch()

  // Set up interval for simulated updates
  useEffect(() => {
    let intervalId: number | undefined

    if (simulationActive) {
      // Update crypto data every 2 seconds
      intervalId = window.setInterval(() => {
        dispatch(updateDemoAssets())
      }, 2000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [dispatch, simulationActive])

  const handleToggleSimulation = () => {
    dispatch(toggleSimulation())
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleToggleSimulation}
          className={simulationActive ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}
        >
          {simulationActive ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Pause Simulation
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Resume Simulation
            </>
          )}
        </Button>
      </div>
      
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
    </div>
  )
}