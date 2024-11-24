import { Form, Input, Modal } from 'antd';
import  { useEffect, useState } from 'react';
import { FaRegImage } from 'react-icons/fa';
import { useAddCategoryMutation, useUpdateCategoryMutation } from '../../../redux/features/categoryApi';
import Swal from 'sweetalert2';

const AddCategories = ({ itemForEdit , setItemForEdit , openAddModel ,setOpenAddModel ,refetch}:any) => { 
    const [form] = Form.useForm();
    const [imgFile, setImgFile] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);  
    const [addCategory] = useAddCategoryMutation() 
    const [updateCategory] = useUpdateCategoryMutation()
  
    useEffect(()=>{ 
      if(itemForEdit){
   form.setFieldsValue({name:itemForEdit?.name}) 
   setImgUrl(itemForEdit?.image)
      }
    },[itemForEdit]) 
  
  
    const handleCancel = () => {
      setImgFile(null);
      setImgUrl(null); 
      setItemForEdit(null)
      form.resetFields();
      setOpenAddModel(false);
    };
  
    const handleChange = (e:any) => {
      const file = e.target.files[0];
      if (file) {
        setImgFile(file); 
        //@ts-ignore
        setImgUrl(URL.createObjectURL(file));
      }
    };
  
    const onFinish = async(values:any) => {

      const formData = new FormData() 
   if(imgFile){
   formData?.append("image" , imgFile)   
}  
const data = {
    categoryName:values?.name
}
formData?.append("data",JSON.stringify(data)) 
const id = itemForEdit?.id

if(itemForEdit){
    await updateCategory({id , formData}).then((res)=>{
      //console.log(res); 
      if(res?.data?.success){
        Swal.fire({
            text:res?.data?.message,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            refetch();   
            setItemForEdit(null)  
            form.resetFields() 
            setOpenAddModel(false);
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
    }else{
      await addCategory(formData).then((res)=>{
        //console.log(res); 
        if(res?.data?.success){
          Swal.fire({
              text:res?.data?.message,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              refetch();    
              setOpenAddModel(false); 
              setItemForEdit(null)  
              form.resetFields() 
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


    };
    return (
        <Modal
        centered
        open={openAddModel}
        onCancel={handleCancel}
        width={500}
        footer={null}
      >
        <div className="p-6">
          <h1 className="font-semibold text-[#555555] text-xl mb-2 mt-2">
            {itemForEdit ? "Update Blog" : "Add Blog"}
          </h1>
          <Form onFinish={onFinish} layout="vertical" form={form}>
            <Form.Item
              name="name"
              label={<p className="text-[#6D6D6D]">Category Name</p>}
              rules={[{ required: true, message: "Please input Title" }]}
            >
              <Input className="w-full border px-3 py-2" />
            </Form.Item>
  
            <Form.Item name="images" label={<p className="text-[#6D6D6D]">Image</p>}>
              <label htmlFor="image" className="p-3 border block mt-2 mb-2">
                <div className="flex justify-center items-center w-full h-[150px] ">
                  {imgUrl ? (
                    <img src={imgUrl} alt="Selected" className="h-[150px] w-full object-contain p-2" />
                  ) : (
                    <FaRegImage className="text-5xl" />
                  )}
                </div> 
                <div className='hidden'>
                <Input
                  id="image"
                  type="file"
                  onChange={handleChange}
                  className="hidden"
                />
                </div>
              </label>
            </Form.Item>
  
         
  
            <Form.Item className="text-center mt-8">
              <button type="submit"  className="bg-primary text-white w-[120px] h-[42px] rounded-lg">
                Submit
              </button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
};

export default AddCategories;