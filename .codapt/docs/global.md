This is a full-stack TypeScript application. We use:

- TanStack Router
- React
- tRPC
- Prisma ORM
- Tailwind
- Zod
- Docker & Docker Compose
- Zustand & Zustand Persist middleware

Whenever possible, try to break up large pages/components into smaller components in their own files.

When storing data like auth tokens, we should use Zustand Persist.

You can import from `src/...` with the alias `~/...`.

Never use headers with tRPC. Pass all data, including authentication tokens, as parameters. We can significantly reduce complexity of our codebase by avoiding middleware.

For our frontend, we use a modern, clean tech-startup aesthetic.

When you use new packages/libraries, make sure to read documents related to them. You do not need to modify `package.json` to install them -- our developer tooling will automatically update `package.json` and install new dependencies when we run the app.
