import { createSearchParamsCache, parseAsString } from 'nuqs/server'

export const searchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(""),
  sort: parseAsString.withDefault("newset")
})

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.all>
