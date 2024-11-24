import { baseApi } from "../baseApi";

const influencerApi= baseApi.injectEndpoints({
    endpoints: (builder) => ({      
 
        getInfluencer:builder.query({
            query:({search , status , page})=>{  
                const params = new URLSearchParams();
                if (search) params.append("searchTerm", search);
                if (page) params.append("page", page);
                if (status) params.append("loginStatus", status);
                return{
                    url:`/user/influencer?${params.toString()}`  
                }
            }
        }) ,  

        updateInfluencerStatus:builder.mutation({
            query:(data)=>{
                return{
                    url:`/permisson/${data?.id}` ,
                    method:"PATCH" ,
                    body: data
                }
            }
        })
    }) 
}) 

export const  {useGetInfluencerQuery , useUpdateInfluencerStatusMutation} = influencerApi