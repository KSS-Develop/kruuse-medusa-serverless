import { initialize as initializeProductModule } from "@medusajs/product"

interface ProductModule {
  listAndCount: (params: { limit: number; offset: number }) => Promise<[unknown[], number]>
  create: (data: unknown) => Promise<unknown>
  list: () => Promise<unknown[]>
}

let productModule: ProductModule | null = null

export async function getProductModule() {
  if (productModule) {
    return productModule
  }

  productModule = await initializeProductModule({
    database: {
      url: process.env.PRODUCT_POSTGRES_URL!,
      schema: "medusa_product"
    }
  }) as ProductModule

  return productModule
}