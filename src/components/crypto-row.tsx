import { TableCell, TableRow } from "./ui/table"
import type { CryptoAsset } from "../lib/features/crypto-slice"
import { formatCurrency, formatNumber, formatPercentage } from "../lib/utils"
import CryptoChart from "./crypto-chart"

interface CryptoRowProps {
  asset: CryptoAsset
}

export default function CryptoRow({ asset }: CryptoRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <img
              src={asset.logo || "/placeholder.svg"}
              alt={asset.name}
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
          <div>
            <div>{asset.name}</div>
            <div className="text-muted-foreground text-sm">{asset.symbol}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right font-medium">{formatCurrency(asset.price)}</TableCell>
      <TableCell className={`text-right ${asset.change1h >= 0 ? "text-green-500" : "text-red-500"}`}>
        {formatPercentage(asset.change1h)}
      </TableCell>
      <TableCell className={`text-right ${asset.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
        {formatPercentage(asset.change24h)}
      </TableCell>
      <TableCell className={`text-right ${asset.change7d >= 0 ? "text-green-500" : "text-red-500"}`}>
        {formatPercentage(asset.change7d)}
      </TableCell>
      <TableCell className="text-right">{formatCurrency(asset.marketCap, 0)}</TableCell>
      <TableCell className="text-right">{formatCurrency(asset.volume24h, 0)}</TableCell>
      <TableCell className="text-right">{formatNumber(asset.circulatingSupply)}</TableCell>
      <TableCell className="text-right">{asset.maxSupply ? formatNumber(asset.maxSupply) : "∞"}</TableCell>
      <TableCell className="text-right">
        <CryptoChart data={asset.chartData} color={asset.change7d >= 0 ? "#10b981" : "#ef4444"} />
      </TableCell>
    </TableRow>
  )
}
