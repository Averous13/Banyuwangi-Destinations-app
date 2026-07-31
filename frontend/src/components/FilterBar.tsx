// components/FilterBar.tsx

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export interface FilterConfig<T extends Record<string, string>> {
  key: keyof T
  label: string
  placeholder: string
  options: string[]
  width?: string
}

interface FilterBarProps<T extends Record<string, string>> {
  filters: T
  config: FilterConfig<T>[]
  onChange: (filters: T) => void
}

function FilterBar<T extends Record<string, string>>({
  filters,
  config,
  onChange,
}: FilterBarProps<T>) {
  const setFilter = (key: keyof T, value: string) => {
    onChange({ ...filters, [key]: value })
  }

  const clearAll = () => {
    const empty = Object.fromEntries(
      Object.keys(filters).map((k) => [k, ""])
    ) as T
    onChange(empty)
  }

  const hasActive = Object.values(filters).some(Boolean)

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-muted/40 rounded-lg border-2 border-primary">
      {config.map((item) => (
        <Select
          key={String(item.key)}
          value={filters[item.key] || "__all__"}
          onValueChange={(v) => setFilter(item.key, v === "__all__" ? "" : v)}
        >
          <SelectTrigger className={`${item.width ?? "w-[150px]"} h-9 bg-primary text-white`}>
            <SelectValue placeholder={item.placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">{item.label}</SelectItem>
            {item.options.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}

      {hasActive && (
        <div className="flex items-center gap-2 ml-auto">
          <div className="flex gap-1 flex-wrap">
            {Object.entries(filters)
              .filter(([, v]) => v)
              .map(([key, value]) => (
                <Badge
                  key={key}
                  variant="secondary"
                  className="gap-1 cursor-pointer"
                  onClick={() => setFilter(key as keyof T, "")}
                >
                  {key}: {value}
                  <X size={10} />
                </Badge>
              ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-destructive hover:text-destructive h-7 px-2"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}

export default FilterBar