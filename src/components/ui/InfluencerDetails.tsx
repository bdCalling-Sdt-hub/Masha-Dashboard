import { Button, Divider } from 'antd';
import { imageUrl } from '../../redux/baseApi';
import { Link } from 'react-router-dom'; 
import { useUpdateInfluencerStatusMutation } from '../../redux/features/influencerApi';
import Swal from 'sweetalert2';
const InfluencerDetails = ({modalData , refetch , setInfluencerDetails}:any) => {  
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
                setInfluencerDetails(false)
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
                setInfluencerDetails(false)
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
            <div className="flex justify-center gap-4 mb-4"> 
                 { 
                    modalData?.image?.map((value:any , index:number) =>  <img key={index} src={value.startsWith("https") ? value  : `${imageUrl}${value}`} alt="Lay's Logo" className="size-[156px] rounded-full" />)
                 }            
            </div>

            {/* Content Grid */}
            <div className="flex gap-5 justify-between my-4">
                {/* Brand's Details Section */}
                <div className="space-y-3 w-[49%]">
                    <h3 className="text-xl text-center font-medium text-gray-800 mb-4">Influencer’s Details </h3>
                    <p className="flex justify-between">
                        <span className="font-medium">Full Name:</span>
                        <span>{modalData?.name}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Gender:</span>
                        <span>{modalData?.gender}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Describe yourself within 3 words:</span>
                        <span>{modalData?.describe}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Contact Number:</span>
                        <span>{modalData?.contact}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">What's App Number:</span>
                        <span>{modalData?.whatsapp}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Email:</span>
                        <span>{modalData?.email}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Address:</span>
                        <span>{modalData?.address}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">City:</span>
                        <span>{modalData?.city}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Zip:</span>
                        <span>{modalData?.zip}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Country:</span>
                        <span>{modalData?.country}</span>
                    </p>
                </div>

                <div className="space-y-3 w-[2%]">
                    <div className="w-0.5  bg-primary h-[40vh]"></div>
                </div>
                {/* Social Media and Other Details Section */}
                <div className="w-[49%]">
                    <h3 className="text-xl font-medium text-center text-gray-800 mb-4">Social Media Link</h3>
                    <div className="flex justify-between">
                        <p className="font-medium">Tiktok:</p>
                        <Link to={modalData?.tiktok}>{modalData?.tiktok}</Link>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium">Instagram:</p>
                        <Link to={modalData?.instagram}>{modalData?.instagram}</Link>
                    </div>

                    <Divider type="vertical" className="my-4" />

                    <h3 className="text-lg font-medium text-center text-gray-800 mt-6">Follower Information</h3>
                    <p className="flex justify-between">
                        <span className="font-medium">Instagram Follower:</span>
                        <span className="text-green-500">{modalData?.followerIns}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">TikTok Follower:</span>
                        <span className="text-blue-500">{modalData?.followerTk}</span>
                    </p>
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

export default InfluencerDetails;
