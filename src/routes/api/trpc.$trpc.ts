import { createAPIFileRoute } from "@tanstack/react-start/api";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

const setCorsHeaders = (res: Response) => {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Headers", "*");
};

const handler = async ({ request }: { request: Request }) => {
  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: () => createTRPCContext({ headers: request.headers }),
    onError: ({ path, error }) => {
      console.error(
        `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
      );
    },
  });

  setCorsHeaders(response);

  return response;
};

const optionsHandler = async ({ request }: { request: Request }) => {
  const response = new Response();
  setCorsHeaders(response);
  return response;
};

export const APIRoute = createAPIFileRoute("/api/trpc/$trpc")({
  GET: handler,
  POST: handler,
  OPTIONS: optionsHandler,
});
