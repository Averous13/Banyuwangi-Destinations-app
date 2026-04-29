import { useEffect, useState,useMemo } from "react"

import { createColumns } from "@/components/ColumnsArticle";
import articleApi from "@/api/article";
import Header from "@/components/Header";
import Title2 from "@/components/Title2";
import { DataTable } from "@/components/ui/DataTable";

import { toast } from "sonner";


const ArticlePanelPage = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRateLimit, setIsRateLimit] = useState(false);

    const handleDeleteSuccess = (deletedId) => {
        setArticles(prev => prev.filter(item => item._id !== deletedId));
    }

    const columns = useMemo(() => createColumns(handleDeleteSuccess), []);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await articleApi.get("/");
                setArticles(response.data.articles);
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
        }

        fetchArticles();

    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <Title2 title="Article Panel" spaceY="pt-26" />
            <div className="container mx-auto py-5">
                <DataTable columns={columns} data={articles} />
            </div>
        </>
    )
}

export default ArticlePanelPage