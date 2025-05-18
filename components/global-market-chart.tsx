"use client"

import { useState, useEffect } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

import { Skeleton } from "@/components/ui/skeleton"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface MarketData {
  date: string
  value: number
}

export function GlobalMarketChart() {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For this example, we'll generate mock data
    const generateMockData = () => {
      const data: MarketData[] = []
      const now = new Date()
      let value = 1200000000000
      for (let i = 30; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)
        // Add some randomness to the data
        value = value + (Math.random() - 0.5) * 50000000000
        data.push({
          date: date.toISOString().split("T")[0],
          value,
        })
      }
      return data
    }

    // Simulate API call
    setTimeout(() => {
      setMarketData(generateMockData())
      setLoading(false)
    }, 1000)
  }, [])

  const formatValue = (value: number) => {
    return `$${(value / 1e12).toFixed(2)}T`
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    return `${d.getDate()} ${d.toLocaleString("default", { month: "short" })}`
  }

  if (loading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  return (
    <div className="h-[300px] w-full p-4">
      <ChartContainer
        config={{
          marketCap: {
            label: "Market Cap",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={marketData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tickFormatter={formatDate} stroke="hsl(var(--muted-foreground))" tickLine={false} />
            <YAxis
              tickFormatter={formatValue}
              stroke="hsl(var(--muted-foreground))"
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="value"
              name="marketCap"
              stroke="var(--color-marketCap)"
              fill="var(--color-marketCap)"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
