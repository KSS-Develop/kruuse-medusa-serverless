import { NextRequest, NextResponse } from "next/server"
import { getAuthModule } from "@/lib/medusa/auth"
import { getCustomerModule } from "@/lib/medusa/customer"

export async function POST(req: NextRequest) {
  try {
    const authService = await getAuthModule()
    const customerService = await getCustomerModule()
    
    const { email, password, first_name, last_name } = await req.json()
    
    // Create customer first
    const [customer] = await customerService.createCustomers([
      {
        email,
        first_name,
        last_name,
      }
    ])
    
    // Create auth identity
    const authIdentity = await authService.createAuthIdentities({
      entity_id: customer.id,
      provider_identities: [
        {
          provider: "emailpass",
          entity_id: customer.id,
          provider_metadata: {
            email,
            password,
          },
        },
      ],
    })
    
    return NextResponse.json({ 
      customer,
      authIdentity: authIdentity[0]
    })
  } catch (error) {
    console.error("Error registering customer:", error)
    return NextResponse.json(
      { error: "Failed to register customer" },
      { status: 500 }
    )
  }
}