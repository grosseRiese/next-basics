export type Product = {
  id: string
  name: string
  price: number
}

export const products: Product[] = [
  { id: "product-1", name: "iPhone 17 Pro Max", price: 16_000 },
  { id: "product-2", name: "Macbook Pro (M5)", price: 20_000 },
  { id: "product-3", name: "Apple Watch Series 11", price: 6_000 },
]
