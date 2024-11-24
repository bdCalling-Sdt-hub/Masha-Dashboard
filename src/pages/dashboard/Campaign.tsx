import { Table, Input, Select } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { useState } from 'react';
import CustomModal from '../../components/shared/CustomModal';
import CampaignDetails from '../../components/ui/CampaignDetails';
import { useGetCampaignQuery } from '../../redux/features/campaignApi';
import moment from 'moment';
import { imageUrl } from '../../redux/baseApi';
const { Option } = Select;

const Campaign = () => {
    const [campaignModal, setCampaignModal] = useState(false);  
    const [campaignData , setCampaignData] = useState()  
    const [status , setStatus]=  useState("") 
    const [search , setSearch] = useState() 
    const [page , setPage] = useState(1)
    const {data:Campaigns} = useGetCampaignQuery({search:search , status:status , page:page})   
    const campaignsData = Campaigns?.data 

    const data = campaignsData?.result?.map((value:any , index:number)=>({
        key: index+1,
        campaignName: value?.name, 
        image: value?.image?.startsWith("https") ? value?.image : `${imageUrl}${value?.image}` ,
        brandName: value?.user?.brand?.owner,
        campaignStatus: value?.approvalStatus,
        startDate: moment(value?.startTime).format("YYYY-MM-D") ,
        endDate:  moment(value?.endTime).format("YYYY-MM-D"), 
        address: value?.address ,
        gender:value?.gender ,
        details:value?.details ,  
        eventDate : moment(value?.startTime).format("YYYY/MM/D , h:mm a") ,
        instagram: value?.brandInstagram , 
        addressLink:value?.addressLink , 
        terms:value?.campaignTermAndCondition ,
        id:value?._id
    }))

    // Column definitions
    const columns = [
        {
            title: 'Campaign Name',
            dataIndex: 'campaignName',
            key: 'campaignName',
        },
        {
            title: 'Brand Owner',
            dataIndex: 'brandName',
            key: 'brandName',
        },
        {
            title: 'Campaign Status',
            dataIndex: 'campaignStatus',
            key: 'campaignStatus',
        },
        {
            title: 'Start Date/End Date',
            key: 'dateRange',
            render: (_text: any, record: any) => (
                <span>
                    {record.startDate} / {record.endDate}
                </span>
            ),
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_:any, record:any) => (
                <div className="flex items-center gap-3">
                    <button onClick={() => {setCampaignModal(true) , setCampaignData(record)}} className="text-primary">
                        <AiOutlineEye size={24} />
                    </button>
                    <button className="text-red-500">
                        <AiOutlineDelete size={24} />
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
                    <h1 className="text-3xl text-primary font-semibold">Manage Campaign</h1>
                </div>
                <div className="flex items-center gap-5 justify-end mb-5">
                    <Input
                        style={{
                            maxWidth: 300,
                            height: 42,
                        }}
                        placeholder="Search"
                        prefix={<SearchOutlined />} 
                        onChange={(e)=>handleOnSearch(e)}
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
            total: campaignsData?.meta?.total,
            pageSize: 10,  // Adjust as needed
            onChange: (page) => setPage(page),
        }} />
            <CustomModal
                body={<CampaignDetails  campaignData={campaignData}/>}
                open={campaignModal}
                setOpen={setCampaignModal}
                key={'campaign'}
                width={1015}
            />
        </div>
    );
};

export default Campaign;
