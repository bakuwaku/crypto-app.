"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CryptoPrice } from "@/components/crypto-price"

interface Cryptocurrency {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  price_change_percentage_24h: number
  total_volume: number
}

export function CryptoTable() {
  const [cryptos, setCryptos] = useState<Cryptocurrency[]>([])
  const [loading, setLoading] = useState(true)
  const [sortColumn, setSortColumn] = useState<string>("market_cap_rank")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=en",
        )
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const data = await response.json()
        setCryptos(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error)
        // Use mock data if API fails
        const mockData = []
        for (let i = 1; i <= 50; i++) {
          mockData.push({
            id: `crypto-${i}`,
            symbol: `sym${i}`,
            name: `Cryptocurrency ${i}`,
            image: `/placeholder.svg?height=32&width=32`,
            current_price: 1000 / i,
            market_cap: 1000000000 / i,
            market_cap_rank: i,
            price_change_percentage_24h: Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1),
            total_volume: 500000000 / i,
          })
        }
        setCryptos(mockData)
        setLoading(false)
      }
    }

    fetchCryptos()
  }, [])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedCryptos = [...cryptos].sort((a: any, b: any) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`
    }
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`
    }
    if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`
    }
    return `$${marketCap.toLocaleString()}`
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`
    }
    if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`
    }
    if (volume >= 1e3) {
      return `$${(volume / 1e3).toFixed(2)}K`
    }
    return `$${volume.toLocaleString()}`
  }

  if (loading) {
    return (
      <div className="rounded-md border border-zinc-800 bg-zinc-900">
        <div className="h-[500px] w-full p-4">
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            {[...Array(10)].map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-900">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-zinc-800/50">
              <TableHead className="w-[80px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("market_cap_rank")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  #
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  Name
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("current_price")}
                  className="flex items-center justify-end gap-1 px-0 hover:bg-transparent"
                >
                  Price
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("price_change_percentage_24h")}
                  className="flex items-center justify-end gap-1 px-0 hover:bg-transparent"
                >
                  24h %
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="hidden text-right md:table-cell">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("market_cap")}
                  className="flex items-center justify-end gap-1 px-0 hover:bg-transparent"
                >
                  Market Cap
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="hidden text-right lg:table-cell">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("total_volume")}
                  className="flex items-center justify-end gap-1 px-0 hover:bg-transparent"
                >
                  Volume (24h)
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCryptos.map((crypto) => (
              <TableRow key={crypto.id} className="hover:bg-zinc-800/50">
                <TableCell className="font-medium">{crypto.market_cap_rank}</TableCell>
                <TableCell>
                  <Link href={`/cryptocurrencies/${crypto.id}`} className="flex items-center gap-2 hover:underline">
                    <img
                      src={crypto.image || "/placeholder.svg"}
                      alt={crypto.name}
                      className="h-6 w-6 rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `/placeholder.svg?height=24&width=24`
                      }}
                    />
                    <div>
                      <span className="font-medium">{crypto.name}</span>
                      <span className="ml-2 text-xs text-zinc-400">{crypto.symbol.toUpperCase()}</span>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <CryptoPrice price={crypto.current_price} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {crypto.price_change_percentage_24h > 0 ? (
                      <ChevronUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={crypto.price_change_percentage_24h > 0 ? "text-emerald-500" : "text-red-500"}>
                      {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden text-right md:table-cell">{formatMarketCap(crypto.market_cap)}</TableCell>
                <TableCell className="hidden text-right lg:table-cell">{formatVolume(crypto.total_volume)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
