import { Table, Dropdown, Input, Select } from 'antd';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import CustomModal from '../../components/shared/CustomModal';
import InfluencerDetails from '../../components/ui/InfluencerDetails';
import { useGetInfluencerQuery } from '../../redux/features/influencerApi';
const { Option } = Select;
// Sample data


// Column definitions

const Influencer = () => {
    const [showInfluencerDetails, setInfluencerDetails] = useState(false);   
    const [modalData , setModalData] = useState()
    const [page , setPage] = useState(1) 
    const [status , setStatus] = useState() 
    const [search , setSearch] = useState()
    const {data:influencers , refetch} = useGetInfluencerQuery({search:search , status:status , page:page})  
    const influencersData = influencers?.data 

const influencerData = influencersData?.result?.map((value:any , index:number)=>({
    id: value?._id, 
    key: index+1 ,
    name: value?.fullName,
    email: value?.influencer?.email, 
    status: value?.loginStatus, 
    gender: value?.influencer?.gender, 
  describe: value?.influencer?.describe , 
  contact: value?.influencer?.number , 
  whatsapp: value?.influencer?.whatAppNum , 
  address: value?.influencer?.address , 
  city: value?.influencer?.city ,
  zip: value?.influencer?.zip , 
  country: value?.influencer?.country ,
  tiktok: value?.influencer?.tiktok, 
  instagram: value?.influencer?.instagram, 
  followerIns: value?.influencer?.followersIG, 
  followerTk: value?.influencer?.followersTK,
  image: value?.influencer?.image,
}))


    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: "Influencer's Name",
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Campaign Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <span
                    style={{
                        fontWeight: 500,
                    }}
                    className={status === 'Active' ? 'text-[#00B69B]' : 'text-red-500'}
                >
                    {status}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: 'view',
                                label: <span onClick={() => {setInfluencerDetails(true) , setModalData(record)}}>View</span>,
                            },
                        ],
                    }}
                    trigger={['click']}
                >
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        <BsThreeDotsVertical />
                    </a>
                </Dropdown>
            ),
        },
    ];
 
    const handleStatus = (values:any) =>{
 setStatus(values)
    } 

const handleSearch = (e:any) =>{
    const search = e.target.value  
    setSearch(search)
}

    return (
        <div className="">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl text-primary font-semibold">Manage Influencer</h1>
                </div>
                <div className="flex items-center gap-5 justify-end mb-5">
                    <Input
                        style={{
                            maxWidth: 300,
                            height: 42,
                        }}
                        placeholder="Search"
                        prefix={<SearchOutlined />} 
                        onChange={(e)=>handleSearch(e)}
                    />

                    {/* Dropdown Filter */}
                    <Select defaultValue="All" className="w-40 h-[42px]" onChange={handleStatus}>
                        <Option value="">All</Option>
                        <Option value="Approved">Approved</Option>
                        <Option value="Pending">Pending</Option>
                        <Option value="Rejected">Rejected</Option>
                    </Select>
                </div>
            </div>
            <Table columns={columns} dataSource={influencerData} rowClassName="hover:bg-gray-100" 
            pagination={{
                current: page,
                total: influencersData?.meta?.total,
                pageSize: 10,  
                onChange: (page) => setPage(page),
            }}  
             />
            <CustomModal
                open={showInfluencerDetails}
                setOpen={setInfluencerDetails}
                body={<InfluencerDetails modalData={modalData} refetch={refetch} setInfluencerDetails={setInfluencerDetails} />}
                key={'influencer-details'}
                width={900}
            />
        </div>
    );
};

export default Influencer;
