import { NextRequest, NextResponse } from "next/server"
import { getCartModule } from "@/lib/medusa/cart"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const cartService = await getCartModule()
    
    // Retrieve cart by ID
    const cart = await cartService.retrieveCart(id, {
      relations: ["items", "items.product"],
    })
    
    return NextResponse.json({ cart })
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    )
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const cartService = await getCartModule()
    const data = await req.json()
    
    // Add items to cart
    if (data.items) {
      const cart = await cartService.addLineItems({
        cartId: id,
        items: data.items,
      })
      
      return NextResponse.json({ cart })
    }
    
    return NextResponse.json(
      { error: "No items provided" },
      { status: 400 }
    )
  } catch (error) {
    console.error("Error updating cart:", error)
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    )
  }
}