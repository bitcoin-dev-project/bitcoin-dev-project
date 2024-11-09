// import { defineConfig } from "drizzle-kit"
// import { config } from 'dotenv';
// config({ path: '.env.local' });

// export default defineConfig({
//     dialect: "postgresql",
//     schema: "./db/schema.ts",
//     out: "./drizzle",
//     driver: "pglite",
//     dbCredentials: {
//         // url: process.env.POSTGRES_URL || ""
//         url: "postgres://default:OT2q9LxjomYd@ep-wispy-bonus-a4kh7jgy.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
//     },
//     verbose: true,
//     strict: true
// })

import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

config({ path: ".env.local" })

export default defineConfig({
    schema: "./db/schema.ts",
    out: "./migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.POSTGRES_URL!
    }
})
