import { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Link, ExternalLink, Unlink } from "lucide-react";
import { Button } from "../ui/button";

const LinkDropdown = ({ editor }) => {
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Tambahkan https:// jika tidak ada protocol
    const finalUrl = url.match(/^https?:\/\//) ? url : `https://${url}`;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: finalUrl })
      .run();

    setUrl("");
    setIsOpen(false);
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setLink();
    }
  };

  // Cek apakah ada link yang aktif
  const isLinkActive = editor.isActive("link");

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={isLinkActive ? "bg-accent" : ""}
        >
          <Link className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80">
        <div className="p-2 space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Masukkan URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <Button onClick={setLink} size="sm">
              Simpan
            </Button>
          </div>
          
          {isLinkActive && (
            <div className="border-t pt-2">
              <DropdownMenuItem
                onClick={removeLink}
                className="cursor-pointer text-destructive"
              >
                <Unlink className="h-4 w-4 mr-2" />
                Hapus Link
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const href = editor.getAttributes("link").href;
                  window.open(href, "_blank");
                }}
                className="cursor-pointer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Buka Link
              </DropdownMenuItem>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinkDropdown;