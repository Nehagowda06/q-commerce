# Savega Backend

Express.js + TypeScript backend for the Savega Q-Commerce app.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Auth**: Supabase Auth
- **Payments**: Razorpay
- **Validation**: Zod

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - Supabase PostgreSQL connection string
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `RAZORPAY_KEY_ID` - Razorpay API key ID
- `RAZORPAY_KEY_SECRET` - Razorpay API key secret

### 3. Setup Database

Generate Prisma client:
```bash
npm run db:generate
```

Push schema to database:
```bash
npm run db:push
```

Seed with sample data:
```bash
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Server runs at `http://localhost:4000`

## API Endpoints

### Public (No Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/categories` | List grocery categories |
| GET | `/api/products` | List/search products |
| GET | `/api/products/:id` | Get product details |
| GET | `/api/food/categories` | List food categories |
| GET | `/api/restaurants` | List restaurants |
| GET | `/api/restaurants/:id` | Get restaurant with menu |
| GET | `/api/search?q=` | Global search |

### Protected (Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user's cart |
| POST | `/api/cart/items` | Add to cart |
| PATCH | `/api/cart/items/:id` | Update quantity |
| DELETE | `/api/cart/items/:id` | Remove from cart |
| GET | `/api/orders` | List user's orders |
| POST | `/api/orders` | Create order |
| GET | `/api/orders/:id` | Get order details |
| GET | `/api/profile` | Get user profile |
| PATCH | `/api/profile` | Update profile |
| GET | `/api/addresses` | List addresses |
| POST | `/api/addresses` | Add address |
| GET | `/api/lists` | Get grocery lists |
| POST | `/api/lists` | Create list |
| POST | `/api/payments/create` | Create Razorpay order |
| POST | `/api/payments/verify` | Verify payment |

## Authentication

The API uses Supabase Auth. Include the JWT token in requests:

```
Authorization: Bearer <supabase_access_token>
```

## Project Structure

```
backend/
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── config/            # Environment, database, Supabase config
│   ├── middleware/        # Auth, validation, error handling
│   ├── modules/           # Feature modules
│   │   ├── catalog/       # Categories & products
│   │   ├── food/          # Restaurants & menu
│   │   ├── cart/          # Shopping cart
│   │   ├── orders/        # Order management
│   │   ├── users/         # Profile & addresses
│   │   ├── lists/         # Grocery lists
│   │   ├── payments/      # Razorpay integration
│   │   └── search/        # Global search
│   ├── db/
│   │   └── seed.ts        # Database seeder
│   ├── app.ts             # Express app setup
│   └── server.ts          # Server entry point
├── .env.example
├── package.json
└── tsconfig.json
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run migrations |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Seed database |

## Deployment

### Render

1. Create a new Web Service
2. Connect your GitHub repo
3. Set build command: `npm install && npm run build && npm run db:generate`
4. Set start command: `npm start`
5. Add environment variables

### Environment Variables for Production

```
NODE_ENV=production
PORT=4000
FRONTEND_URL=https://your-frontend.vercel.app
DATABASE_URL=postgresql://...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
RAZORPAY_KEY_ID=xxx
RAZORPAY_KEY_SECRET=xxx
```
