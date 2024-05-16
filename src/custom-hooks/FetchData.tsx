import { useEffect, useState } from "react"
import { server_calls } from "../api/server"

export const useGetData = () => {
    // Rename contactData to carData to reflect the data it handles
    const [carData, setCarData] = useState<[]>([])

    async function handleDataFetch() {
        const result = await server_calls.get();
        setCarData(result)
    }

    // useEffect to call handleDataFetch on component mount
    useEffect(() => {
        handleDataFetch();
    }, [])

    // Return the carData and the getData function for re-fetching the data
    return { carData, getData: handleDataFetch }
}
