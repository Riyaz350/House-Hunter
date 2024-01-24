import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./Axios/useAxiosPublic";

const useBookings = (email) => {
    const axiosPublic = useAxiosPublic()

    const {data:bookingsData =[], isPending:houseLoading, refetch:customRe} =useQuery({
        queryKey:[email,'bookingsData'],
        queryFn: async()=>{
            
                const res = await axiosPublic.get(`/book/${email}`)
                return res.data
        }
    })
    return [bookingsData, houseLoading, customRe]
};

export default useBookings;