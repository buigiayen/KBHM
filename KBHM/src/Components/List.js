import { Table } from "antd";
import { useEffect,useState } from "react";
const App = (prop) => {
  const [Isloading, SetIsLoading] = useState(false);
  useEffect(() => {
    SetIsLoading(true);
    setTimeout(() => {
      SetIsLoading(false);
    }, 3000);
   
  }, [prop.data]);
  return (
    <Table
      columns={prop?.columns}
      dataSource={prop.data}
      footer={prop.footer}
      loading={Isloading}
      pagination={false}
    ></Table>
  );
};

export default App;
