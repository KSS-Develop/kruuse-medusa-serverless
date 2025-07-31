import { MedusaModule } from "@medusajs/modules-sdk"
import { IProductModuleService } from "@medusajs/types"

let productService: IProductModuleService | null = null

export async function getProductModule(): Promise<IProductModuleService> {
  if (productService) {
    return productService
  }

  const { service } = await MedusaModule.bootstrap(
    "product",
    "productScope",
    {
      database: {
        clientUrl: process.env.POSTGRES_URL!,
      },
    }
  )

  productService = service as IProductModuleService
  return productService
}