# Kruuse Medusa Serverless - Memoria del Proyecto

## Resumen del Proyecto
Este proyecto implementa un e-commerce serverless usando módulos de Medusa Commerce v2 desplegado en Vercel con base de datos Supabase PostgreSQL.

## URLs y Accesos
- **URL de Producción**: https://kruuse-medusa-serverless.vercel.app
- **GitHub**: https://github.com/KSS-Develop/kruuse-medusa-serverless
- **Supabase Project**: Configurado en variables de entorno
- **Credenciales**: Ver archivo `.env.local` (no incluido en git)

## Estado Actual
- ✅ Proyecto desplegado exitosamente en Vercel
- ✅ Base de datos Supabase conectada con 151 productos importados
- ✅ API endpoints funcionando para todos los módulos
- ✅ Tablas de Medusa ya creadas en la base de datos

## Arquitectura

### Stack Tecnológico
- **Frontend/Backend**: Next.js 15.4.5 (App Router)
- **Base de Datos**: Supabase PostgreSQL
- **Hosting**: Vercel (serverless)
- **Estilos**: Tailwind CSS v4

### Módulos Implementados
1. **Product Module** - Gestión de productos
2. **Cart Module** - Carrito de compras
3. **Customer Module** - Gestión de clientes
4. **Auth Module** - Autenticación
5. **Order Module** - Gestión de pedidos

## Estructura de Archivos Clave

```
/lib/medusa/
  - product.ts    # Módulo de productos con Supabase
  - cart.ts       # Módulo de carrito
  - customer.ts   # Módulo de clientes
  - auth.ts       # Módulo de autenticación
  - order.ts      # Módulo de órdenes

/app/api/
  - products/route.ts           # GET/POST productos
  - carts/route.ts             # POST crear carrito
  - carts/[id]/route.ts        # GET/POST carrito específico
  - customers/route.ts         # GET/POST clientes
  - auth/register/route.ts     # POST registro
  - auth/login/route.ts        # POST login

/lib/supabase/
  - client.ts    # Cliente Supabase y tipos TypeScript
```

## Decisiones Técnicas Importantes

### 1. Implementación Simplificada
Se optó por usar Supabase directamente en lugar de MedusaModule.bootstrap debido a incompatibilidades con el entorno serverless de Vercel. Los errores incluían:
- "Critical dependency: require function is used in a way in which dependencies cannot be statically extracted"
- Problemas con dependencias como @mikro-orm, umzug, y awilix

### 2. Tipos TypeScript
Se crearon interfaces específicas para evitar el uso de `any`:
- `Product`, `CartData`, `LineItem`, `AuthData`, `Credentials`, etc.

### 3. Next.js 15 Route Handlers
Se actualizó la sintaxis para rutas dinámicas:
```typescript
{ params }: { params: Promise<{ id: string }> }
const { id } = await params
```

## Tablas en Base de Datos
La base de datos tiene todas las tablas de Medusa v2 creadas, incluyendo:
- product (151 productos publicados)
- cart, cart_line_item
- customer, customer_group, customer_address
- order, order_item, order_shipping
- auth_identity, provider_identity
- Y muchas más (170+ tablas en total)

## Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build local (para verificar antes de desplegar)
npm run build

# Desplegar a Vercel
vercel --prod

# Ver logs de Vercel
vercel logs [deployment-url]

# Probar API
curl https://kruuse-medusa-serverless.vercel.app/api/products | jq
```

## Próximos Pasos Sugeridos
1. Implementar UI completa del e-commerce
2. Agregar autenticación JWT real
3. Implementar checkout completo
4. Agregar gestión de inventario
5. Configurar webhooks de Stripe para pagos
6. Implementar búsqueda y filtros de productos
7. Agregar sistema de reviews y ratings
8. Configurar emails transaccionales

## Notas para el Desarrollo
- Siempre hacer `npm run build` localmente antes de desplegar
- Las variables de entorno están en `.env.local` y `.env.production`
- El proyecto usa solo Medusa v2 (no v1)
- Preferir editar archivos existentes sobre crear nuevos
- No crear archivos de documentación a menos que se solicite explícitamente