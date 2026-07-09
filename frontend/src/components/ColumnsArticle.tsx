"use client"

import { ColumnDef, getFacetedMinMaxValues } from "@tanstack/react-table";
import { Image } from "lucide-react";
import DropdownAction from "./editor/DropdownAction";
import articleApi from "@/api/article";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { get } from "react-hook-form";

export type Article = {
    id: string
    title: string
    category: string
    hero: {
        url?: string
        public_id?: string
    } | null
    author: string
    status: string
    related: {
        _id: string,
        name: string
    } | null
}



export const createColumns = (onDeleteSuccess: (id: string) => void): ColumnDef<Article>[] => [
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ getValue }) => {
            const category = getValue<string>()
            return <Badge>{category}</Badge>
        },
    },
    {
        header: "hero",
        accessorFn: row => row.hero,
        cell: ({ getValue }) => {
            const hero = getValue();

            if (!hero?.url || !hero?.public_id) {
                return "-"    
            }

            return (
                <a
                    href={hero.url}
                    target="_blank"
                    rel="noopener norefferer"
                    className="inline-flex items-center justify-center text-primary hover:text-accent"
                    title="Lihat gambar heri">
                    <Image size={18}/>
                </a>
            )
        }
    },
    {
        header: "Author",
        accessorKey: "author"
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({getValue}) => {
            const status = getValue<string>();
            
            return (status === "published" 
                ? (<Badge className="bg-primary">
                    Published
                </Badge>)
                : (
                    <Badge className="bg-accent">
                        Draft
                    </Badge>
                )
            )
        }
    },
    {
        header: "Related",
        accessorKey: "related",
        cell: ({getValue}) => {
            const related = getValue<{_id: string; name: string} | null>()
            return <span>{related?.name ?? "-"}</span>
        }
    },
    {
        id: "action",
        header: "Action",
        enableSorting: false,
        cell: ({ row }) => {
            const data = row.original;

            return (
                <>
                <DropdownAction 
                id={data._id} 
                api={articleApi}
                onSuccess={() => onDeleteSuccess(data._id)}
                baseLink="/data-article"/>
                </>

            )
        }
    },
]