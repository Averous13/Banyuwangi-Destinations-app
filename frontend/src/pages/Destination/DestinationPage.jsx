import { useState, useEffect} from 'react'
import {toast} from 'sonner'
import Header from '../../components/main/Header'
import Title from '../../components/Title'
import Gallery1 from '@/components/Gallery1'
import destinationApi from '@/api/destination'


const DestinationPage = () => {

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

    return (
        <>
            <Header />
            <Title 
            spaceY="pt-30"
            title="Explore Banyuwangi"
            desc="Turn your moments into memories"/>
            <Gallery1 data={data} loading={loading}/>

        </>

    )
}

export default DestinationPage;