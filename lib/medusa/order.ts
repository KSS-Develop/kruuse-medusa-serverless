import { MedusaModule } from "@medusajs/modules-sdk"
import { IOrderModuleService } from "@medusajs/types"

let orderService: IOrderModuleService | null = null

export async function getOrderModule(): Promise<IOrderModuleService> {
  if (orderService) {
    return orderService
  }

  const { service } = await MedusaModule.bootstrap(
    "order",
    "orderScope",
    {
      database: {
        clientUrl: process.env.POSTGRES_URL!,
      },
    }
  )

  orderService = service as IOrderModuleService
  return orderService
}