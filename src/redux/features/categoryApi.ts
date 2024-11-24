import { baseApi } from "../baseApi";

const categoryApi= baseApi.injectEndpoints({
    endpoints: (builder) => ({     
        getCategory:builder.query({
            query:(page)=>{  
                const params = new URLSearchParams() 
                if(page)params.append("page",page)
              return{
                url:`/category` 
            } 
            }
          }) ,  

        addCategory:builder.mutation({
        query:(formData)=>({
          url:"/category/create-category" ,
          method:"POST" ,
          body:formData
        })
        }) ,  

        updateCategory:builder.mutation({
          query:({id , formData})=>{  
            return{
              url:`/category/${id}` ,
              method:"PATCH" ,
              body:formData
            }
          }
        }) ,  
        
        deleteCategory:builder.mutation({
          query:(id)=>({
            url:`/category/${id}` ,
            method:"DELETE"
          })
        }) , 
         
    }) 
}) 

export const {useAddCategoryMutation ,useDeleteCategoryMutation ,useGetCategoryQuery ,useUpdateCategoryMutation} = categoryApi