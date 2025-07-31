import { MedusaModule } from "@medusajs/modules-sdk"
import { ICartModuleService } from "@medusajs/types"

let cartService: ICartModuleService | null = null

export async function getCartModule(): Promise<ICartModuleService> {
  if (cartService) {
    return cartService
  }

  const { service } = await MedusaModule.bootstrap(
    "cart",
    "cartScope",
    {
      database: {
        clientUrl: process.env.POSTGRES_URL!,
      },
    }
  )

  cartService = service as ICartModuleService
  return cartService
}