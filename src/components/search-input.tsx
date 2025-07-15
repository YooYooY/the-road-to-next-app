'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from './ui/input'
import { useQueryState } from 'nuqs'
import { searchParase } from '@/features/ticket/search-params'

type SearchInputProps = {
  placeholder: string
}

const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [search, setSearch] = useQueryState('search', searchParase)

  const handleSearch = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }, 250)

  return <Input placeholder={placeholder} onChange={handleSearch} defaultValue={search} />
}

export default SearchInput
