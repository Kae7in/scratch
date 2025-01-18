// import { afterAll, beforeEach } from "vitest";

// import { app } from "./app.js";
// import { resetTestDatabase } from "./utils/db-helpers.js";

// beforeEach(async () => {
//   await resetTestDatabase();
// });

// afterAll(async () => {
//   await app.close();
// });

/**
 * Use app.inject() for:
 * - Fast, lightweight tests
 * - Testing route handlers in isolation
 * - Checking status codes and headers
 * - Testing in-memory features like caches

  test("with HTTP injection", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/",
    });

    expect(response.statusCode).toBe(200);
  });
*/

/**
 * Use actual server listening with fetch for:
 * - Testing real network interactions
 * - Verifying server startup behavior
 * - Testing WebSocket connections or server-sent events
 * - When you need to test against a specific port or address

  test("with a running server", async () => {
    await app.listen();
    await app.ready();

    const address = app.server.address();
    const port = typeof address === "string" ? address : address?.port;

    const response = await fetch(`http://localhost:${port}`);
    const res = await response.text();

    expect(response.status).toBe(200);
    expect(res).contains("All hail our mighty monolith!");
  });
*/
