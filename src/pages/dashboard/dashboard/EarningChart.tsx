import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useMonthlyEarningChartQuery } from '../../../redux/features/homeApi';

const EarningChart = () => { 
    const {data:monthlyEarning} = useMonthlyEarningChartQuery(undefined)  
  
    const data = monthlyEarning?.data?.map((value:any , index:number)=>({ 
        key:index ,
        name:value?.month,  
        earnings: value?.totalAmount 
    }))
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}
        >
            <div className="px-2 flex items-center justify-between">
                <h1 className="text-2xl font-medium">Monthly Earning</h1>
             
            </div>
            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[5000, 25000]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="earnings"
                        stroke="#6C4A00"
                        strokeWidth={2}
                        dot={{ fill: '#6C4A00', stroke: '#6C4A00', strokeWidth: 2, r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EarningChart;
