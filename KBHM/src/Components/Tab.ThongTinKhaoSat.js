import { Tabs } from "antd";
import { useEffect, useState } from "react";
import KhamLamSang from "../Components/ComponentsGlobal/ThongTinKhaoSat/KhamLamSang/index";
import XNTruochien from "../Components/ComponentsGlobal/ThongTinKhaoSat/XNTruocHien/index";
import Laymau from "../Components/ComponentsGlobal/ThongTinKhaoSat/LayMau/index";
import ThongTinKhaoSat from "../Components/ComponentsGlobal/ThongTinKhaoSat/ThongTinKhaoSat/index";
import TriHoanHienMau from "./ComponentsGlobal/ThongTinKhaoSat/TriHoanHienMau";

const App = ({ IDPerson, IsBloodDonation, DataPerson, DataElement, funcReload, dataDelay, loadingDelay, GetDataDelay, qualified }) => {
  const [disableTabLayMau, SetDisabledLayMau] = useState();
  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    setActiveKey(qualified ? "2" : "1");
  }, [qualified]);

  useEffect(() => {
    SetDisabledLayMau(DataPerson?.ChoPhepHienMau);
  }, [DataPerson?.ChoPhepHienMau]);
  const SetdisableTabLayMau = (value) => {
    SetDisabledLayMau(value);
    IsBloodDonation(value);
  };
  const Component = [
    {
      label: `TT Khảo sát`,
      key: "1",
      children: <ThongTinKhaoSat ID={IDPerson} />,
    },
    {
      label: `Khám LS`,
      key: "2",
      children: <KhamLamSang ID={IDPerson} HienMau={SetdisableTabLayMau} dataPerson={DataPerson} funcReload={funcReload} dataDelay={dataDelay} />,
      disabled: qualified == false,
    },
    {
      label: `XN trước hiến`,
      key: "3",
      children: <XNTruochien Person={DataPerson}></XNTruochien>,
      disabled: qualified == false,
    },
    {
      label: `Trì hoãn hiến máu`,
      key: "4",
      children: <TriHoanHienMau ID={IDPerson} dataDelay={dataDelay} GetDataDelay={GetDataDelay} DataPerson={DataPerson} />,
      disabled: loadingDelay || qualified == false,
    },
    {
      label: `Lấy máu`,
      key: "5",
      children: <Laymau ID={IDPerson} dataPerson={DataPerson} dataSourceElement={DataElement} FuncReload={funcReload} />,
      disabled: !disableTabLayMau || qualified == false,
    },
  ];

  return (
    <div>
      <Tabs type="card" size={"small"} items={Component} activeKey={activeKey} onChange={(key) => setActiveKey(key)} />
    </div>
  );
};
export default App;
