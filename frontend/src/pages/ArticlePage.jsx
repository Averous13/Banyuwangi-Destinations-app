import articleApi from "@/api/article";
import destinationApi from "@/api/destination";
import Header from "@/components/Header";
import Hero2 from "@/components/Hero2";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import HtmlContent from "@/components/HtmlDisplay";


const ArticlePage = () => {

    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [destination, setDestination] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await articleApi.get(`/destination/${id}`);
                const dest = await destinationApi.get(`/${id}`);
                setData(response.data.data)
                setDestination(dest.data)
                console.log(dest.data)
            } catch(error) {
                console.error('Error fetching data:', error);
                toast.error('Error fetching data, please try again later');
            } finally{
                setIsFetching(false);
            }
        }


        fetchArticle();
    }, [])

    if (isFetching) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <Hero2 src={destination.image.url} title={data.title}/>
            <section className="min-h-screen grid place-items-center bg-muted/40">
                <div className="w-full max-w-7xl rounded-xl border bg-background p-6 shadow-lg transition-all hover:shadow-xl">
                    <HtmlContent className="grid grid-cols-2 gap-x-6 gap-y-16" content={data[0].content} />
                </div>
            </section>
        </>
    )
}

export default ArticlePage;