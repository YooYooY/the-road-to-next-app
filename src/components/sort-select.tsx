'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { sortParase } from '@/features/ticket/search-params'
import { useQueryState } from 'nuqs'

type Option = {
  value: string
  label: string
}

type SortSelectProps = {
  options: Option[]
}

const SortSelect = ({ options }: SortSelectProps) => {
  const [sort, setSort] = useQueryState('sort', sortParase)

  const handleSort = (value: string) => {
    setSort(value)
  }

  return (
    <Select onValueChange={handleSort} defaultValue={sort}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SortSelect
