import { Form, Input, Button, Modal } from 'antd';
import { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAddFaqMutation, useUpdateFaqMutation } from '../../../redux/features/faqApi';
import Swal from 'sweetalert2';

const { TextArea } = Input;
 //@ts-ignore
const AddFaqForm = ({openEditModal ,setEditModal ,setOpenModal , openModal , refetch }) => {
    const [form] = Form.useForm()
    const [addFaq] = useAddFaqMutation() 
    const [updateFaq]= useUpdateFaqMutation() 
   
    useEffect(()=>{  
      if(openEditModal){
        form.setFieldsValue({question:openEditModal?.question , answer:openEditModal?.answer})
      }
      
    } ,[openEditModal , form])
  
    const onFinish =async(values:{question:string , answer:string})=>{
  //console.log(values);  
  const data ={
    _id:openEditModal?._id ,
    question:values?.question ,
    answer:values?.answer
  }
  
  if(openEditModal){
  await updateFaq(data).then((res)=>{
    //console.log(res); 
    if(res?.data?.success){
      Swal.fire({
          text:res?.data?.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          refetch();   
          setEditModal(null)  
          form.resetFields() 
          setOpenModal(false);
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
    await addFaq(values).then((res)=>{
      //console.log(res); 
      if(res?.data?.success){
        Swal.fire({
            text:res?.data?.message,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            refetch();    
            setOpenModal(false); 
            setEditModal(null)  
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
    }

    return ( 
        <Modal
        centered
        open={openModal} 
        title={openEditModal?._id ? "Edit FAQ" : "Add FAQ"}
        onCancel={() => {setOpenModal(false)  
            setEditModal(null)
          form.resetFields()
        }}
        width={500}
        footer={false}
      > 
        <Form  layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item
                label="Question"
                name="question"
                rules={[{ required: true, message: 'Please enter a question' }]}
            >
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Your faq question"
                />
            </Form.Item>

            {/* Description */}
            <Form.Item label="Answer" name="answer" rules={[{ required: true, message: 'Please enter a answer' }]}>
                <TextArea
                    style={{
                        width: '100%',
                        resize: 'none',
                        borderRadius: 6,
                        backgroundColor: '#F9F9F9',
                    }}
                    rows={3}
                    placeholder="Your faq answer"
                />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item className="flex justify-center">
                <Button
                    icon={<AiOutlinePlus />}
                    htmlType="submit"
                    style={{
                        height: 40,
                    }}
                    type="primary"
                >
                 {openEditModal?._id ? "Edit FAQ" : "Add FAQ"} 
                </Button>
            </Form.Item>
        </Form> 
        </Modal>
    );
};

export default AddFaqForm;
