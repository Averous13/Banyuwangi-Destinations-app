import { useEffect, useState,useMemo } from "react"

import { createColumns } from "@/components/ColumnsArticle";
import articleApi from "@/api/article";
import Header from "@/components/Header";
import Title2 from "@/components/Title2";
import { DataTable } from "@/components/ui/DataTable";
import FilterBar from "@/components/FilterBar";

import { toast } from "sonner";


const ArticlePanelPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState({ total: 0, pageCount: 0 });
  const [options, setOptions] = useState({
    categories: [],
    authors: [],
    statuses: [],
    relateds: []
  })

  // State pagination & filter dikelola di page, bukan di DataTable
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    category: "", author: "", status: "", related: ""
  });

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

  const handleDeleteSuccess = (deletedId) => {
    setArticles(prev => prev.filter(item => item._id !== deletedId));
  }
  const columns = useMemo(() => createColumns(handleDeleteSuccess), []);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await articleApi.get("/", {
          params: {
            page: pageIndex + 1,
            limit: pageSize,
            ...filters,
          }
        });
        setArticles(response.data.articles);
        setMeta({
          total: response.data.total,
          pageCount: Math.ceil(response.data.total / pageSize),
        });
      } catch (error) {
        toast.error("Failed to fetch articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [pageIndex, pageSize, filters]); // re-fetch saat berubah

  useEffect(() => {
    const fetchOption = async () => {
        setIsLoading(true);
        try {
            const response = await articleApi.get("/opt");
            const data = response.data
            setOptions({
                categories: data.categories,
                authors: data.authors,
                statuses: data.status,
                relateds: data.related
            })
        } catch (error) {
            console.error('Error fetching filter:', error)
            toast.error('Filter option error')
        } finally {
            setIsLoading(false)
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
      <Header />
      <Title2 title="Article Panel" spaceY="pt-26" />
      <div className="container mx-auto py-5">
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
    </>
  );
};

export default ArticlePanelPage