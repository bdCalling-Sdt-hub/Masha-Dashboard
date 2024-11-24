import { baseApi } from "../baseApi";

const brandApi= baseApi.injectEndpoints({
    endpoints: (builder) => ({      
 
        getBrand:builder.query({
            query:({search , status , page})=>{  
                const params = new URLSearchParams();
                if (search) params.append("searchTerm", search);
                if (page) params.append("page", page);
                if (status) params.append("loginStatus", status);
                return{
                    url:`/user/brand?${params.toString()}`  
                }
            }
        }) ,  

        updateBrandStatus:builder.mutation({
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

export const  { useGetBrandQuery, useUpdateBrandStatusMutation} = brandApi