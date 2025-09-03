
import { useQuery } from "@tanstack/react-query";
import { sessionUser } from "../../Apis/auth/sessionApi";

export const useSession = () =>{
    return useQuery({
        queryKey:["session"],
        queryFn: sessionUser,
        retry: false
    });
};
