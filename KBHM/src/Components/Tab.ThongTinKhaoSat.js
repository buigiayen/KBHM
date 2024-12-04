import { Tabs } from "antd";
import { useEffect, useState } from "react";
import KhamLamSang from "../Components/ComponentsGlobal/ThongTinKhaoSat/KhamLamSang/index";
import XNTruochien from "../Components/ComponentsGlobal/ThongTinKhaoSat/XNTruocHien/index";
import Laymau from "../Components/ComponentsGlobal/ThongTinKhaoSat/LayMau/index";
import ThongTinKhaoSat from "../Components/ComponentsGlobal/ThongTinKhaoSat/ThongTinKhaoSat/index";
import TriHoanHienMau from "./ComponentsGlobal/ThongTinKhaoSat/TriHoanHienMau";

const App = ({ IDPerson, IsBloodDonation, DataPerson, DataElement, funcReload, dataDelay, loadingDelay, GetDataDelay, qualified, Category, setQualified, setNoteQualify, lastDonor }) => {
  const [disableTabLayMau, SetDisabledLayMau] = useState();

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
      children: (
        <KhamLamSang
          ID={IDPerson}
          HienMau={SetdisableTabLayMau}
          dataPerson={DataPerson}
          funcReload={funcReload}
          dataDelay={dataDelay}
          qualified={qualified}
          Category={Category}
          setQualified={setQualified}
          setNoteQualify={setNoteQualify}
          lastDonor={lastDonor}
        />
      ),
    },
    {
      label: `XN trước hiến`,
      key: "3",
      children: <XNTruochien Person={DataPerson} qualified={qualified} Category={Category}></XNTruochien>,
    },
    {
      label: `Trì hoãn hiến máu`,
      key: "4",
      children: <TriHoanHienMau ID={IDPerson} dataDelay={dataDelay} GetDataDelay={GetDataDelay} DataPerson={DataPerson} qualified={qualified} />,
      disabled: loadingDelay,
    },
    {
      label: `Lấy máu`,
      key: "5",
      children: <Laymau ID={IDPerson} dataPerson={DataPerson} dataSourceElement={DataElement} FuncReload={funcReload} qualified={qualified} />,
      disabled: !disableTabLayMau,
    },
  ];

  return (
    <div>
      <Tabs type="card" size={"small"} items={Component} defaultActiveKey={"2"} />
    </div>
  );
};
export default App;
