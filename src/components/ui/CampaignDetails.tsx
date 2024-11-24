import { Button, Input, Radio } from 'antd';
import dayjs from 'dayjs';
import { useUpdateCampaignStatusMutation } from '../../redux/features/campaignApi';
import Swal from 'sweetalert2';
import { useState } from 'react';
const CampaignDetails = ({ campaignData }:any) => { 
    const [updateCampaignStatus] = useUpdateCampaignStatusMutation() 
    const [isDisable , setIsDisable] = useState(false)
    const defaultStartDate = dayjs(campaignData?.eventDate, 'YYYY-MM-DD HH:mm');

    const inputStyle = { height: 40 };
    const labelClass = "block text-sm font-medium mb-1"; 

    const renderInputField = (label:string, value:string, extraProps = {}) => (
        <div className="mb-4">
            <label className={labelClass}>{label}</label>
            <Input style={inputStyle} value={value} readOnly {...extraProps} className='p-2' />
        </div>
    );

    const renderTextAreaField = (label:string, value:string) => (
        <div className="mb-4">
            <label className={labelClass}>{label}</label>
            <Input.TextArea rows={3} value={value} readOnly className='p-2' />
        </div>
    ); 

 
    

    // reject 
    const handleReject = async(id:string|number)=>{ 
        const data ={
            approvalStatus : "Rejected"
        } 

      await updateCampaignStatus({id , data}).then((res)=>{
        if(res?.data?.success){
            Swal.fire({
                text:res?.data?.message,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              }).then(()=>{
                setIsDisable(true)
              })
        }else{
            Swal.fire({
                title: "Oops", 
                //@ts-ignore
                text: res?.error?.data?.message,
                icon: "error",
                timer: 1500,
                showConfirmButton: false,
              });
          
        }
      })
    } 

     // approved   
     const handleApprove = async(id:string|number)=>{
        const data ={
            approvalStatus : "Approved"
        } 

      await updateCampaignStatus({id , data}).then((res)=>{
        if(res?.data?.success){
            Swal.fire({
                text:res?.data?.message,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              }).then(()=>{
                setIsDisable(true)
              })
        }else{
            Swal.fire({
                title: "Oops", 
                //@ts-ignore
                text: res?.error?.data?.message,
                icon: "error",
                timer: 1500,
                showConfirmButton: false,
              });
          
        }
      })
     }

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold text-center mb-4">Campaign Details</h2>

            {/* Brand Logo */}
            <div className="flex justify-center mb-6">
                <img
                    src={campaignData?.image}
                    alt="Brand Logo"
                    className="size-[150px] object-contain rounded-full border border-gray-300"
                />
            </div>

            {/* Form Content */}
            <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div>
                    {renderInputField("Name of the Campaign", campaignData?.campaignName)}
                    {renderInputField("Event Date & Time", defaultStartDate.format("DD MMM HH:mm A"))}
                    {renderInputField("Address", campaignData?.address)}
                    {renderInputField(
                        "Address Link",campaignData?.addressLink )}
                    {renderInputField("Gender", campaignData?.gender)}
                </div>

                {/* Right Column */}
                <div>
                    {renderTextAreaField("Campaign Details", campaignData?.details)}
                    {renderTextAreaField("Terms & Conditions", campaignData?.terms)}
                    {renderInputField("Brand's Instagram", campaignData?.instagram)}
                    <div className="mb-4">
                        <label className={labelClass}>Choose the type of requirement they are looking for</label>
                        <Radio.Group className="flex flex-col">
                            <Radio value={1}>3 Quality stories during the event mentioning the brand's IG.</Radio>
                            <Radio value={2}>Permanent photo posted on IG.</Radio>
                        </Radio.Group>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-4">
                <Button onClick={()=>handleReject(campaignData?.id)} danger className="w-32" disabled={isDisable}>Reject</Button>
                <Button type="primary" className="w-32" onClick={()=>handleApprove(campaignData?.id)} disabled={isDisable}>Approve</Button>
            </div>
        </div>
    );
};

export default CampaignDetails;
