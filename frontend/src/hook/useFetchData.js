import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";


export function useFetchData(apiInstance, {
    endpoint = '/',
    dataKey,
    pageIndex = 0,
    pageSize = 10,
    filters = {},
    errorMessage = "Failed to fetch data",
} = {}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRateLimit, setIsRateLimit] = useState(false);
    const [meta, setMeta] = useState({total: 0, pageCount: 0});

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiInstance.get(endpoint, {
                params: {
                    page: pageIndex + 1,
                    limit: pageSize,
                    ...filters,
                },
            });

            setIsRateLimit(false);

            const result = dataKey ? response.data[dataKey] : response.data;
            setData(result);

            setMeta({
                total: response.data.total,
                pageCount: Math.ceil(response.data.total / pageSize),
            });
        } catch (error) {
            console.error("error fetching: ", error);
            if (error.response && error.response.status === 429) {
                setIsRateLimit(true);
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false)
        }
    }, [apiInstance, endpoint, dataKey, pageIndex, pageSize, JSON.stringify(filters)]);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return { data, setData ,meta, setMeta, loading, isRateLimit, refetch: fetchData}
}