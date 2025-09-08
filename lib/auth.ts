import { db } from "@/drizzle/db";
import { schema } from "@/drizzle/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true
  },
  
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  
  // Add these configurations to fix the INVALID_ORIGIN error
  baseURL: process.env.BETTER_AUTH_URL || "https://www.redeemlynow.com",
  
  trustedOrigins: [
    "https://www.redeemlynow.com",
    "https://redeemlynow.com", // without www if applicable
    ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
  ],
  
  // Optional: Add session configuration
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache for 5 minutes
    },
  },
  
  // Optional: Advanced security settings
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  },
});