Here's how you can define a tRPC subscription procedure which can push updated data to the client when state changes:

```
export const someSubscriptionProcedure = baseProcedure
  .input(
    z.object({
      // ...
    }),
  )
  .subscription(async function* ({ input }) {
    while (true) {
      // ...
      yield {
        some: "data",
      };
      // ...
    }
  });
```

Always use async generator functions for subscriptions! Observables are no longer acceptable as tRPC subscriptions.

Here's hwo you can consume it in the React client:

```
// ...

const subscription = api.someSubscriptionProcedure.useSubscription(/* input here if needed */)

// subscription.data will be undefined or the latest data from the query

// ...
```

On the client, you should also make sure that you have a splitLink with an unstable_httpSubscriptionLink like this:

```
// ...

const [trpcClient] = useState(() =>
  api.createClient({
    links: [
      loggerLink({
        enabled: (op) =>
          process.env.NODE_ENV === "development" ||
          (op.direction === "down" && op.result instanceof Error),
      }),
      splitLink({
        condition: (op) => op.type === "subscription",
        false: unstable_httpBatchStreamLink({
          transformer: SuperJSON,
          url: getBaseUrl() + "/api/trpc",
          headers: () => {
            const headers = new Headers();
            headers.set("x-trpc-source", "nextjs-react");
            return headers;
          },
        }),
        true: unstable_httpSubscriptionLink({
          transformer: SuperJSON,
          url: getBaseUrl() + "/api/trpc",
        }),
      }),
    ],
  }),
);

// ...
```
