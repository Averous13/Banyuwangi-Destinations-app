import articleApi from "../../api/article.js";
import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import {toast} from "sonner"
import { NodeSelection } from "@tiptap/pm/state";

import { ImageIcon, 
  Loader2, 
  Trash2, 
  ChevronDown, 
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minimize2,
  LayoutGrid} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const IMAGE_SIZES = [
  { label: "370 × 518 (Portrait)", width: 370, height: 518 },
  { label: "270 × 270 (Square Small)", width: 270, height: 270 },
  { label: "1170 × 526 (Wide Banner)", width: 1170, height: 526 },
  { label: "570 × 380 (Landscape)", width: 570, height: 380 },
  { label: "570 × 570 (Square Medium)", width: 570, height: 570 },
  { label: "790 × 570 (Landscape Large)", width: 790, height: 570 },
  { label: "570 × 790 (Portrait Large)", width: 570, height: 790 },
  { label: "Auto (Original)", width: null, height: null }
];

const ImageUpload = ({editor}) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [selectedSize, setSelectedSize] = useState(IMAGE_SIZES[7]);

  useEffect(() => {
    if(!editor) {
      return null;
    }

    const updateSelection = () => {
      setIsImageSelected(editor.isActive('image'));
    };

    updateSelection();

    editor.on('selectionUpdate', updateSelection);
    editor.on('transaction', updateSelection);

    return () => {
      editor.off('selectionUpdate', updateSelection);
      editor.off('transaction', updateSelection);
    }
  }, [editor]); 

    const handleImageUpload = useCallback(async (event) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append('image', file)

        const response = await articleApi.post('/upload-image', formData)
        // console.log(response);
        const data = await response.data;

        if (data.success && data.url && editor) {
          const attrs = {
            src: data.url,
            'data-public-id': data.public_id,
          };

          // Set width dan height jika ada selectedSize
          if (selectedSize.width && selectedSize.height) {
            attrs.width = selectedSize.width;
            attrs.height = selectedSize.height;
          } else {
            // Auto size - gunakan dimensi asli
            attrs.width = data.width;
            attrs.height = data.height;
          }


          editor.chain().focus().setImage(attrs).run();
        } else {
          toast.error('Gagal upload gambar')
          }
        } catch (error) {
        console.error('Error upload gambar:', error);
        toast.error('Terjadi kesalahan saat upload gambar');
      } finally {
        setIsUploading(false);
      }
    }

    event.target.value = '';
  }, [editor, selectedSize]);

  const triggerImageUpload = useCallback(() => {
    fileInputRef.current?.click()
  }, []);

  const deleteImage = useCallback(async () => {
    if (!editor) return;

    const { state } = editor;
    const { from } = state.selection;
    const node = state.doc.nodeAt(from);

    if (node && node.type.name === 'image') {
      const publicId = node.attrs['data-public-id'];

      if (!confirm('Hapus gambar ini?')) {
        return;
      }

      editor.commands.deleteSelection();

      if (publicId) {
        try {
          const response = await articleApi.delete('/upload-image', {
            data: { public_id: publicId}
          });

          const data = await response.data;

          if (data.success) {
            console.log('Gambar berhasil dihapus')
          } else {
            toast.error('Gagal hapus')
          }
        } catch (error) {
          toast.error('Error delete', error)
        }
      }
    }
  }, [editor]);

  const setImageAlign = useCallback((align) => {
    if (!editor) return;

    editor.chain().focus().updateAttributes('image', {align}).run();
  }, [editor]);

  const getCurrentAlign = useCallback(() => {
    if (!editor) return 'none';

    const { state } = editor;
    const { from } = state.selection;
    const node = state.doc.nodeAt(from);

    if (node && node.type.name === 'image') {
      return node.attrs.align || 'none';
    }
    
    return 'none';
  }, [editor, isImageSelected]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            disabled={isUploading}>
              {isUploading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <ImageIcon size={18}/>
              )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {IMAGE_SIZES.map((size, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => {
                setSelectedSize(size);
                triggerImageUpload();
              }}
              className={selectedSize === size ? "bg-accent" : ""}>
                {size.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>


      <input 
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        disabled={isUploading}/>

      {isImageSelected && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                type="button">
                  <LayoutGrid />
                  <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="flex gap-2 p-2">
              <DropdownMenuItem
                  onClick={() => setImageAlign('left')}
                  variant="ghost"
                  size="sm"
                  className={getCurrentAlign() === 'left' ? "bg-accent" : "hover:bg-accent"}
                  title="Align Left">
                  <AlignLeft size={18} />
              </DropdownMenuItem>

              <DropdownMenuItem
                  onClick={() => setImageAlign('center')}
                  variant="ghost"
                  size="sm"
                  className={getCurrentAlign() === 'center' ? "bg-accent" : "hover:bg-accent"}
                  title="Align Center"
                >
                  <AlignCenter size={18} />
              </DropdownMenuItem>

              <DropdownMenuItem
                  onClick={() => setImageAlign('right')}
                  variant="ghost"
                  size="sm"
                  className={getCurrentAlign() === 'right' ? "bg-accent" : "hover:bg-accent"}
                  title="Align Right"
                >
                  <AlignRight size={18} />
              </DropdownMenuItem>

              <DropdownMenuItem
                  onClick={() => setImageAlign('none')}
                  variant="ghost"
                  size="sm"
                  className={getCurrentAlign() === 'none' ? "bg-accent" : "hover:bg-accent"}
                  title="No Align (Inline)"
                >
                  <Minimize2 size={18} />
              </DropdownMenuItem>
                
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={deleteImage}
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            title="Hapus Gambar"
          >
            <Trash2 size={18} />
          </Button>
        </>
        

      )}
    </>
  )
}

export default ImageUpload;
