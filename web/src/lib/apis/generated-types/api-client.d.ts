/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
	'/': {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get: {
			parameters: {
				query?: never;
				header?: never;
				path?: never;
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description Default Response */
				200: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
			};
		};
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	'/health/': {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get: {
			parameters: {
				query?: never;
				header?: never;
				path?: never;
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description Default Response */
				200: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
			};
		};
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	'/notes/': {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get: {
			parameters: {
				query?: never;
				header?: never;
				path?: never;
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description Default Response */
				200: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
			};
		};
		put?: never;
		post: {
			parameters: {
				query?: never;
				header?: never;
				path?: never;
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description Default Response */
				200: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
			};
		};
		delete: {
			parameters: {
				query?: never;
				header?: never;
				path?: never;
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description Default Response */
				200: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
			};
		};
		options?: never;
		head?: never;
		patch: {
			parameters: {
				query?: never;
				header?: never;
				path?: never;
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description Default Response */
				200: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
			};
		};
		trace?: never;
	};
	'/notes/{id}/': {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get: {
			parameters: {
				query?: never;
				header?: never;
				path: {
					id: string;
				};
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description Default Response */
				200: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
			};
		};
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	'/ai/note-completion/': {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		post: {
			parameters: {
				query?: never;
				header?: never;
				path?: never;
				cookie?: never;
			};
			requestBody: {
				content: {
					'application/json': {
						content: string;
						cursorPosition: number;
						context?: string;
					};
				};
			};
			responses: {
				/** @description Default Response */
				200: {
					headers: {
						[name: string]: unknown;
					};
					content: {
						'application/json': {
							completion: string;
						};
					};
				};
			};
		};
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
}
export type webhooks = Record<string, never>;
export interface components {
	schemas: never;
	responses: never;
	parameters: never;
	requestBodies: never;
	headers: never;
	pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
