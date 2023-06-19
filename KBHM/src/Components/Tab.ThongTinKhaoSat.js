import { Tabs } from "antd";
import { useEffect, useState } from "react";
import KhamLamSang from "../Components/ComponentsGlobal/ThongTinKhaoSat/KhamLamSang/index";
import XNTruochien from "../Components/ComponentsGlobal/ThongTinKhaoSat/XNTruocHien/index";
import Laymau from "../Components/ComponentsGlobal/ThongTinKhaoSat/LayMau/index";
import ThongTinKhaoSat from "../Components/ComponentsGlobal/ThongTinKhaoSat/ThongTinKhaoSat/index";

const App = ({ IDPerson, IsBloodDonation, DataPerson, DataElement }) => {
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
        />
      ),
    },
    {
      label: `XN trước hiến`,
      key: "3",
      children: <XNTruochien></XNTruochien>,
    },
    {
      label: `Lấy máu`,
      key: "4",
      children: <Laymau ID={IDPerson} dataPerson={DataPerson} dataSourceElement={DataElement}/>,
      disabled: !disableTabLayMau,
    },
  ];

  return (
    <div>
      <Tabs
        type="card"
        size={"small"}
        items={Component}
        tabIndex={2}
        defaultActiveKey="2"
      />
    </div>
  );
};
export default App;
