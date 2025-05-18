import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TopCryptosList } from "@/components/top-cryptos-list"
import { MarketOverview } from "@/components/market-overview"
import { TrendingCoins } from "@/components/trending-coins"

export default function HomePage() {
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
              <Link href="/" className="flex items-center text-sm font-medium text-zinc-200 hover:text-white">
                Dashboard
              </Link>
              <Link
                href="/cryptocurrencies"
                className="flex items-center text-sm font-medium text-zinc-400 hover:text-white"
              >
                Cryptocurrencies
              </Link>
              <Link href="/market" className="flex items-center text-sm font-medium text-zinc-400 hover:text-white">
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
        <section className="container space-y-6 py-8 md:py-12 lg:py-16">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Crypto Market Explorer
            </h1>
            <p className="max-w-[42rem] leading-normal text-zinc-400 sm:text-xl sm:leading-8">
              Track top cryptocurrencies, market trends, and get detailed insights in real-time.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1.24T</div>
                <p className="text-xs text-zinc-400">+2.5% from last 24h</p>
              </CardContent>
            </Card>
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-emerald-500"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$48.8B</div>
                <p className="text-xs text-zinc-400">+5.1% from last 24h</p>
              </CardContent>
            </Card>
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">BTC Dominance</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-orange-500"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" x2="9" y1="9" y2="9" />
                  <line x1="15" x2="15" y1="9" y2="9" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">52.3%</div>
                <p className="text-xs text-zinc-400">-0.8% from last 24h</p>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="top-cryptos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-zinc-800/50">
              <TabsTrigger value="top-cryptos">Top Cryptos</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="market-overview">Market Overview</TabsTrigger>
            </TabsList>
            <TabsContent value="top-cryptos" className="border-none p-0 pt-6">
              <TopCryptosList />
            </TabsContent>
            <TabsContent value="trending" className="border-none p-0 pt-6">
              <TrendingCoins />
            </TabsContent>
            <TabsContent value="market-overview" className="border-none p-0 pt-6">
              <MarketOverview />
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
