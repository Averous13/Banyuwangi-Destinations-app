import React, { useState, useMemo, useEffect } from "react";

import Title2 from "../../components/Title2";
import { DataTable } from "../../components/ui/DataTable";
import { toast } from "sonner";
import { createColumns } from "../../components/ColumnsDestination";
import destinationApi from "../../api/destination";
import FilterBar from "@/components/FilterBar";
import Sidebar from "@/components/main/Sidebar";
import { GROUP_MENU } from "@/navigation/adminMenu";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useFetchData } from "@/hook/useFetchData";

const DestinationPanelPage = () => {
    const navigate = useNavigate();

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [filters, setFilters] = useState({ category: "", tags: "" });

    const {
        data: destination,
        setData: setDestination,
        meta,
        setMeta,
        loading,
        isRateLimit,
    } = useFetchData(destinationApi, {
        endpoint: '/',
        dataKey: 'destinations',
        pageIndex,
        pageSize,
        filters,
        errorMessage: "Failed to fetch Destination, Please try again later",
    });

    console.log(destination);

    const [options, setOptions] = useState({ categories: [], tags: [] });

    useEffect(() => {
        const fetchOption = async () => {
            try {
                const response = await destinationApi.get("/opt");
                setOptions({
                    categories: response.data.category,
                    tags: response.data.tags,
                });
            } catch (error) {
                console.error("fetching option destination:", error);
                toast.error("Failed to fetch option filter");
            }
        };
        fetchOption();
    }, []);

    const filterConfig = [
        { key: "category", label: "All Category", placeholder: "Category", options: options.categories },
        { key: "tags", label: "All Tags", placeholder: "Tags", options: options.tags },
    ];


    const handleDeleteSuccess = (deletedId) => {
        setDestination((prev) => prev.filter((item) => item._id !== deletedId));

        setMeta((prev) => {
            const newTotal = prev.total - 1;
            const newPageCount = Math.ceil(newTotal / pageSize);

            if (pageIndex >= newPageCount && pageIndex > 0) {
                setPageIndex(newPageCount - 1);
            }

            return { total: newTotal, pageCount: newPageCount };
        });
    };

    const columns = useMemo(() => createColumns(handleDeleteSuccess), [pageIndex, pageSize]);

    const toolbar = (
        <FilterBar
            filters={filters}
            config={filterConfig}
            onChange={(newFilters) => {
                setFilters(newFilters);
                setPageIndex(0);
            }}
        />
    );

    return (
        <div className="flex min-h-screen bg-muted/30">
            <Sidebar groupMenu={GROUP_MENU} />

            <main className="flex-1 flex justify-center p-6">
                <div className="w-full max-w-7xl">
                    <Title2 title="Destination Panel" spaceY="">
                        <Button onClick={() => navigate('/data-destinations/create')}>
                            Create
                        </Button>
                    </Title2>

                    <div className="mt-6 rounded-xl border bg-background shadow-lg p-6">
                        <DataTable
                            columns={columns}
                            data={destination}
                            toolbar={toolbar}
                            pagination={{
                                pageIndex,
                                pageSize,
                                pageCount: meta.pageCount,
                                totalRows: meta.total,
                                onPageChange: setPageIndex,
                                onPageSizeChange: (size) => {
                                    setPageSize(size);
                                    setPageIndex(0);
                                },
                            }}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DestinationPanelPage;