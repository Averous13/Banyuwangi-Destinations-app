import { useState, useEffect } from 'react';
import Header from '../components/main/Header'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/main/Hero'
import heroImg from "@assets/images/pexels-ferli-3766560.webp";
import MainGallery from '@/components/main/MainGallery';
import Title from '@/components/Title';
import Footer from '@/components/main/Footer';
import { useNavigate } from 'react-router-dom';
import destinationApi from '@/api/destination';
import { toast } from 'sonner';
import DestinationCarousel from '@/components/CarousselDest';




const HomePage = () => {
    const [destination, setDestination] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const response = await destinationApi.get('/');
                console.log(response.data.destinations);
                setDestination(response.data.destinations);
            } catch(err) {
                setError(err.response?.data?.message || 'Terjadi kesalahan');
                toast.error("Error fetching data:", err);
            } finally{
                setLoading(false);
            }
        }

        fetchDestination();
    }, [])




    return (
        <>
            <Header/>
            <Hero
                title="DEAR SUNRISE"
                subtitle="For you, who smiles like the sun, this story begins."
                ctaText='Visit'
                ctaLink='#'
                backgroundImage={heroImg} />

            <div className='max-w-7xl mx-auto px-4'>
                <div className="flex items-center justify-between">
                    <Title 
                        title="PLESIRAN BANYUWANGI"
                        spaceY="pt-20"
                        desc="Bingung mau liburan kemana di banyuwangi"
                    />

                    <span>
                        <a
                        href={'/destinations'}
                        className="group inline-flex items-center gap-2 text-l font-semibold uppercase tracking-wider text-neutral-900"
                        >
                        See All
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </a>
                    </span>
                </div>

                <MainGallery />

                <DestinationCarousel
                    destinations={destination}
                    loading={loading}
                    error={error}
                    title="Jelajahi Banyuwangi"
                    onCardClick={(destination) => navigate(`/data-destinations/${destination._id}`)}
                 />
                

                
            </div>
            <Footer />


        </>

    )
}

export default HomePage