import { getFromLocalStorage } from "../../utils/LocalStorage";
import { baseApi } from "../baseApi";
const resetToken = getFromLocalStorage("resetToken")

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login 
    loginUser: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),

    // forget password  
    forgetPassword: builder.mutation({
      query: (value) => { 
        return {
          url: "/auth/forget-password",
          method: "POST",
          body: value
        }
      }
    }) , 

    // otp  
    verifyEmail:builder.mutation({
      query:(value)=>{ 
        
        return{
          url:"/auth/verify-email" ,
          method:"POST" ,
          body:value
        }
      }
    }) , 

  
    // reset password 
    resetPassword: builder.mutation({
      query: (value) => {  
      
        return{
          url: "/auth/reset-password", 
          headers: {Authorization: resetToken ? resetToken : ""},
          method: "POST",
          body: value,
        }
      },
    }),
    

    // get profile  
    getProfile:builder.query({
      query:()=>"/user/profile"
    }) ,  

    // update profile  
    updateProfile:builder.mutation({
      query:({id ,formData})=>{
        return{
          url:`/user/${id}` ,
          method:"PATCH" ,
          body: formData
        }
      }
    })  , 

  // change Password  
  changePassword:builder.mutation({
    query:(value)=>{
      return{
        url:"/auth/change-password" ,
        method:"POST" ,
        body:value
      }
    }
  }) , 

  }),
});

export const { useLoginUserMutation , useForgetPasswordMutation , useVerifyEmailMutation ,  useGetProfileQuery , useUpdateProfileMutation ,useChangePasswordMutation , useResetPasswordMutation } = authApi;
