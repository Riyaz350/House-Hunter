import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./Axios/useAxiosPublic";

const useAllHousesData = () => {
    const axiosPublic = useAxiosPublic()

    const {data:houses =[], isPending:houseLoading, refetch} =useQuery({
        queryKey:['houses'],
        queryFn: async()=>{
            
                const res = await axiosPublic.get(`/house`)
                return res.data
        }
    })
    return [houses, houseLoading, refetch]
};

export default useAllHousesData;