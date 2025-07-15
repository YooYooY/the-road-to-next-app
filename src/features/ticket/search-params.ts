import { createSearchParamsCache, parseAsString } from 'nuqs/server'

export const searchParase = parseAsString.withDefault('').withOptions({
  shallow: false,
  clearOnDefault: true,
})

export const sortParser =  {
  sortKey: parseAsString.withDefault("createAt"),
  sortValue: parseAsString.withDefault("desc"),
}

export const sortOptions = {
  shallow: false,
  clearOnDefault: true,
}

export const searchParamsCache = createSearchParamsCache({
  search: searchParase,
  ...sortParser,
})

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.all>
