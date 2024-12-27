import React, { useEffect, useState } from "react";
import { Collapse, Space } from "antd";
import "./index.css";
import { CheckHistoryDonnor } from "../../../Data/Api/Donnor";
import dayjs from "dayjs";

const App = ({ DefaultKey, Identity }) => {
  console.log(Identity);

  useEffect(() => {
    if (Infinity != undefined) FeatApiDonnor();
  }, [Identity]);

  const [HistoryDonnor, SetHistoryDonor] = useState([]);
  const FeatApiDonnor = async () => {
    const Result = [];
    const data = await CheckHistoryDonnor({ IdentityID: Identity }).then((rs) => {
      const DataHisApi = [];
      rs.forEach((data, index) => {
        DataHisApi.push({
          key: index,
          label: `Lịch sử lần hiến ngày: ${dayjs(data.dateIn).format("DD/MM/YYYY")} - BCI: ${data.bci || ""}  - ABO,Rh ${data.aborh || ""}  `,
          children: `Xét nghiệm ${data?.resultBloods
            .map((rb) => {
              return `${rb.testCode?.replace("HAV", "HIV")} : ${rb.result}`;
            })
            .join(". - ")}`,
        });
      });
      return DataHisApi;
    });
    SetHistoryDonor(data);
  };
  return <>{HistoryDonnor && <Collapse collapsible="header" defaultActiveKey={[DefaultKey]} items={HistoryDonnor} />}</>;
};

export default App;
