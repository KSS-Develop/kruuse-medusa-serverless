import { NextRequest, NextResponse } from "next/server"
import { getAuthModule } from "@/lib/medusa/auth"

export async function POST(req: NextRequest) {
  try {
    const authService = await getAuthModule()
    
    const { email, password } = await req.json()
    
    // Authenticate the user
    const authResponse = await authService.authenticate("emailpass", {
      email,
      password,
    })
    
    if (!authResponse.success) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }
    
    return NextResponse.json({ 
      success: true,
      authIdentity: authResponse.authIdentity,
      location: authResponse.location,
    })
  } catch (error) {
    console.error("Error authenticating customer:", error)
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    )
  }
}