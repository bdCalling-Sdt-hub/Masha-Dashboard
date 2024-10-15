import { HiMiniUserGroup } from 'react-icons/hi2';

const DashboardStats = () => {
    const data = [
        {
            name: 'Total Brands',
            count: '20.10K',
            icon: <HiMiniUserGroup color="#DBB162" size={24} />,
            bgColor: '#fff',
            textColor: '#DAA520',
        },
        {
            name: 'Total Campaigns',
            count: '920',
            icon: <HiMiniUserGroup color="#DBB162" size={24} />,
            textColor: '#3F0D47',
            bgColor: '#fff',
        },
        {
            name: 'Total Revenue',
            count: '150.10K',
            icon: <HiMiniUserGroup color="#DBB162" size={24} />,
            textColor: '#00B047',
            bgColor: '#fff',
        },
        {
            name: 'Total Influencer',
            count: '150.10K',
            icon: <HiMiniUserGroup color="#DBB162" size={24} />,
            textColor: '#D0A933',
            bgColor: '#fff',
        },
        {
            name: 'Monthly Collaboration',
            count: '150.10K',
            icon: <HiMiniUserGroup color="#DBB162" size={24} />,
            textColor: '#3F0D47',
            bgColor: '#fff',
        },
        {
            name: 'Monthly Revenue',
            count: '150.10K',
            icon: <HiMiniUserGroup color="#DBB162" size={24} />,
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
                                    {item.count} +
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
