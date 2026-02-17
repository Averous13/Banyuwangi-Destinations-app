import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogAction,
} from "./ui/alert-dialog";

import { toast } from "sonner";
import type { AxiosInstance } from "axios";
import articleApi from "@/api/article";

/* =====================
   Props Type
===================== */
interface DropdownActionProps {
  id: number | string;
  api: AxiosInstance;
  hasArticle: boolean;
}

const DropdownAction: React.FC<DropdownActionProps> = ({ id, api }) => {
  const navigate = useNavigate();  
  const [open, setOpen] = useState<boolean>(false);

  const handleDeleteClick = (): void => {
    setOpen(true);
  };

  const handleDelete = async (): Promise<void> => {
    try {
      await api.delete(`/${id}`);
      toast.success("Destination deleted successfully");
      setOpen(false);
    } catch (error) {
      console.error("Error deleting destination:", error);
      toast.error("Failed to delete destination");
    }
  };


  const handleDetail = async () => {
    try {
      const article = await articleApi.get(`/destination/${id}`);
      navigate(`/data-destinations/article/${id}/update`)
    }catch(error) {
      navigate(`/data-destinations/article/${id}/edit`)
      toast.error("The Article has not been created yet");
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="p-2"
            aria-label="More actions"
          >
            <MoreVertical size={18} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            onSelect={handleDetail}
          >
              Detail
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() =>
              navigate(`/data-destinations/${id}/update`)
            }
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handleDeleteClick();
            }}
            className="text-red-600"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yakin?</AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              Ya, Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DropdownAction;
