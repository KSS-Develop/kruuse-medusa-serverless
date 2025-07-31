import { NextRequest, NextResponse } from "next/server"
import { getCustomerModule } from "@/lib/medusa/customer"

export async function GET() {
  try {
    const customerService = await getCustomerModule()
    
    // List customers
    const { customers } = await customerService.listCustomers()
    
    return NextResponse.json({
      customers: customers || []
    })
  } catch (error) {
    console.error("Error fetching customers:", error)
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const customerService = await getCustomerModule()
    
    const data = await req.json()
    
    // Create a new customer
    const [customer] = await customerService.createCustomers([data])
    
    return NextResponse.json({ customer })
  } catch (error) {
    console.error("Error creating customer:", error)
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    )
  }
}