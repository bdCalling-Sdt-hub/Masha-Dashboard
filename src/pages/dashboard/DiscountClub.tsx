import { Input, Select, Table } from "antd";
import CustomModal from "../../components/shared/CustomModal";
import CampaignDetails from "../../components/ui/CampaignDetails";
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { imageUrl } from "../../redux/baseApi";
import { useState } from "react"; 
import { SearchOutlined } from '@ant-design/icons';
import moment from "moment";
import { useGetDiscountQuery } from "../../redux/features/discountClubApi";
import DiscountDetails from "../../components/ui/DiscountDetails";
const { Option } = Select;

const DiscountClub = () => { 
    const [campaignModal, setCampaignModal] = useState(false);  
    const [discountData , setDiscountData] = useState()  
    const [status , setStatus]=  useState("") 
    const [search , setSearch] = useState() 
    const [page , setPage] = useState(1)
    const {data:discounts} = useGetDiscountQuery({search:search , status:status , page:page})   
    const discountsData = discounts?.data 

    const data = discountsData?.result?.map((value:any , index:number)=>({
        key: index+1,
        productName: value?.name, 
        image: value?.image?.startsWith("https") ? value?.image : `${imageUrl}${value?.image}` ,
        price: value?.price,
        discountPercentage: value?.discount,
        description:value?.description , 
        status:value?.status , 
        category: value?.category?.categoryName , 
        id:value?._id
    }))

    // Column definitions
    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName', 
            render:(_:any, record:any)=>(
                <div className=" flex items-center gap-x-3 " > 
                <img src={record?.image} alt="" className=" w-10 h-8 rounded-md" /> 
                <p>{record?.productName}</p>
                </div>
            )
        },
        {
            title: 'Category Name',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Discount Percentage',
            dataIndex: 'discountPercentage',
            key: 'discountPercentage',
        },
        
        {
            title: 'Actions',
            key: 'action',
            render: (_:any, record:any) => (
                <div className="flex items-center gap-3">
                    <button onClick={() => {setCampaignModal(true) , setDiscountData(record)}} className="text-primary">
                        <AiOutlineEye size={24} />
                    </button>
                </div>
            ),
        },
    ]; 
     
    const handleStatus =(value:any)=>{
        setStatus(value);
    } 

const handleOnSearch = (e:any) =>{ 
    const value = e.target.value
    setSearch(value);
} 
    return (
        <div className="">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl text-primary font-semibold">Discount Club</h1>
                </div>
                <div className="flex items-center gap-5 justify-end mb-2">
                    <Input
                        style={{
                            maxWidth: 300,
                            height: 40,
                        }}
                        placeholder="Search"
                        prefix={<SearchOutlined />} 
                        onChange={(e)=>handleOnSearch(e)}
                    />

                    {/* Dropdown Filter */}
                    <Select defaultValue="All" className="w-40 h-[40px]" onChange={handleStatus}>
                        <Option value="">All</Option>
                        <Option value="Block">Block</Option>
                        <Option value="UnBlock">UnBlock</Option>
                    </Select>
                </div>
            </div>
            <Table columns={columns} dataSource={data} rowClassName="hover:bg-gray-100" 
           pagination={{
            current: page,
            total: discountsData?.meta?.total,
            pageSize: 10, 
            onChange: (page) => setPage(page),
        }} />
            <CustomModal
                body={<DiscountDetails  discountData={discountData}/>}
                open={campaignModal}
                setOpen={setCampaignModal}
                key={'campaign'}
                width={1015}
            />
        </div>
    );
};

export default DiscountClub;