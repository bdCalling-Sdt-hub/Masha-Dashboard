import { Button, Divider } from 'antd';

import { imageUrl } from '../../redux/baseApi';
import { Link } from 'react-router-dom';
import { useUpdateInfluencerStatusMutation } from '../../redux/features/influencerApi';
import Swal from 'sweetalert2';
const BrandDetails = ({modalData , refetch ,setShowBrand}:any) => { 
    const [updateInfluencerStatus] = useUpdateInfluencerStatusMutation()
    
    // reject 
    const handleReject = async(id:string|number)=>{  
        const data ={ 
            id:id ,
            loginStatus : "Rejected"
        } 

      await updateInfluencerStatus(data).then((res)=>{ 
   
        if(res?.data?.success){
            Swal.fire({
                text:res?.data?.message,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              }).then(()=>{
                setShowBrand(false)
                refetch() 

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
            id:id ,
            loginStatus : "Approved"
        } 

      await updateInfluencerStatus(data).then((res)=>{
        if(res?.data?.success){
            Swal.fire({
                text:res?.data?.message,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              }).then(()=>{
                setShowBrand(false)
                refetch() 

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
        <div className=" p-6 rounded-lg  mx-auto">
            {/* Header with Logo */}
            <div className="flex justify-center mb-4">
                <img src={modalData?.image?.startsWith("https") ? modalData?.image  : `${imageUrl}${modalData?.image}`  } alt="Lay's Logo" className="size-[156px] rounded-full" />
                {/* Adjust the logo path accordingly */}
            </div>

            {/* Content Grid */}
            <div className="flex gap-5 justify-between">
                {/* Brand's Details Section */}
                <div className="space-y-3 w-[49%]">
                    <h3 className="text-2xl text-center font-semibold text-gray-800 mb-4">Brand's Details</h3>
                    <p className="flex justify-between">
                        <span className="font-medium">Company Name:</span>
                        <span>{modalData?.name}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Category:</span>
                        <span>Wellness & Beauty</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Email:</span>
                        <span>{modalData?.email}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">What's App Number:</span>
                        <span>{modalData?.whatsapp}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Phone Number:</span>
                        <span>{modalData?.contact}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Owner Name:</span>
                        <span>{modalData?.ownerName}</span>
                    </p>
                  
                    <p className="flex justify-between">
                        <span className="font-medium">Location:</span>
                        <span>{modalData?.address}</span>
                    </p>
                </div>

                <div className="space-y-3 w-[2%]">
                    <div className="w-0.5  bg-primary h-[40vh]"></div>
                </div>
                {/* Social Media and Other Details Section */}
                <div className="w-[49%]">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Social Media Link</h3>
                    <div className="flex justify-between">
                        <p className="font-medium">TikTok:</p>
                        <Link to={modalData?.tiktokLink}>{modalData?.tiktokLink}</Link>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium">Instagram:</p>
                        <Link to={modalData?.instagramLink}>{modalData?.instagramLink}</Link>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <Divider />

            {/* Buttons */}
            <div className="flex justify-center space-x-4">
                <Button danger className="w-32" onClick={()=>handleReject(modalData?.id)} disabled={modalData?.status === "Rejected"}>
                    Reject
                </Button>
                <Button type="primary" className="w-32" onClick={()=>handleApprove(modalData?.id)} disabled={modalData?.status === "Approved"}>
                    Approve
                </Button>
            </div>
        </div>
    );
};

export default BrandDetails;
