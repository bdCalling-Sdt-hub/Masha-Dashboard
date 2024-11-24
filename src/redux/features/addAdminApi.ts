import { baseApi } from "../baseApi";

const addAdminApi= baseApi.injectEndpoints({
    endpoints: (builder) => ({     
        
        getAdmin: builder.query({
            query: () => {
                return {
                    url: "/admin/get-admin"
                }
            }
        }),

        createAdmin: builder.mutation({
            query: (value) => {
                return {
                    url: "/admin/create-admin",
                    method: "POST",
                    body: value
                }
            }
        }) , 


        deleteAdmin:builder.mutation({
            query:(id)=>{
                return{
                    url:`/admin/${id}` ,
                    method:"DELETE" ,
                }
            }
        })

     }) 
}) 

export const  {useCreateAdminMutation , useDeleteAdminMutation , useGetAdminQuery} = addAdminApi