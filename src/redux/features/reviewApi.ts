import { baseApi } from "../baseApi";

const reviewApi= baseApi.injectEndpoints({
    endpoints: (builder) => ({    
 
        getReviews:builder.query({
            query:(page)=>{ 
                const params = new URLSearchParams() 
                if(page)params.append("page",page)
                return{
                    url:`/review?${params.toString()}`
                }
            }
        }) ,  

        deleteReview:builder.mutation({
            query:(id)=>({
              url:`/review/${id}` ,
              method:"DELETE"
            })
          }) , 
      }) 
}) 
export const {useGetReviewsQuery , useDeleteReviewMutation} = reviewApi