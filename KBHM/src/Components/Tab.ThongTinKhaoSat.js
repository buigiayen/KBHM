import { Radio, Tabs } from 'antd';
import { useState } from 'react';
import KhamLamSang from '../Components/ComponentsGlobal/ThongTinKhaoSat/KhamLamSang/index'
import XNTruochien from '../Components/ComponentsGlobal/ThongTinKhaoSat/XNTruocHien/index'
import Laymau from '../Components/ComponentsGlobal/ThongTinKhaoSat/LayMau/index'
import ThongTinKhaoSat from '../Components/ComponentsGlobal/ThongTinKhaoSat/ThongTinKhaoSat/index'
const App = (prop) => {
  const [size, setSize] = useState('small');
  const Component = [
    {
      label: `TT Khảo sát`,
      key: 1,
      children: <ThongTinKhaoSat ID={prop.ID}/>,

    },
    {
      label: `Khám LS`,
      key: 2,
      children: <KhamLamSang />,
    },
    {
      label: `XN trước hiến`,
      key: 3,
      children: <XNTruochien></XNTruochien>,
    },
    {
      label: `Lấy máu`,
      key: 4,
      children: <Laymau></Laymau>,
    }
  ]

  return (
    <div>

      <Tabs
        defaultActiveKey="2"
        type="card"
        size={size}
        items={Component}
      />
    </div>
  );
};
export default App;