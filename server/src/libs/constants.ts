import { CookieSerializeOptions } from "@fastify/cookie";
import dotenv from "dotenv";

dotenv.config({ path: `.env.local` });

export const NODE_ENV = process.env.NODE_ENV as
  | "development"
  | "staging"
  | "production"
  | "testing";

export const API_ORIGIN = process.env.API_ORIGIN ?? "http://localhost:5001";
export const API_DOMAIN = new URL(API_ORIGIN).hostname;

export const CLIENT_ORIGIN =
  process.env.CLIENT_ORIGIN ?? "http://localhost:3000";

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const COOKIE_SECRET = process.env.COOKIE_SECRET as string;

export const COOKIE_OPTIONS: CookieSerializeOptions = {
  path: "/",
  httpOnly: true,
  secure:
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging",
  sameSite: "lax",
  maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  signed: true,
  ...(process.env.COOKIE_DOMAIN && {
    domain: process.env.COOKIE_DOMAIN,
  }),
};

export const TRUSTED_DOMAINS = [
  "your-domain.com"
];