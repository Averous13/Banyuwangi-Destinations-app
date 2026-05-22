// components/ArticleFilterBar.tsx

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

interface Filters {
  category: string
  author: string
  status: string
  related: string
}

interface ArticleFilterBarProps {
  filters: Filters
  onChange: (filters: Filters) => void
  options: {
    categories: string[]
    authors: string[]
    statuses: string[]
    relateds: string[]
  }
}

const ArticleFilterBar = ({ filters, onChange, options }: ArticleFilterBarProps) => {
  const setFilter = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value })
  }

  const clearAll = () => {
    onChange({ category: "", author: "", status: "", related: "" })
  }

  const hasActive = Object.values(filters).some(Boolean)

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-muted/40 rounded-lg border">
      <Select
        value={filters.category || "__all__"}
        onValueChange={(v) => setFilter("category", v === "__all__" ? "" : v)}
      >
        <SelectTrigger className="w-[150px] h-9">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__all__">All Categories</SelectItem>
          {options.categories.map((c) => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.author || "__all__"}
        onValueChange={(v) => setFilter("author", v === "__all__" ? "" : v)}
      >
        <SelectTrigger className="w-[150px] h-9">
          <SelectValue placeholder="Author" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__all__">All Authors</SelectItem>
          {options.authors.map((a) => (
            <SelectItem key={a} value={a}>{a}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.status || "__all__"}
        onValueChange={(v) => setFilter("status", v === "__all__" ? "" : v)}
      >
        <SelectTrigger className="w-[140px] h-9">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__all__">All Status</SelectItem>
          {options.statuses.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.related || "__all__"}
        onValueChange={(v) => setFilter("related", v === "__all__" ? "" : v)}
      >
        <SelectTrigger className="w-[160px] h-9">
          <SelectValue placeholder="Related" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__all__">All Related</SelectItem>
          {options.relateds.map((r) => (
            <SelectItem key={r} value={r}>{r}</SelectItem>
          ))}
        </SelectContent>
      </Select>

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
                  onClick={() => setFilter(key as keyof Filters, "")}
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

export default ArticleFilterBar