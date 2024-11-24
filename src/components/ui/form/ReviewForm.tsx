import { Input, DatePicker, TimePicker, Button } from 'antd';
import dayjs from 'dayjs';
const ReviewForm = ({modalData}:any) => {
    const defaultTime = dayjs(modalData?.time, 'HH:mm A'); 
    const defaultDate = dayjs(modalData?.date, 'YYYY-MM-DD'); 
    return (
        <div className="p-4 w-full">
            {/* User Name Field */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                <Input value={modalData?.userName} readOnly className="w-full p-2 border border-gray-300 rounded-md" />
            </div>

            {/* Email Field */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                <Input
                    value={modalData?.brandName}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Date and Time Fields */}
            <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <DatePicker
                        value={defaultDate} // Placeholder for predefined date, adjust as needed
                        className="w-full"
                        disabled
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <TimePicker
                        value={defaultTime} // Placeholder for predefined time, adjust as needed
                        className="w-full"
                        format="HH:mm"
                        disabled
                    />
                </div>
            </div>

            {/* Review Field */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                <Input.TextArea
                    value={modalData?.details}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={4}
                />
            </div>

            {/* Confirm Button */}
            <Button
                type="primary"
                style={{
                    height: 42,
                    width: '100%',
                }}
            >
                Confirm
            </Button>
        </div>
    );
};

export default ReviewForm;
