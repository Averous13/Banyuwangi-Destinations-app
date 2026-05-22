import articleApi from "@/api/article";
import Header from "@/components/Header";
import Hero2 from "@/components/Hero2";
import HtmlContent from "@/components/HtmlDisplay";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, User } from "lucide-react";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CATEGORY_LABEL = {
    populer: "Populer",
    keluarga: "Keluarga",
    budaya: "Budaya",
    event: "Event",
    kuliner: "Kuliner",
    petualangan: "Petualangan",
}

const ArticlePage = () => {
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await articleApi.get(`/${id}`);
                setData(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error fetching data, please try again later');
            } finally {
                setIsFetching(false);
            }
        }

        fetchArticle();
    }, [id])

    if (isFetching) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
            </div>
        );
    }

    if (!data) return null;

    const formattedDate = new Date(data.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    return (
        <>
            <Header />
            <Hero2 src={data.hero?.url} title="Banyuwangi" />

            <section className="min-h-screen grid place-items-center bg-muted/40 py-12">
                <div className="w-full max-w-4xl rounded-xl border bg-background p-8 shadow-lg transition-all hover:shadow-xl">

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        {data.category && (
                            <Badge className="bg-accent text-accent-foreground capitalize">
                                {CATEGORY_LABEL[data.category] ?? data.category}
                            </Badge>
                        )}
                        <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                            <User size={14} />
                            {data.author}
                        </span>
                        <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                            <CalendarDays size={14} />
                            {formattedDate}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="mb-3">{data.title}</h2>

                    {/* Excerpt */}
                    {data.excerpt && (
                        <p className="text-muted-foreground text-base italic mb-6 leading-relaxed">
                            {data.excerpt}
                        </p>
                    )}

                    <Separator className="mb-8" />

                    {/* Content */}
                    <HtmlContent content={data.content} />

                </div>
            </section>
            <Footer />
        </>
    )
}

export default ArticlePage;