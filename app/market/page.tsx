import Link from "next/link"
import { TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketStats } from "@/components/market-stats"
import { GlobalMarketChart } from "@/components/global-market-chart"
import { TopGainers } from "@/components/top-gainers"
import { TopLosers } from "@/components/top-losers"

export default function MarketPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-950 text-zinc-50">
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-emerald-500" />
              <span className="inline-block font-bold">CryptoTracker</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link href="/" className="flex items-center text-sm font-medium text-zinc-400 hover:text-white">
                Dashboard
              </Link>
              <Link
                href="/cryptocurrencies"
                className="flex items-center text-sm font-medium text-zinc-400 hover:text-white"
              >
                Cryptocurrencies
              </Link>
              <Link href="/market" className="flex items-center text-sm font-medium text-zinc-200 hover:text-white">
                Market
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="outline" className="border-zinc-700 text-zinc-200 hover:bg-zinc-800">
              Connect Wallet
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container space-y-6 py-8 md:py-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Market Overview</h1>
            <p className="text-zinc-400">Global cryptocurrency market statistics and trends</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-zinc-800 bg-zinc-900">
              <CardHeader>
                <CardTitle>Market Statistics</CardTitle>
                <CardDescription>Key metrics of the global crypto market</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketStats />
              </CardContent>
            </Card>
            <Card className="border-zinc-800 bg-zinc-900">
              <CardHeader>
                <CardTitle>Global Market Cap</CardTitle>
                <CardDescription>Total cryptocurrency market capitalization</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <GlobalMarketChart />
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="gainers-losers" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-800/50">
              <TabsTrigger value="gainers-losers">Gainers & Losers</TabsTrigger>
              <TabsTrigger value="market-dominance">Market Dominance</TabsTrigger>
            </TabsList>
            <TabsContent value="gainers-losers" className="border-none p-0 pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-zinc-800 bg-zinc-900">
                  <CardHeader>
                    <CardTitle>Top Gainers (24h)</CardTitle>
                    <CardDescription>Cryptocurrencies with highest price increase</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TopGainers />
                  </CardContent>
                </Card>
                <Card className="border-zinc-800 bg-zinc-900">
                  <CardHeader>
                    <CardTitle>Top Losers (24h)</CardTitle>
                    <CardDescription>Cryptocurrencies with highest price decrease</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TopLosers />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="market-dominance" className="border-none p-0 pt-6">
              <Card className="border-zinc-800 bg-zinc-900">
                <CardHeader>
                  <CardTitle>Market Dominance</CardTitle>
                  <CardDescription>Percentage of total market capitalization by cryptocurrency</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <p className="text-zinc-400">Market dominance chart will appear here</p>
                      <p className="text-sm text-zinc-500">Loading data...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <footer className="border-t border-zinc-800 bg-zinc-950 py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm text-zinc-400 md:text-left">
            &copy; {new Date().getFullYear()} CryptoTracker. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-zinc-400 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-zinc-400 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
