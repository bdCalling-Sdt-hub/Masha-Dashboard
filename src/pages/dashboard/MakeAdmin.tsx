import { BsTrash } from 'react-icons/bs';
import { Button, Flex, Form, Input, Table } from 'antd';
import CustomModal from '../../components/shared/CustomModal';
import { useEffect, useState } from 'react';
import { useCreateAdminMutation, useDeleteAdminMutation, useGetAdminQuery } from '../../redux/features/addAdminApi';
import Swal from 'sweetalert2';
import { useGetProfileQuery } from '../../redux/features/authApi';

const MakeAdmin = () => { 
    const [form] = Form.useForm()
    const [makeAdminModal, setMakeAdminModal] = useState(false);  
   
    const {data:getAdmins , refetch} = useGetAdminQuery(undefined)    
    const [deleteAdmin] = useDeleteAdminMutation() 
    const [createAdmin , {isError ,isLoading ,isSuccess ,data:AdminData , error}] = useCreateAdminMutation() 
    const {data:adminProfile} = useGetProfileQuery(undefined) 
     const adminRole = adminProfile?.data?.role

    const data = getAdmins?.data?.map((value:{email:string , fullName:string , role:string , _id:string|number} , index:number)=>({
        key: index+1,
        email: value?.email,
        admin_name: value?.fullName,
        admin_type: value?.role, 
        id:value?._id
    })) 

    const handleDelete =async(id:number|string)=>{ 
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
            await deleteAdmin(id).then((res) => { 
            
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

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            width: 150,
        },
        {
            title: 'Admin Name',
            dataIndex: 'admin_name',
            key: 'admin_name',
        },

        {
            title: 'Admin Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Admin Type',
            dataIndex: 'admin_type',
            key: 'admin_type', 
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            textAlign: 'center',
            render: (_:any,record:any) => (      
                    <Button onClick={()=>handleDelete(record?.id)} disabled={adminRole === "ADMIN"} >
                        <BsTrash className="text-red-600" size={20} />
                    </Button>
            ),
        },
    ]; 

    const onFinish =async(values:any)=>{

        await createAdmin(values)
    }
 
    useEffect(() => {
        if (isSuccess) {

            if (AdminData) {
                Swal.fire({
                    text: AdminData?.message,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    setMakeAdminModal(false)
                    form.resetFields()
                    window.location.reload();
                });
            }
        }
        if (isError) {
            Swal.fire({ 
                //@ts-ignore
                text: error?.data?.message,
                icon: "error",
            });
        }
    }, [isSuccess, isError, error, AdminData])

    const addAdminForm = (
        <Form
            style={{
                color: '#767676',
            }}
            layout="vertical" 
            onFinish={onFinish} 
            form={form}
        >
            <Form.Item label="Name" name="fullName">
                <Input
                    style={{
                        height: '40px',
                    }}
                    placeholder="John Doe"
                />
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input
                    style={{
                        height: '40px',
                    }}
                    type="email"
                    placeholder="email@gmail.com"
                />
            </Form.Item>
            <Form.Item label="Password" name="password"  
             rules={[
                            { required: true, message: "Please input Password" },
                            {
                                validator(_, value) {
                                    if (value && value.length < 8) {
                                        return Promise.reject(new Error("Password must be at least 8 characters"));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}>
                <Input
                    style={{
                        height: '40px',
                    }}
                    type="password"
                    placeholder="******"
                />
            </Form.Item>
            <Form.Item>
                <div className="flex justify-center w-full">
                    <Button
                        type="primary" 
                        htmlType='submit'
                        style={{
                            height: 40,
                            width: '100%',
                        }}
                    >
                     {isLoading ? "Loading.." : "Add Admin"}
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );

    return (
        <div>
            <Flex vertical={false} gap={10} align="center" justify="space-between">
                <div>
                    <div className="my-4">
                        <h1 className="text-3xl text-primary font-semibold">Admin Management</h1>
                    </div>
                </div>

                <div
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Button
                        onClick={() => setMakeAdminModal(true)}
                        type="primary"
                        style={{
                            height: 40,
                        }} 
                        disabled={adminRole === "ADMIN"}
                    >
                       + Add Admin
                    </Button>
                </div>
            </Flex>
                <Table columns={columns} dataSource={data} />
        

            <CustomModal
                open={makeAdminModal}
                setOpen={setMakeAdminModal}
                title="Make Admin"
                width={500}
                body={addAdminForm}
            />
        </div>
    );
};

export default MakeAdmin;
