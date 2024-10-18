import { Client, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

// const globalForDb = globalThis as unknown as {
//   client: Client | undefined;
// };

// export const client =
//   globalForDb.client ?? new Client(process.env.DATABASE_URL!);
// if (process.env.NODE_ENV !== "production") globalForDb.client = client;

// export const db = drizzle(client, { schema });

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
export const db = drizzle(pool);
