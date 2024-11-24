import { Button, Flex } from 'antd';
import { useState } from 'react';

import AddFaqForm from '../../components/ui/form/AddFaqForm';
import { GoQuestion } from 'react-icons/go';
import { CiEdit } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { useDeleteFaqMutation, useGetFaqQuery } from '../../redux/features/faqApi';
import Swal from 'sweetalert2';

const FAQs = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setEditModal] = useState({});
    const { data: faqData, refetch } = useGetFaqQuery(undefined) 
    const [deleteFaq] =  useDeleteFaqMutation()

    const handleDelete=(id:string|number)=>{ 

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
            await deleteFaq(id).then((res) => {
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
        <div>
            <Flex vertical={false} gap={10} align="center" justify="space-between">
                <div>
                    <h1 className="text-3xl text-primary font-semibold">FAQs</h1>
                </div>

                <div
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Button
                        onClick={() => setOpenModal(true)}
                        style={{
                            height: 40,
                        }}
                        type="primary"
                    >
                        Add FAQs
                    </Button>
                </div>
            </Flex>

            <div className="space-y-6 my-5">
                <div className="bg-white py-6 px-4 rounded-md">
                    {faqData?.data?.map((item: { question: string, answer: string, _id: string | number }, index: number) => (
                        <div key={index} className="flex justify-between items-start gap-4 ">
                            <div className="mt-3">
                                <GoQuestion color="#DBB162" size={25} />
                            </div>
                            <div className="w-full ">
                                <p className="text-base font-medium border-b rounded-xl py-2 px-4 flex items-center gap-8 bg-slate-50">
                                    <span className=" flex-1 "> {item?.question}</span>
                                </p>
                                <div className="flex justify-start items-start gap-2 border-b  py-2 px-4  rounded-xl my-4 bg-slate-50">
                                    <p className="text-[#919191] leading-[24px] mb-6 ">{item?.answer}</p>
                                </div>
                            </div>
                            <div className="w-[5%] flex justify-start flex-col items-start gap-2">
                                <CiEdit
                                    size={24}
                                    onClick={() => {
                                        setEditModal(item);
                                        setOpenModal(true)
                                    }}
                                    className="text-2xl cursor-pointer text-[#DBB162]"
                                />
                                <RxCross2
                                    size={24}
                                    onClick={() => { handleDelete(item?._id) }}
                                    className="text-2xl cursor-pointer text-red-600"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AddFaqForm openModal={openModal} setOpenModal={setOpenModal} openEditModal={openEditModal} setEditModal={setEditModal} refetch={refetch} />

        </div>
    );
};

export default FAQs;
