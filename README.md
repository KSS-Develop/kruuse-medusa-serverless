# Kruuse Medusa Serverless

A serverless e-commerce application built with Medusa Commerce Modules, Next.js 15, and Supabase, deployed on Vercel.

## 🚀 Architecture Overview

This project demonstrates how to use Medusa's Commerce Modules in a serverless environment without running a traditional Medusa backend server. Each module connects directly to the PostgreSQL database and runs in Vercel Functions.

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Commerce Modules**: Medusa v2.8.8
  - Product Module
  - Cart Module
  - Customer Module
  - Auth Module
  - Order Module
- **Database**: Supabase PostgreSQL
- **Deployment**: Vercel
- **Styling**: Tailwind CSS

## 📦 Project Structure

```
kruuse-medusa-serverless/
├── app/
│   ├── api/                    # Serverless API routes
│   │   ├── products/          # Product Module endpoints
│   │   ├── cart/              # Cart Module endpoints
│   │   ├── auth/              # Auth Module endpoints
│   │   ├── customers/         # Customer Module endpoints
│   │   └── orders/            # Order Module endpoints
│   └── page.tsx               # Homepage with product listing
├── lib/
│   └── medusa/
│       └── product.ts         # Product Module initialization
├── next.config.ts             # Next.js configuration
└── vercel.json               # Vercel function configuration
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+
- Supabase account with a project
- Vercel account (for deployment)

### 1. Clone and Install

```bash
git clone https://github.com/your-username/kruuse-medusa-serverless.git
cd kruuse-medusa-serverless
npm install
```

### 2. Environment Variables

Create a `.env.local` file with your credentials:

```env
# PostgreSQL Database (Required for all Medusa modules)
POSTGRES_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
PRODUCT_POSTGRES_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# Medusa Configuration
MEDUSA_FF_MEDUSA_V2=true
MEDUSA_JWT_SECRET=your-secure-jwt-secret-here

# App URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Supabase (optional for additional features)
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Database Setup

The Medusa modules will automatically create their required tables and schemas on first run. Each module uses its own schema:

- `medusa_product` - Product catalog
- `medusa_cart` - Shopping carts
- `medusa_customer` - Customer data
- `medusa_auth` - Authentication
- `medusa_order` - Orders

### 4. Local Development

```bash
npm run dev
```

Visit http://localhost:3000 to see the application.

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy on Vercel

1. Import your GitHub repository on [Vercel](https://vercel.com/new)
2. Add all environment variables from `.env.local`
3. Deploy!

### 3. Update Environment Variables

After deployment, update `NEXT_PUBLIC_BASE_URL` to your Vercel URL:

```env
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

## 🔧 Configuration

### Next.js Configuration

The `next.config.ts` includes required settings for Medusa modules:

```typescript
const nextConfig = {
  serverExternalPackages: [
    "@medusajs/product",
    "@medusajs/cart",
    "@medusajs/customer",
    "@medusajs/auth",
    "@medusajs/order",
  ],
}
```

### Vercel Function Configuration

The `vercel.json` sets maximum duration for serverless functions:

```json
{
  "functions": {
    "app/api/*/route.ts": {
      "maxDuration": 30
    }
  }
}
```

## 📚 API Endpoints

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create a product (Note: Product Module is read-only in beta)

### Cart (To be implemented)
- `POST /api/cart` - Create cart
- `GET /api/cart/:id` - Get cart
- `POST /api/cart/:id/items` - Add item to cart

### Auth (To be implemented)
- `POST /api/auth/register` - Register customer
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Customers (To be implemented)
- `GET /api/customers/:id` - Get customer
- `PUT /api/customers/:id` - Update customer

### Orders (To be implemented)
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Notes

- The Product Module is currently in beta and only supports read operations
- Each Medusa module manages its own database schema
- Serverless functions have a 30-second timeout on Vercel's free tier
- For production use, implement proper error handling and authentication

## 🔗 Resources

- [Medusa Documentation](https://docs.medusajs.com)
- [Commerce Modules](https://docs.medusajs.com/resources/commerce-modules)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)

## 📄 License

This project is licensed under the MIT License.