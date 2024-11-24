import { Button, Pagination } from 'antd';
import { useGetNotificationsQuery, useUpdateNotificationMutation } from '../../redux/features/notificationApi';
import moment from 'moment';
import { useState } from 'react';
const Notification = () => { 
    const [page , setPage] = useState(1) 
    const { data: notifications , refetch } = useGetNotificationsQuery(page)
    const [updateNotification] = useUpdateNotificationMutation()
   

    const handleReadAll = async () => {
        const type = {
            type: 'ADMIN'
        }

        await updateNotification(type).then((res) => {
            refetch()
        })


    }

    return (
        <div className="mt-5">
            <div className="bg-white p-5 rounded-xl">
                <div className="flex items-center justify-between my-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-primary">Notification</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button onClick={handleReadAll}
                            style={{
                                height: '40px',

                                borderRadius: '8px',
                                border: '2px solid #daa520',

                                background: 'white',

                                color: '#daa520',
                                fontWeight: '400',
                                fontSize: 14,
                            }}
                        >
                            <span>Read all</span>
                        </Button>
                    </div>
                </div>
                <div>
                    {notifications?.data?.result?.map((item: any, index: number) => {
                        return (
                            <div key={index} className={`w-full mx-auto p-4 my-3   shadow-md ${item?.read === false ? "bg-[#fbf6e9]" : "bg-white"}`}>
                                <div className=" text-sm">
                                    <div className="flex items-center gap-5">
                                        <p className="font-semibold text-[#555555]">{item?.text}</p>
                                        <div className="flex justify-between items-center gap-5 text-[#A7A7A7]">
                                            <span className="text-xs ">{moment(item?.createdAt
                                            ).format('MMMM D YYYY')}</span>
                                            <span className="text-xs ">{moment(item?.createdAt
                                            ).format('h:mm a')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div> 
                <Pagination current={page}
                  total= {notifications?.data?.meta?.total}
                pageSize= {10}
                onChange= {(page) => setPage(page)} />
            </div>
        </div>
    );
};

export default Notification;
