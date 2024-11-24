import { baseApi } from "../baseApi";

const discountApi= baseApi.injectEndpoints({
    endpoints: (builder) => ({       
 
        getDiscount:builder.query({
            query:({search , status , page})=>{  
                const params = new URLSearchParams();
                if (search) params.append("searchTerm", search);
                if (page) params.append("page", page);
                if (status) params.append("approvalStatus", status);
                return{
                    url:`/discount/get-all-discount?${params.toString()}`
                }
            }
        }) ,  

        updateDiscountStatus:builder.mutation({
            query:(value)=>{
                return{
                    url:`/discount/statusUpdate/${value?.id}` ,
                    method:"PATCH" ,
                    body: value
                }
            }
        })

     }) 
}) 

export const {useGetDiscountQuery , useUpdateDiscountStatusMutation} = discountApi