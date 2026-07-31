import React, { useState, useEffect, useMemo } from "react";

import Title2 from "../../components/Title2";
import Header from "../../components/main/Header";

import { DataTable } from "../../components/ui/DataTable";
import { toast } from "sonner";
import { createColumns } from "../../components/ColumnsDestination";
import destinationApi from "../../api/destination";
import FilterBar from "@/components/FilterBar";
import Sidebar from "@/components/main/Sidebar";
import { GROUP_MENU } from "@/navigation/adminMenu";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// import { createColumn } from "@tanstack/react-table";

const DestinationPanelPage = () => {
    const [destination, setDestination] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRateLimit, setIsRateLimit] = useState(true);
    const [meta, setMeta] = useState({total: 0, pageCount:0});
    const [options, setOptions] = useState({
        categories: [],
        tags: []
    });
    const navigate = useNavigate()

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [filters, setFilters] = useState({
        category: "", tags: ""
    })

    const filterConfig = [
        {
            key: "category",
            label: "All Category",
            placeholder: "Category",
            options: options.categories
        },
        {
            key: "tags",
            label: "All Tags",
            placeholder: "Tags",
            options: options.tags
        },
    ]

    const handleDeleteSuccess = (deletedId) => {
        setDestination(prev => prev.filter(item => item._id !== deletedId));
    }

    const columns = useMemo(() => createColumns(handleDeleteSuccess), []);

    useEffect(() => {
        const fetchDestination = async () => {
            setIsLoading(true);
            try {
                const response = await destinationApi.get('/', {
                    params: {
                        page: pageIndex + 1,
                        limit: pageSize,
                        ...filters,   
                    }
                });
                setIsRateLimit(false);
                setDestination(response.data.destinations);
                setMeta({
                    total: response.data.total,
                    pageCount: Math.ceil(response.data.total / pageSize)
                })
            } catch (error){
                console.error('error fetching', error);
                if (error.response && error.response.status === 429) {
                    setIsRateLimit(true);
                } else {
                   toast.error("Failed to fetch Destination, Please try again later"); 
                }
            } finally {
                setIsLoading(false)
            }
        };

        fetchDestination();
    }, [pageIndex, pageSize, filters]);

    useEffect(() => {
        const fetchOption = async () => {
            setIsLoading(true);
            try {
                const response = await destinationApi.get("/opt");
                const data = response.data
                setOptions({
                    categories: data.category,
                    tags: data.tags
                });
                console.log(response.data)
            } catch (error) {
                console.error("fetching option destination:", error);
                toast.error("Failed to fetch option filter");
            } finally {
                setIsLoading(false)
            }
        }

        fetchOption();
    }, []);

    const toolbar = (
        <FilterBar
            filters={filters}
            config={filterConfig}
            onChange={(newFilters) => {
                setFilters(newFilters);
                setPageIndex(0); // reset ke halaman 1 saat filter berubah
            }}
        />
  );

    return (
        <>
		<div className="flex min-h-screen bg-muted/30">
			<Sidebar groupMenu={GROUP_MENU} />

			<main className="flex-1 flex justify-center p-6">
				<div className="w-full max-w-7xl">
					<Title2 title="Destination Panel" spaceY="" >
                        <Button 
                            onClick={() => {navigate('/data-destinations/create')}}>
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
        </>

    )
}

export default DestinationPanelPage;