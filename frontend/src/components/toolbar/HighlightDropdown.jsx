import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu"

import {Button} from "../ui/button"
import { Highlighter } from "lucide-react"
import { useEditorState } from "@tiptap/react"

const COLORS = [
  "#5FAE7C",
  "#9DBED6",
  "#B35A5A",
  "#8A6BBE",
  "#9A962F",
  "#D98A3A",
]

const HighlightDropdown = ({ editor }) => {
  if (!editor) return null

  // 🔹 subscribe ke editor state
  const activeColor = useEditorState({
    editor,
    selector: ({ editor }) => {
      for (const color of COLORS) {
        if (editor.isActive("highlight", { color })) {
          return color
        }
      }
      return null
    },
  })

  const isActive = activeColor !== null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          className={`
            px-2 py-1 rounded text-sm flex items-center gap-1
            ${isActive ? "bg-accent" : ""}
          `}
          variant="ghost"
          size="sm"
        >
          <Highlighter size={18} />
          {activeColor && (
            <span
              className="w-3 h-3 rounded-sm border"
              style={{ backgroundColor: activeColor }}
            />
          )}
        </Button>
      </DropdownMenuTrigger>

      {/* 🔹 horizontal layout */}
      <DropdownMenuContent
        align="start"
        className="flex gap-2 p-2"
      >
        {COLORS.map(color => (
          <DropdownMenuItem
            key={color}
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color }).run()
            }
            className="p-0 focus:bg-transparent"
          >
            <div
              className={`
                w-6 h-6 rounded-md border cursor-pointer
                ${activeColor === color ? "ring-2 ring-accent" : ""}
              `}
              style={{ backgroundColor: color }}
            />
          </DropdownMenuItem>
        ))}

        {/* Optional: clear highlight */}
        <DropdownMenuItem
          onClick={() =>
            editor.chain().focus().unsetHighlight().run()
          }
          className="p-0 focus:bg-transparent"
        >
          <div className="w-6 h-6 rounded-md border flex items-center justify-center text-xs">
            ✕
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default HighlightDropdown
