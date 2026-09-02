import { useEffect, useState,useMemo } from "react"

import { createColumns } from "@/components/ColumnsArticle";
import articleApi from "@/api/article";
import Header from "@/components/main/Header";
import Title2 from "@/components/Title2";
import { DataTable } from "@/components/ui/DataTable";
import FilterBar from "@/components/FilterBar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GROUP_MENU } from "@/navigation/adminMenu";
import Sidebar from "@/components/main/Sidebar";

import { toast } from "sonner";
import { useFetchData } from "@/hook/useFetchData";


const ArticlePanelPage = () => {
  const navigate = useNavigate()
  const [options, setOptions] = useState({
    categories: [],
    authors: [],
    statuses: [],
    relateds: []
  })

  const [filters, setFilters] = useState({
    category: "", author: "", status: "", related: ""
  });
  // State pagination & filter dikelola di page, bukan di DataTable
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const filterConfig = [
  {
    key: "category",
    label: "All Categories",
    placeholder: "Category",
    options: options.categories,
  },
  {
    key: "author",
    label: "All Authors",
    placeholder: "Author",
    options: options.authors,
  },
  {
    key: "status",
    label: "All Status",
    placeholder: "Status",
    options: options.statuses,
    width: "w-[140px]",
  },
  {
    key: "related",
    label: "All Related",
    placeholder: "Related",
    options: options.relateds,
    width: "w-[160px]",
  },
]

  const {
    data: articles,
    setData: setArticles,
    meta,
    setMeta,
    loading,
    isRateLimit,
  } = useFetchData(articleApi, {
    endpoint: '/',
    dataKey: 'articles',
    pageIndex,
    pageSize,
    filters,
    errorMessage: "Failed to fetch Article, Please try again later",
  })

  const handleDeleteSuccess = (deletedId) => {
    setArticles((prev) => prev.filter((item) => item._id !== deletedId));

    setMeta((prev) => {
        const newTotal = prev.total - 1;
        const newPageCount = Math.ceil(newTotal / pageSize);

        if (pageIndex >= newPageCount && pageIndex > 0) {
            setPageIndex(newPageCount - 1);
        }

        return { total: newTotal, pageCount: newPageCount };
    });
  };
  const columns = useMemo(() => createColumns(handleDeleteSuccess), []);

  useEffect(() => {
    const fetchOption = async () => {
        try {
            const response = await articleApi.get("/opt");
            const data = response.data
            setOptions({
                categories: data.categories,
                authors: data.authors,
                statuses: data.status,
                relateds: data.related
            });
        } catch (error) {
            console.error('Error fetching filter:', error)
            toast.error('Filter option error')
        }
    }

    fetchOption();
  }, [])

  // Filter toolbar — dirender di dalam DataTable via slot
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
					<Title2 title="Article Panel" spaceY="" >
                        <Button 
                            onClick={() => {navigate('/data-article/create')}}>
                            Create
                        </Button>
                    </Title2>

					<div className="mt-6 rounded-xl border bg-background shadow-lg p-6">
						<DataTable
							columns={columns}
							data={articles}
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
  );
};

export default ArticlePanelPage