import { baseApi } from "../baseApi";

const campaignApi= baseApi.injectEndpoints({
    endpoints: (builder) => ({      
 
        getCampaign:builder.query({
            query:({search , status , page})=>{  
                const params = new URLSearchParams();
                if (search) params.append("searchTerm", search);
                if (page) params.append("page", page);
                if (status) params.append("approvalStatus", status);
                return{
                    url:`/campaign/admin?${params.toString()}`
                }
            }
        }) ,  

        updateCampaignStatus:builder.mutation({
            query:({ id , value})=>{
                return{
                    url:`/updated-campaign-status/${id}` ,
                    method:"PATCH" ,
                    body: value
                }
            }
        })
    }) 
}) 

export const  {useGetCampaignQuery , useUpdateCampaignStatusMutation} = campaignApi