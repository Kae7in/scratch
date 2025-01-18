import app from "@/app.js";
import { expect, test } from "vitest";

test("test health check", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/",
  });

  expect(response.statusCode).toBe(200);
  expect(response.body.includes("All hail our mighty monolith!"));
});
