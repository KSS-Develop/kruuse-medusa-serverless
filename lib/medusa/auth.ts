import { MedusaModule } from "@medusajs/modules-sdk"
import { IAuthModuleService } from "@medusajs/types"

let authService: IAuthModuleService | null = null

export async function getAuthModule(): Promise<IAuthModuleService> {
  if (authService) {
    return authService
  }

  const { service } = await MedusaModule.bootstrap(
    "auth",
    "authScope",
    {
      database: {
        clientUrl: process.env.POSTGRES_URL!,
      },
      providers: [
        {
          name: "emailpass",
          scopes: {
            admin: {
              hashConfig: {
                rounds: 10,
              },
            },
            customer: {
              hashConfig: {
                rounds: 10,
              },
            },
          },
        },
      ],
    }
  )

  authService = service as IAuthModuleService
  return authService
}