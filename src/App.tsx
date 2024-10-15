import MainLayout from './components/layout/MainLayout';
import './App.css';
import { ConfigProvider } from 'antd';
function App() {
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#DAA520',
                    },
                    components: {
                        Input: {
                            borderRadius: 40,
                        },
                    },
                }}
            >
                <MainLayout />
            </ConfigProvider>
        </>
    );
}

export default App;
