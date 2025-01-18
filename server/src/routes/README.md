# Scratch API Routes

### Rules for Creating Routes

- Only one route per file.
- Name your file using the format `method.noun-verb.ts`.
  - Ex. `get.auth-login.ts`, `post:course-publish.ts`
- Every route folder gets an `index.ts`.
- Define route prefixes in `index.ts` instead of route files themselves.
  - Ex. `fastify.register(PostCourseCreate, { prefix: "/create" });`
- Every route should include `tags` (ex. ["auth"]) and a one-line `summary` (ex. "Log a user in.")
- Routes should include a Zod schema directly in the file (Params, Body, Querystring).
- If a route's schema is needed by a frontend form, put it in the `web-schema/` package instead.

### Local Development Tips

- Use the file naming scheme to quick-find routes. Ex. Find all auth routes by searcing for `.auth`. Find all ways to get cohorts by searching for `get.cohort`.

### Testing

TBD
