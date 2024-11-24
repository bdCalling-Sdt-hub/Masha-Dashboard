import { Rate, Table } from 'antd';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import CustomModal from '../../components/shared/CustomModal';
import ReviewForm from '../../components/ui/form/ReviewForm';
import { useState } from 'react';
import { useDeleteReviewMutation, useGetReviewsQuery } from '../../redux/features/reviewApi';
import moment from 'moment';
import Swal from 'sweetalert2';


const Review = () => {
    const [viewReview, setViewReview] = useState(false);   
    const [modalData , setModalData] =  useState()
    const [page , setPage] = useState(1) 
    const {data:reviews , refetch} = useGetReviewsQuery(page)   
    const [deleteReview] = useDeleteReviewMutation()
    const reviewsData = reviews?.data
    // console.log(reviewsData);  

    const data = reviewsData?.result?.map((value:any , index:number)=>({
        key: index+1, 
        id:value?._id ,
        date: moment(value?.createdAt).format("YYYY/MM/D") , 
        time:moment(value?.createdAt).format(" h:mm  a") , 
        userName: value?.influencer?.influencer?.fullName,
        brandName: value?.brand?.brand?.owner, 
        rating: value?.rating , 
        details:value?.details 
    })) 


    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: "User's Name",
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Brand Name',
            dataIndex: 'brandName',
            key: 'brandName',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating', 
            render:(rating:number)=><Rate disabled defaultValue={rating} />
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_:any,record:any) => (
                <div className="flex items-center gap-3">
                    <button onClick={() => {setViewReview(true) , setModalData(record) }} className="text-primary">
                        <AiOutlineEye size={24} />
                    </button>
                    <button className="text-red-500" onClick={()=>handleDelete(record?.id)}>
                        <AiOutlineDelete size={24} />
                    </button>
                </div>
            ),
        },
    ]; 

    const handleDelete=async(id:string|number)=>{ 
        Swal.fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await deleteReview(id).then((res) => {
              if (res?.data?.success) {
                Swal.fire({
                  text: res?.data?.message,
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  refetch();
                });
              } else {
                Swal.fire({
                  title: "Oops",
                  //@ts-ignore
                  text: res?.error?.data?.message,
                  icon: "error",
                  timer: 1500,
                  showConfirmButton: false,
                });
              }
            });
          }
        });
      }  

    return (
        <div className="">
            <div className="my-3">
                <h1 className="text-3xl text-primary font-semibold">Manage Reviews</h1>
            </div>
            <Table columns={columns} dataSource={data} rowClassName="hover:bg-gray-100" 
               pagination={{
                current: page,
                total: reviewsData?.meta?.total,
                pageSize: 10, 
                onChange: (page) => setPage(page),
            }}  />
            <CustomModal
                body={<ReviewForm modalData={modalData} />}
                open={viewReview}
                setOpen={setViewReview}
                key={'review'}
                title="Review"
                width={532}
            />
        </div>
    );
};

export default Review;
