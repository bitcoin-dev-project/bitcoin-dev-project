import { config } from "dotenv"
import { drizzle } from "drizzle-orm/neon-http"

config({ path: ".env.local" }) // or .env.local

export const db = drizzle(process.env.POSTGRES_URL!)
