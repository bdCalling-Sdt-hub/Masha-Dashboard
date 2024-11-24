import { baseApi } from "../baseApi";

const termsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({    
//  for app  
        getAppTerms:builder.query({
            query:()=>"/terms/get-terms-app"
          }) ,
          updateAppTerms:builder.mutation({
            query:(value)=>({
              url:"/terms/create-terms-app" ,
              method:"POST" , 
              body:value
            })
          }) ,  

//  for brand  
getBrandTerms:builder.query({
    query:()=>"/terms/get-terms-brand"
  }) ,
  updateBrandTerms:builder.mutation({
    query:(value)=>({
      url:"/terms/create-terms" ,
      method:"POST" , 
      body:value
    })
  }) ,   
  
//  for Influencer  
getInfluencerTerms:builder.query({
    query:()=>"/terms/get-terms-influences"
  }) ,
  updateInfluencerTerms:builder.mutation({
    query:(value)=>({
      url:"/terms/create-terms-influences" ,
      method:"POST" , 
      body:value
    })
  }) ,   


    }) 
}) 

export const {useGetAppTermsQuery ,useGetBrandTermsQuery ,useGetInfluencerTermsQuery ,useUpdateAppTermsMutation ,useUpdateBrandTermsMutation ,useUpdateInfluencerTermsMutation} = termsApi