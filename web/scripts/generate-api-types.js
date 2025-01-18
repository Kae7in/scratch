import dotenv from "dotenv";

dotenv.config();

const apiUrl = process.env.PUBLIC_API_ORIGIN || "http://localhost:5001";
const command = `npx openapi-typescript ${apiUrl}/docs/json -o ./src/lib/apis/generated-types/api-client.d.ts`;

const { execSync } = await import("child_process");
execSync(command, { stdio: "inherit" });
