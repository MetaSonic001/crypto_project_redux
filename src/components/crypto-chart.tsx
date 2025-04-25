interface CryptoChartProps {
  data: string
  color: string
  width?: number
  height?: number
}

export default function CryptoChart({ data, color, width = 100, height = 40 }: CryptoChartProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d={data} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}