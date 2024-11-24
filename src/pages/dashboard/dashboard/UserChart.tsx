import { Select } from 'antd';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Legend, Bar } from 'recharts';
import { useUserStatisticsChartQuery } from '../../../redux/features/homeApi';
import { useState } from 'react';
const { Option } = Select;  

interface UserData {
    month: string;
    totalUsers: number
} 

const UserChart = () => {    
    const [year , setYear] = useState<number|string|null>()
    const {data:usersStatistics} = useUserStatisticsChartQuery(year)
    const data: UserData[] = usersStatistics?.data?.map((value:any , index:number)=>({ 
        key:index ,
        month: value?.month, 
         totalUsers: value?.totalRegistrations, 
    })) 

  const handleYear = (value:number|string)=>{
    setYear(value);
  }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}
        >
            <div className="px-2 flex items-center justify-between">
                <h1 className="text-2xl font-medium">Total Users Statistics</h1>
                <Select defaultValue="2024" className="w-32 h-[40px]" onChange={handleYear}>
                    <Option value="2024">2024</Option>
                    <Option value="2025">2025</Option>
                    <Option value="2026">2026</Option>
                    <Option value="2027">2027</Option>
                    <Option value="2028">2028</Option>
                    <Option value="2029">2029</Option>
                    <Option value="2030">2030</Option>
                </Select>
            </div>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalUsers" fill="#DAA520" />
                  
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserChart;
