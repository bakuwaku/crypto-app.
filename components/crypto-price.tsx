interface CryptoPriceProps {
  price: number
}

export function CryptoPrice({ price }: CryptoPriceProps) {
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${price.toLocaleString()}`
    }
    if (price >= 1) {
      return `$${price.toFixed(2)}`
    }
    if (price >= 0.01) {
      return `$${price.toFixed(4)}`
    }
    return `$${price.toFixed(8)}`
  }

  return <div className="font-medium">{formatPrice(price)}</div>
}
