import { createSearchParamsCache, parseAsString } from 'nuqs/server'

export const searchParase = parseAsString.withDefault('').withOptions({
  shallow: false,
  clearOnDefault: true,
})

export const sortParase = parseAsString.withDefault('newest').withOptions({
  shallow: false,
  clearOnDefault: true,
})

export const searchParamsCache = createSearchParamsCache({
  search: searchParase,
  sort: sortParase,
})

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.all>
