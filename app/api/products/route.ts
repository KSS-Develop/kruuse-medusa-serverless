import { NextRequest, NextResponse } from "next/server"
import { getProductModule } from "@/lib/medusa/product"

export async function GET() {
  try {
    const productService = await getProductModule()
    
    if (!productService) {
      throw new Error("Product service not initialized")
    }
    
    // List products using the correct v2 method
    const products = await productService.listProducts()
    
    return NextResponse.json({
      products
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const productService = await getProductModule()
    
    if (!productService) {
      throw new Error("Product service not initialized")
    }
    
    const data = await req.json()
    
    // Create a new product using the correct v2 method
    const product = await productService.createProducts(data)
    
    return NextResponse.json({ product })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
}