import articleApi from "../../api/article.js";
import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { NodeSelection } from "@tiptap/pm/state";

import { ImageIcon, Loader2, Trash2 } from "lucide-react"

const ImageUpload = ({editor}) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);

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

        const response = await articleApi.post('http://localhost:5000/api/article/upload-image', formData)
        // console.log(response);
        const data = await response.data;

        if (data.success && data.url && editor) {
          let defaultWidth = data.width;
          let defaultHeight = data.height;

          if (data.width > 570) {
            const aspectRatio = data.height / data.width;
            defaultWidth = 570;
            defaultHeight = Math.round(570 * aspectRatio); 
          }
          else if (data.height > 380) {
            const aspectRatio = data.width / data.height;
            defaultHeight = 380;
            defaultWidth = Math.round(380 * aspectRatio);
          }
          editor.chain().focus().setImage({
            src: data.url,
            'data-public-id': data.public_id,
            width: defaultWidth,
            height: defaultHeight}).run();
        } else {
          alert('Gagal upload gambar')
          }
        } catch (error) {
        console.error('Error upload gambar:', error);
        alert('Terjadi kesalahan saat upload gambar');
      } finally {
        setIsUploading(false);
      }
    }

    event.target.value = '';
  }, [editor]);

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
          const response = await articleApi.delete('http://localhost:5000/api/article/upload-image', {
            data: { public_id: publicId}
          });

          const data = await response.data;

          if (data.success) {
            console.log('Gambar berhasil dihapus')
          } else {
            console.error('Gagal hapus')
          }
        } catch (error) {
          console.error('Error delete', error)
        }
      }
    }
  }, [editor]);

  return (
    <>
      <Button
        onClick={triggerImageUpload}
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

      <input 
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        disabled={isUploading}/>

      {isImageSelected && (
        <Button
          onClick={deleteImage}
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          title="Hapus Gambar"
        >
          <Trash2 size={18} />
        </Button>
      )}
    </>
  )
}

export default ImageUpload;
