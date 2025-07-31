"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [products, setProducts] = useState<unknown[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      const data = await response.json()
      setProducts(data.products || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Kruuse Medusa Serverless</h1>
      
      <div className="mb-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-2">Status</h2>
        <p>🚀 Running on Vercel with Medusa Commerce Modules</p>
        <p>💾 Database: Supabase PostgreSQL</p>
        <p>📦 Modules: Product, Cart, Customer, Auth, Order</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      
      {loading && <p>Loading products...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      )}
      
      {!loading && !error && products.length === 0 && (
        <p>No products found. The database might need initialization.</p>
      )}
      
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product: any) => (
            <div key={product.id} className="border p-4 rounded">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}