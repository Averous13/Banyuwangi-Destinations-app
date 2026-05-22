import destinationApi from "@/api/destination";
import articleApi from "@/api/article";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Hero2 from "@/components/Hero2";
import MiniMap from "@/components/MiniMap";
import { MoveDiagonal } from "lucide-react";
import DestinationTab from "@/components/DestinationTab";
import HtmlContent from "@/components/HtmlDisplay";
import Carousel from "@/components/Caroussel";
import Footer from "@/components/Footer";


const DestinationDetailPage = () => {
    const [destination, setDestination] = useState([]);
    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRateLimit, setIsRateLimit] = useState(false);
    const {id} = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const dest = await destinationApi.get(`/${id}`);
                const response = await articleApi.get(`/destination/${id}`);
                setDestination(dest.data)
                setArticle(response.data.data)
                // console.log(response.data.data)
            } catch(error) {
                console.error("Error fetching data:", error)
                if (error.response && error.response.status === 429) {
                    setIsRateLimit(true);
                } else {
                   toast.error("Failed to fetch Destination, Please try again later"); 
                }
            } finally {
                setLoading(false)
            }
        }

        fetchDestination();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <Hero2 src={destination.image.url} title={destination.name}/>
            <section className="min-h-screen grid justify-items-center bg-muted/40">
                <div className="w-full max-w-7xl rounded-xl border bg-background p-6 shadow-lg transition-all hover:shadow-xl">
                    <div className="grid grid-cols-3 gap-12 px-16 py-12">
                        <div className="space-y-4 col-span-2">
                            <DestinationTab destination={destination}/>
                        </div>
                              
                        <div className="relative h-[430px] rounded-2xl overflow-hidden shadow-md">
                            
                            <MiniMap
                                dest={destination}
                            />

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[999]">
                            <Button
                                onClick={() => navigate("/map-destinations")}
                                className="hover:shadow-xl hover:bg-accent transition-all"
                            >
                                Lihat peta lengkap
                                <MoveDiagonal />
                            </Button>
                            </div>

                        </div>
                    </div>

                    <div>
                        <HtmlContent className="grid grid-cols-2 gap-x-6 gap-y-16 py-10 px-10 items-center min-h-[400px]" content={article[0].content} />
                    </div>

                    <div>
                        <Carousel 
                            data={article.slice(1)} 
                            getLink={(article) => `/article/${article._id}`}/>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default DestinationDetailPage;