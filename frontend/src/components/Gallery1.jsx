import { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import destinationApi from '@/api/destination'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

const Gallery1 = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const response = await destinationApi.get('/');
                console.log(response.data.destinations);
                setData(response.data.destinations);
            } catch(error) {
                toast.error("Error fetching data:", error);
            } finally{
                setLoading(false);
            }
        }

        fetchDestination();
    }, [])


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-xl'>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {data.map((destination) => (
                        <Link key={destination._id} to={`/destination/${destination._id}`}>
                        <Card key={destination._id} className="relative overflow-hidden group cursor-pointer aspect-[4/5]">
                            <CardContent className="p-0 h-full">
                                <img 
                                src={destination.image.url} 
                                alt={destination.image.public_id}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                                
                                {/* Text Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-white text-xl font-serif leading-tight">
                                    {destination.name}
                                </h3>
                                </div>
                            </CardContent>
                        </Card>           
                        </Link>
                    ))}
                </div>
            </div>

        </>
    )
}

export default Gallery1;