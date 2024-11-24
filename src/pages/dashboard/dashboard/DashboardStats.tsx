import { FaHandshake } from 'react-icons/fa';
import { HiCalendar, HiCurrencyDollar, HiMiniUser, HiMiniUserGroup } from 'react-icons/hi2';
import { useSummaryFirstRowQuery, useSummarySecondRowQuery } from '../../../redux/features/homeApi';

const DashboardStats = () => { 
    const {data:firstRow} = useSummaryFirstRowQuery(undefined) 
    const {data:secondRow} = useSummarySecondRowQuery(undefined) 

    const data = [
        {
            name: 'Total Brands',
            count: firstRow?.data?.totalBrands,
            icon: <HiMiniUserGroup color="#DBB162" size={24} />,
            bgColor: '#fff',
            textColor: '#DAA520',
        },
        {
            name: 'Total Campaigns',
            count: firstRow?.data?.totalCampaigns,
            icon: <HiCalendar color="#DBB162" size={24} />,
            textColor: '#3F0D47',
            bgColor: '#fff',
        },
        {
            name: 'Total Revenue',
            count: firstRow?.data?.totalRevenue,
            icon: <HiCurrencyDollar color="#DBB162" size={24} />,
            textColor: '#00B047',
            bgColor: '#fff',
        },
        {
            name: 'Total Influencer',
            count: secondRow?.data?.totalInfluencer,
            icon: <HiMiniUser color="#DBB162" size={24} />,
            textColor: '#D0A933',
            bgColor: '#fff',
        },
        {
            name: 'Monthly Collaboration',
            count: secondRow?.data?.totalCollaboration,
            icon: <FaHandshake color="#DBB162" size={24} />,
            textColor: '#3F0D47',
            bgColor: '#fff',
        },
        {
            name: 'Monthly Revenue',
            count: secondRow?.data?.latestMonthlyRevenue,
            icon: <HiCurrencyDollar color="#DBB162" size={24} />,
            textColor: '#00B047',
            bgColor: '#fff',
        },
    ];

    return (
        <div>
            <div className="grid grid-cols-3 gap-3 items-center">
                {data.map((item, index) => (
                    <div key={index} className="bg-[#EED698] rounded-md p-10 border flex items-center gap-3">
                        <div className={`bg-white w-[44px] h-[44px] rounded-full flex items-center justify-center`}>
                            {item?.icon}
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                            <p className="flex items-center justify-center text-lg text-[#242424] font-medium">
                                {item.name}
                            </p>
                            <div>
                                <p
                                    style={{ color: item.textColor }} // Inline style for text color
                                    className="text-3xl font-bold"
                                >
                                    {item.count} 
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardStats;
