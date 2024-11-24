import { Button, ConfigProvider, Flex, Table } from 'antd';
import { useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { AiOutlineEdit } from 'react-icons/ai';
import { useDeleteCategoryMutation, useGetCategoryQuery } from '../../redux/features/categoryApi';
import { imageUrl } from '../../redux/baseApi';
import AddCategories from '../../components/ui/form/AddCategories';
import Swal from 'sweetalert2';


const Categories = () => {
    const [openAddModel, setOpenAddModel] = useState(false);
    const [itemForEdit, setItemForEdit] = useState();
    const [page, setPage] = useState(1)
    const { data: categoriesDatas, refetch } = useGetCategoryQuery(page)
    const [deleteCategory] = useDeleteCategoryMutation()
    const categoriesData = categoriesDatas?.data

    const categories = categoriesData?.result?.map((value: any, index: number) => ({
        key: index + 1,
        id: value?._id,
        name: value?.categoryName,
        image: value?.image?.startsWith("https") ? value?.image : `${imageUrl}${value?.image}`
    }))


    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
            render: (_: any, record: any) => <div className='flex items-center gap-2'>
                <img src={record?.image} alt="" className='w-16 h-14 rounded-md' />
                <p>{record?.name}</p>
            </div>
        },

        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <button onClick={() => { setOpenAddModel(true), setItemForEdit(record) }}>
                        <AiOutlineEdit className="text-xl text-primary" />
                    </button>

                    <button onClick={()=>handleDelete(record?.id)}>
                        <IoTrashOutline className="text-xl text-red-500" />
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
            await deleteCategory(id).then((res) => {
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
            <Flex className="my-2" vertical={false} gap={10} align="center" justify="space-between">
                <div>
                    <h1 className="text-3xl text-primary font-semibold">Manage Categories</h1>
                </div>

                <div
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Button
                        onClick={() => setOpenAddModel(true)}
                        style={{
                            height: 40,
                        }}
                        type="primary"
                    >
                        Add Category
                    </Button>
                </div>
            </Flex>

            <ConfigProvider>
                <Table columns={columns} dataSource={categories}
                    pagination={{
                        current: page,
                        total: categoriesDatas?.meta?.total,
                        pageSize: 10,
                        onChange: (page) => setPage(page),
                    }} />
            </ConfigProvider>

            <AddCategories setItemForEdit={setItemForEdit} itemForEdit={itemForEdit} setOpenAddModel={setOpenAddModel} openAddModel={openAddModel} refetch={refetch} />
        </div>
    );
};

export default Categories;
