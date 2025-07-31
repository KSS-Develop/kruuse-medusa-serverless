import { MedusaModule } from "@medusajs/modules-sdk"
import { ICustomerModuleService } from "@medusajs/types"

let customerService: ICustomerModuleService | null = null

export async function getCustomerModule(): Promise<ICustomerModuleService> {
  if (customerService) {
    return customerService
  }

  const { service } = await MedusaModule.bootstrap(
    "customer",
    "customerScope",
    {
      database: {
        clientUrl: process.env.POSTGRES_URL!,
      },
    }
  )

  customerService = service as ICustomerModuleService
  return customerService
}