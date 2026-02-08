import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Selection } from '@tiptap/extensions'
import {Button} from './ui/button'
import { Undo2Icon, 
  Redo2Icon, 
  BoldIcon, 
  Italic,
  Strikethrough,
  Underline,
  Superscript as Sups,
  Subscript as Subs,
  TextAlignStart,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify
 } from "lucide-react"
import { Separator } from "./ui/separator"
import HeadingDropdown from "./toolbar/HeadingDropdown"
import HighlightDropdown from "./toolbar/HighlightDropdown"
import LinkDropdown from "./toolbar/LinkDropdown"
import ImageUpload from "./toolbar/ImageUpload"



export default function TiptapEditor({ value, onChange }) {

  const editor = useEditor({
    extensions: [StarterKit, 
      Highlight.configure({multicolor: true}),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Selection.configure({
        className: 'selection',
      }),
      Subscript,
      Superscript,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline cursor-pointer'
        }
      }),
      Image.configure({
        inline: true,
        resize: {
          enabled: true,
          directions: ['top', 'bottom', 'left', 'right'], // can be any direction or diagonal combination
          minWidth: 50,
          minHeight: 50,
          alwaysPreserveAspectRatio: true,
        },
        HTMLAttributes: {
          class: 'rounded-lg cursor-pointer'
        },
      }).extend({
        selectable: true,
        addAttributes() {
          return {
            ...this.parent?.(),
            'data-public-id': {
              default: null,
              parseHTML: element => element.getAttribute('data-public-id'),
              renderHTML: attributes => {
                if (!attributes['data-public-id']) {
                  return {}
                }
                return { 'data-public-id': attributes['data-public-id']}
              },
            },
          }
        },
      })], 
    content: value,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML())
    },
  })



  if (!editor) return null

  return (
    <div className="border rounded-md overflow-hidden">

      <div className="flex gap-1 justify-center p-2 bg-gray-50">
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          variant="ghost"
          size="sm"
        >
          <Undo2Icon size={18}/>
        </Button>

        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          variant="ghost"
          size="sm"
        >
          <Redo2Icon size={18}/>
        </Button>

        <HeadingDropdown editor={editor}/>

        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant="ghost"
          size="sm"
          className={editor.isActive("bold") ? "bg-accent" : ""}
        >
          <BoldIcon size={18}/>
        </Button>

        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant="ghost"
          size="sm"
          className={editor.isActive("italic") ? "bg-accent" : ""}
        >
          <Italic size={18}/>
        </Button>

        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant="ghost"
          size="sm"
          className={editor.isActive("strike") ? "bg-accent" : ""}
        >
          <Strikethrough size={18}/>
        </Button>

        <Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          variant="ghost"
          size="sm"
          className={editor.isActive("underline") ? "bg-accent" : ""}
        >
          <Underline size={18}/>
        </Button>

        <HighlightDropdown editor={editor}/>

        <LinkDropdown editor={editor}/>

        <Button
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          variant="ghost"
          size="sm"
          className={editor.isActive("superscript") ? "bg-accent" : ""}
        >
          <Sups size={18}/>
        </Button>
        
        <Button
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          variant="ghost"
          size="sm"
          className={editor.isActive("subscript") ? "bg-accent" : ""}
        >
          <Subs size={18}/>
        </Button>

        <ImageUpload editor={editor} />

        <Button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          variant="ghost"
          size="sm"
          className={editor.isActive({textAlign: 'left'}) ? "bg-accent" : ""}
        >
          <TextAlignStart size={18}/>
        </Button>

        <Button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          variant="ghost"
          size="sm"
          className={editor.isActive({textAlign: 'center'}) ? "bg-accent" : ""}
        >
          <TextAlignCenter size={18}/>
        </Button>

        <Button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          variant="ghost"
          size="sm"
          className={editor.isActive({textAlign: 'right'}) ? "bg-accent" : ""}
        >
          <TextAlignEnd size={18}/>
        </Button>

        <Button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          variant="ghost"
          size="sm"
          className={editor.isActive({textAlign: 'justify'}) ? "bg-accent" : ""}
        >
          <TextAlignJustify size={18}/>
        </Button>
      </div>

      {/* EDITOR */}
      <EditorContent
        editor={editor}
        className="p-3 min-h-[200px]"
      />
    </div>
  )
}

