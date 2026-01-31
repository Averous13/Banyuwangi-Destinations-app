import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

const ToolbarButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-2 py-1 rounded text-sm border
      ${active ? "bg-black text-white" : "hover:bg-gray-100"}
    `}
  >
    {children}
  </button>
)

export default function TiptapEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div className="border rounded-md overflow-hidden">
      {/* TOOLBAR (TETAP) */}
      <div className="flex gap-1 p-2 border-b bg-gray-50">
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          • List
        </ToolbarButton>
      </div>

      {/* EDITOR */}
      <EditorContent
        editor={editor}
        className="p-3 min-h-[200px]"
      />
    </div>
  )
}

