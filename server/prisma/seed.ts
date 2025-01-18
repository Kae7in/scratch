import { createHash } from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function deterministicUUID(input: string): string {
  // Hash the input using SHA-1
  const hash = createHash("sha1").update(input).digest("hex");

  // Convert the first 32 characters of the hash into UUID format
  return `${hash.substring(0, 8)}-${hash.substring(8, 12)}-${hash.substring(12, 16)}-${hash.substring(16, 20)}-${hash.substring(20, 32)}`;
}

async function main() {
  console.log("Database seeding script running...");

  // Prisma seed...
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
