import { env } from '$env/dynamic/public';
import createClient from 'openapi-fetch';

import type { paths } from './apis/generated-types/api-client';

export const client = createClient<paths>({
	baseUrl: env.PUBLIC_API_ORIGIN,
	credentials: 'include',

	// Needed because our Fastify server doesn't use a standard serialization method for querystrings
	// Learn more via the OpenAPI Fetch docs: https://openapi-ts.dev/openapi-fetch/api#alternate-function-syntax
	querySerializer(queryParams) {
		const search = [];
		for (const name in queryParams) {
			const value = queryParams[name];
			if (Array.isArray(value)) {
				for (const item of value) {
					search.push(`${name}[]=${encodeURIComponent(item)}`);
				}
			} else if (value != null) {
				search.push(`${name}=${encodeURIComponent(String(value))}`);
			}
		}
		return search.join('&');
	}
});
