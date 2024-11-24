import { baseApi } from "../baseApi";

const homeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({  
 
        summaryFirstRow : builder.query({
            query:()=>"/dashboard/get-all-brand-statistics"
        }) , 
        
        summarySecondRow : builder.query({
            query:()=>"/dashboard/get-all-influencer-statistics"
        }) , 

        monthlyEarningChart:builder.query({
            query:()=>"/dashboard/get-monthly-earnings"
        }) , 
        
        userStatisticsChart:builder.query({
            query:(year)=> {  
                const params = new URLSearchParams() 
                if(year)params?.append("year" ,year)
                return{
                    url:`/dashboard/get-monthly-user-registration?${params.toString()}`
                }  
            }
        }) , 

    }) 
}) 

export const {useSummaryFirstRowQuery , useSummarySecondRowQuery , useMonthlyEarningChartQuery , useUserStatisticsChartQuery }= homeApi