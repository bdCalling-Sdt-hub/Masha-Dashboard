import { baseApi } from "../baseApi";

const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({   
        getNotifications:builder.query({
            query:(page)=>{  
                const params = new URLSearchParams();
                if (page) params.append("page", page);
              return{
                url:`/notification/admin?${params.toString()}`} 
            }
          }) ,   

          updateNotification:builder.mutation({
            query:(value)=>{
                return{
                    url:`/notification/admin` ,
                    method:"PATCH" ,
                     body: value
                }
            }
          })
        
      }) 
}) 

export const {useGetNotificationsQuery , useUpdateNotificationMutation} = notificationApi