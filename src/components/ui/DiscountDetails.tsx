import { Button, Input } from 'antd';
import Swal from 'sweetalert2';
import { useUpdateDiscountStatusMutation } from '../../redux/features/discountClubApi';

const DiscountDetails = ({discountData}) => {
    const [updateDiscountStatus] = useUpdateDiscountStatusMutation() 


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

      await updateDiscountStatus({id , data}).then((res)=>{
        if(res?.data?.success){
            Swal.fire({
                text:res?.data?.message,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              }).then(()=>{
                
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

      await updateDiscountStatus({id , data}).then((res)=>{
        if(res?.data?.success){
            Swal.fire({
                text:res?.data?.message,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              }).then(()=>{
                
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
        <h2 className="text-xl font-semibold text-center mb-4">Discount Details</h2>

        {/* Brand Logo */}
        <div className="flex justify-center mb-6">
            <img
                src={discountData?.image}
                alt="Brand Logo"
                className="size-[150px] object-contain rounded-full border border-gray-300"
            />
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-1 gap-4">
            {/* Left Column */}
            <div>
                {renderInputField("Product Name", discountData?.productName)}
                {renderInputField("Price", discountData?.price)}
                {renderInputField(
                    "Discount Percentage",discountData?.discountPercentage )}
                {renderInputField("category", discountData?.category)}
                {renderTextAreaField("Description", discountData?.description)}
            </div>

               

        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-4">
            <Button onClick={()=>handleReject(discountData?.id)} danger className="w-32" disabled={discountData?.status === "Rejected"}>Reject</Button>
            <Button type="primary" className="w-32" onClick={()=>handleApprove(discountData?.id)} >Approve</Button>
        </div>
    </div>
    );
};

export default DiscountDetails;