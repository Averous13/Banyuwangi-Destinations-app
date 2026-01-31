"use client"

import { ColumnDef } from "@tanstack/react-table";
import { MapPin, MoreVertical } from "lucide-react";
import DropdownAction from "./DropdownAction";
import destinationApi from "../api/destination";

export type Destination = {
    id: string
    name: string
    category: string
    location: {
        lat?: string
        long?: string
    }
    contacts: string[]
    tags: string[]
}

export const columns: ColumnDef<Destination>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        header: "Lokasi",
        accessorFn: row => row.location,
        cell: ({ getValue }) => {
            const location = getValue();

            if(!location?.lat || !location?.long) {
                return "-"
            }

            const url= `https://www.google.com/maps?q=${location.lat},${location.long}`;

            return (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener norefferer"
                    className="inline-flex items-center justify-center text-primary hover:text-accent"
                    title="Lihat di Google Maps">
                    <MapPin size={18}/>
                </a>
            )
        }
    },
    {
        accessorKey: "contacts",
        header: "Kontak",
        cell: ({ getValue}) => {
            const contacts = getValue<string[]>()
            return contacts?.length ? contacts.join(", ") : "-"
        }
    },
    {
        accessorKey: 'tags',
        header: "Tag",
        cell: ({ getValue }) => {
            const tags = getValue<string[]>()
            return (
                <div className="flex gap-1 flex-wrap" >
                    {tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs bg-gray-200 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            )
        },
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
                api={destinationApi}/>


                </>

            )
        }
    },

            
]