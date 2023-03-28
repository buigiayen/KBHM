import { Tabs } from "antd";
import { useState } from "react";
import KhamLamSang from "../Components/ComponentsGlobal/ThongTinKhaoSat/KhamLamSang/index";
import XNTruochien from "../Components/ComponentsGlobal/ThongTinKhaoSat/XNTruocHien/index";
import Laymau from "../Components/ComponentsGlobal/ThongTinKhaoSat/LayMau/index";
import ThongTinKhaoSat from "../Components/ComponentsGlobal/ThongTinKhaoSat/ThongTinKhaoSat/index";

const App = (prop) => {
  const [disableLayMau, SetDisabledLayMau] = useState(false);
  console.log(prop)
  const Component = [
    {
      label: `TT Khảo sát`,
      key: 1,
      children: <ThongTinKhaoSat ID={prop?.ID} />,
    },
    {
      label: `Khám LS`,
      key: 2,
      children: <KhamLamSang {...prop} ID={prop?.ID} HienMau={e => SetDisabledLayMau(e)} />,
    },
    {
      label: `XN trước hiến`,
      key: 3,
      children: <XNTruochien></XNTruochien>,
    },
    {
      label: `Lấy máu`,
      key: 4,
      children: <Laymau {...prop} ID={prop?.ID}/>,
      disabled: !prop.HienThiThongTinTua
    },
  ];

  return (
    <div>
      <Tabs type="card" size={"small"} items={Component} />
    </div>
  );
};
export default App;
