import { Table, Dropdown, Input, Select } from 'antd';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import CustomModal from '../../components/shared/CustomModal';
import BrandDetails from '../../components/ui/BrandDetails';
import { useGetBrandQuery } from '../../redux/features/brandApi';
const { Option } = Select;
// Sample data

const Brands = () => {
    const [showBrand, setShowBrand] = useState(false); 
    const [modalData , setModalData] = useState()
    const [page , setPage] = useState(1) 
    const [status , setStatus] = useState() 
    const [search , setSearch] = useState()
    const {data:brands , refetch} = useGetBrandQuery({search:search , status:status , page:page})
 const brandsData = brands?.data 
 const data = brandsData?.result?.map((value:any , index:number)=>({
    key: index+1, 
    id:value?._id ,
    name: value?.fullName,
    email: value?.email,
    status: value?.loginStatus, 
     category: value?.brand?.category, 
     whatsapp: value?.brand?.whatAppNum , 
     contact: value?.brand?.phnNum ,
     ownerName: value?.brand?.owner, 
     address: value?.brand?.address, 
     image: value?.brand?.image, 
     instagramLink: value?.brand?.instagram, 
     tiktokLink: value?.brand?.tiktok, 


 }))

    // Column definitions
    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: "Brand's Name",
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Application Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <span
                    className={`px-3 py-1 rounded-full  font-semibold ${
                        status === 'Approved'
                            ? 'bg-[#ccf0eb] text-[#00B69B]'
                            : status === 'Pending'
                            ? 'bg-[#e0d4fc] text-[#6226EF]'
                            : 'bg-[#fcd7d4] text-[#EF3826]'
                    }`}
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
                                label: <span onClick={() =>{ setShowBrand(true) , setModalData(record)}}>View</span>,
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
                    <h1 className="text-3xl text-primary font-semibold">Manage Brands</h1>
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
            <Table columns={columns} dataSource={data} rowClassName="hover:bg-gray-100" 
            pagination={{
                current: page,
                total: brandsData?.meta?.total,
                pageSize: 10,  
                onChange: (page) => setPage(page),
            }} 
             />

            <CustomModal open={showBrand} setOpen={setShowBrand} body={<BrandDetails modalData={modalData} refetch={refetch} setShowBrand={setShowBrand} />} key={'brand'} width={900} />
        </div>
    );
};

export default Brands;
