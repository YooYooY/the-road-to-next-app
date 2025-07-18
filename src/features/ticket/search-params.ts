import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server'

export const searchParser = parseAsString.withDefault('').withOptions({
  shallow: false,
  clearOnDefault: true,
})

export const sortParser = {
  sortKey: parseAsString.withDefault('createAt'),
  sortValue: parseAsString.withDefault('desc'),
}

export const sortOptions = {
  shallow: false,
  clearOnDefault: true,
}

export const paginationParser = {
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(4),
}

export const paginationOtions = {
  shallow: false,
  clearOnDefault: true,
}

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  ...sortParser,
  ...paginationParser,
})

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.all>
