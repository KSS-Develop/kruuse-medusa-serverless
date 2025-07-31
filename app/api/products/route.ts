import { NextRequest, NextResponse } from "next/server"
import { getProductModule } from "@/lib/medusa/product"

export async function GET(req: NextRequest) {
  try {
    const productService = await getProductModule()
    
    // Get query parameters
    const searchParams = req.nextUrl.searchParams
    const limit = searchParams.get("limit") || "10"
    const offset = searchParams.get("offset") || "0"
    
    // List products
    const [products, count] = await productService.listAndCount({
      limit: parseInt(limit),
      offset: parseInt(offset)
    })
    
    return NextResponse.json({
      products,
      count,
      limit: parseInt(limit),
      offset: parseInt(offset)
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
    const data = await req.json()
    
    // Create a new product
    const product = await productService.create(data)
    
    return NextResponse.json({ product })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
}