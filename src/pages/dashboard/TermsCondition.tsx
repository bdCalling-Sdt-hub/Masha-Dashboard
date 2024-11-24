import { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Button } from 'antd';
import Swal from 'sweetalert2';
import { useGetAppTermsQuery, useUpdateAppTermsMutation } from '../../redux/features/termsApi';

const TermsCondition = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const {data:terms , refetch} = useGetAppTermsQuery(undefined) 
    const [updateAppTerms] =useUpdateAppTermsMutation()

useEffect(()=>{
  setContent(terms?.data?.details)
} ,[terms?.data?.details]) 

    const config = {
        readonly: false,
        placeholder: 'Start typings...',
        style: {
            height: 400,
            background: 'white',
        },
    }; 


    const handleSubmit =async()=>{
        await updateAppTerms({details:content}).then((res)=>{
          if(res?.data?.success){
            Swal.fire({
                text:res?.data?.message,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                refetch(); 
                
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
        <div className=" bg-white px-4 py-2 rounded-lg pb-10 ">
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: '16px 0',
                }}
            >
                <div>
                    <h3 className="text-3xl text-primary font-semibold">Terms and Conditions</h3>
                </div>
            </div>
            <div>
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={() => {}}
                />
            </div>
            <div
                style={{
                    marginTop: 24,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button
                    style={{
                        height: 40,
                        width: '150px',
                    }}
                    type="primary" 
                    onClick={handleSubmit}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default TermsCondition;
