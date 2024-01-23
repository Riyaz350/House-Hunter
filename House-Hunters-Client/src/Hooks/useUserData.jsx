import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./Axios/useAxiosPublic";

const useUserData = (email) => {
    const axiosPublic = useAxiosPublic()

    const {data:userData =[], isPending:userLoading, refetch} =useQuery({
        queryKey:[email,'userData'],
        queryFn: async()=>{
            
                const res = await axiosPublic.get(`/user/${email}`)
                return res.data
        }
    })
    return [userData, userLoading, refetch]
};

export default useUserData;