import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./Axios/useAxiosPublic";

const useHousesData = (email) => {
    const axiosPublic = useAxiosPublic()

    const {data:houseData =[], isPending:houseLoading, refetch} =useQuery({
        queryKey:[email,'houseData'],
        queryFn: async()=>{
            
                const res = await axiosPublic.get(`/house/${email}`)
                return res.data
        }
    })
    return [houseData, houseLoading, refetch]
};

export default useHousesData;