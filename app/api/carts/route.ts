import { NextRequest, NextResponse } from "next/server"
import { getCartModule } from "@/lib/medusa/cart"

export async function POST(req: NextRequest) {
  try {
    const cartService = await getCartModule()
    
    const data = await req.json()
    
    // Create a new cart
    const cart = await cartService.createCarts(data)
    
    return NextResponse.json({ cart: cart[0] })
  } catch (error) {
    console.error("Error creating cart:", error)
    return NextResponse.json(
      { error: "Failed to create cart" },
      { status: 500 }
    )
  }
}