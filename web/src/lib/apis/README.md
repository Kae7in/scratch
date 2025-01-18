# How to fetch API endpoints

Get started by generating types:

1. Start the web-server/
2. Run `pnpm run client:generate` in the web/ folder

This will generate all the types into a single `path` variable exported from `api-client.d.ts`.
The `client` (OpenAPI Fetch client) will use these.
See the config in `api-client.ts`.

## Basic Queries

```javascript
const res = await client.PATCH('/admin/cohorts/{id}/', {
	params: {
		path: {
			id: seriesId
		},
		query: {
			status: 'ACTIVE'
		}
	},
	body: payload
});
const data = res.data; // can be undefined
```

## Reactive Queries (.svelte files only)

### Query

```javascript
import { createQuery } from '@tanstack/svelte-query';
import { client } from '$lib/api-client';

$: userQuery = createQuery({
	queryKey: ['/user/@me'],
	queryFn: async () => (await client.GET('/user/@me')).data
});
```

### Infinite Query

```javascript
const activityQueryKey = ["/activity/"];
$: activeQuery = createInfiniteQuery({
  queryKey: ["/activity/"],
  queryFn: async (page) => {
    return (
      await client.GET("/activity/", {
        params: {
          query: {
            filter,
            page: page.pageParam || undefined, // page must be undefined or non-zero
          },
        },
      })
    ).data;
  },
  getNextPageParam: (lastPage) => lastPage?.nextPage,
  initialPageParam: 0,
});

// Expect the result type of this query to be similar to the following
type ActivityInfiniteQueryResult = {
  activities: ActivityItem[];
  nextPage?: number;
};
```

### Mutation

```javascript
const createCommentMutation = createMutation({
    mutationFn: async ({ id, text, replyToId }: { id: string; text: string; replyToId: string }) =>
      (
        await client.POST(`/activity/{activityId}/comment/`, {
          params: { path: { activityId } },
          body: {
            id,
            text,
            replyToId,
          },
        })
      ).data,
  });

await $createCommentMutation.mutateAsync({
  id: optimisticComment.id,
  text: _comment,
  replyToId: replyingTo?.id,
});
```

## Types

### Importing Types

```javascript
import type { paths } from "$lib/apis/generated-types/api-client";

// Examples of using types returned by a GET endpoint responses
type Heart = paths["/activity/{activityId}/hearts/"]["get"]["responses"][200]["content"]["application/json"][number];
type View = paths["/activity/{activityId}/views/"]["get"]["responses"][200]["content"]["application/json"][number];
```

### Gotcha's

```javascript
// If you're getting a "Property does not exist" error, you might need to wrap nullable parts of the response schema in NonNullable
type ScratchEvent = NonNullable<
    paths["/scratch/"]["get"]["responses"][200]["content"]["application/json"]["scratch"]
  >["events"][number];
```
