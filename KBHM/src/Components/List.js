
import { Table } from 'antd';
const App = (prop) => {
    return (<Table columns={prop?.columns} dataSource={prop.data} footer={prop.footer}></Table>)
}


export default App;