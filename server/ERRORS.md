# Errors

We use [@fastify/error](https://github.com/fastify/fastify-error) to handle errors in our server.

## Error Codes

There are three classes of error codes that we use:

- `RX_` - Engineering-related errors (blame an engineer): something is missing (parameter, object, etc.), state invalid (impossible state), etc. Report to an engineer to fix.
- `RU_` - Errors caused by the user (blame the user): e.g. failed data validation, missing permissions, etc. User error messages should be concise, and allow users to understand what they did wrong and how to fix it.
- `RA_` - Errors caused by an admin (blame the admin): e.g. rejected input, failed to update data, etc. Admin errors can be more jargony and more verbose and can potentially be lazy ("ping an engineer to fix this").
