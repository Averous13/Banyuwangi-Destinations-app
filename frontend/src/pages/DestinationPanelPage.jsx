import React, { useState, useEffect } from "react";

import Title2 from "../components/Title2";
import Header from "../components/Header";

import { DataTable } from "../components/ui/DataTable";
import { toast } from "sonner";
import { columns } from "../components/ColumnsDestination";
import destinationApi from "../api/destination";

const DestinationPanelPage = () => {
    const [destination, setDestination] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRateLimit, setIsRateLimit] = useState(true);
    useEffect(() => {
        const fetchDestination = async () => {
            setIsLoading(true);
            try {
                const response = await destinationApi.get('/');
                setIsRateLimit(false);
                setDestination(response.data.destinations);
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
    }, []);

    return (
        <>
            <Header />
            <Title2 title="Destination Panel" spaceY="pt-26" />
            <div className="container mx-auto py-5">
                <DataTable columns={columns} data={destination} />
            </div>
        </>

    )
}

export default DestinationPanelPage;