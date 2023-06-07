import { Table } from "antd";
import { useEffect,useState } from "react";
const App = ({data,columns, footer }) => {
  const [Isloading, SetIsLoading] = useState(false);
  useEffect(() => {
    SetIsLoading(true);
    setTimeout(() => {
      SetIsLoading(false);
    }, 1000);
   
  }, [data]);
  return (
    <Table
      columns={columns}
      dataSource={data}
      footer={footer}
      loading={Isloading}
      pagination={false}
    ></Table>
  );
};

export default App;
