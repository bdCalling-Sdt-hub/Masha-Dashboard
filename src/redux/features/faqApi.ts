import { baseApi } from "../baseApi";

const faqApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({   
        getFaq:builder.query({
            query:()=>{ 
              return{
                url:`/faq`} 
            }
          }) ,  

        addFaq:builder.mutation({
        query:(value)=>({
          url:"/faq/create-faq" ,
          method:"POST" ,
          body:value
        })
        }) ,  

        updateFaq:builder.mutation({
          query:(data)=>{  
            return{
              url:`/faq/${data?._id}` ,
              method:"PATCH" ,
              body:data
            }
          }
        }) ,  
        
        deleteFaq:builder.mutation({
          query:(id)=>({
            url:`/faq/${id}` ,
            method:"DELETE"
          })
        }) , 
        
      }) 
}) 

export const {useAddFaqMutation , useDeleteFaqMutation , useGetFaqQuery ,useUpdateFaqMutation} = faqApi