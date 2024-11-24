import MainLayout from './components/layout/MainLayout';
import { ConfigProvider } from 'antd';
import PrivateRoute from './routes/PrivateRoute';
function App() {
    return (
        <>
        <PrivateRoute >
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
            </PrivateRoute>
        </>
    );
}

export default App;
