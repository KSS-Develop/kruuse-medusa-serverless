import { initialize as initializeProductModule } from "@medusajs/product"

let productModule: any = null

export async function getProductModule() {
  if (productModule) {
    return productModule
  }

  productModule = await initializeProductModule({
    database: {
      url: process.env.PRODUCT_POSTGRES_URL!,
      schema: "medusa_product"
    }
  })

  return productModule
}