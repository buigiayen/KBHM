import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import IconCombine from './Icon';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const Navigate = useNavigate();
    const Redict = (location) => {
        Navigate(location)
    }
    return (<>
        <FloatButton.Group
            type="primary"
            icon={<CustomerServiceOutlined />}
        >
            <FloatButton icon={<IconCombine.LoginOutlined></IconCombine.LoginOutlined>} onClick={() => Redict('/Login')} tooltip="Dành cho cán bộ ngân hàng máu" />
            <FloatButton icon={<IconCombine.UserOutlined />} tooltip="Tra cứu thông tin dành cho người hiến" />
        </FloatButton.Group>
    </>)
}



export default App;