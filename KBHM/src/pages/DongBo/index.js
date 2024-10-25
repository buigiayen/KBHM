import { Button, Progress, Spin, Table } from "antd";
import { useState } from "react";
import * as XLSX from "xlsx";
import { POST_SyncDonor } from "../../Data/Api/DangKyKham";
import { LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";

const Index = () => {
  const [file, setFile] = useState(null);

  const [percentDone, setPercentDone] = useState(0);
  const [loadingSync, setLoadingSync] = useState(false);
  const [dataExcel, setDataExcel] = useState([]);
  const [startSync, setStartSync] = useState(false);

  const onClickDB = async () => {
    dataExcel.forEach((item) => {
      item.status = 1;
    });
    setLoadingSync(true);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = async (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      let count = 0;
      const newData = data.filter((item) => item.length != 0);

      for (const item of newData) {
        await POST_SyncDonor(item[0]);
        count++;
        let newPercent = (count / newData.length) * 100;
        setPercentDone(Math.floor(newPercent));
        dataExcel.find((x) => x.RowID == item[0]).status = 2;
      }
      setLoadingSync(false);
    };
  };

  return (
    <>
      <Button
        type="primary"
        color="primary"
        onClick={() => {
          document.getElementById("importExcel").click();
        }}
      >
        {file ? file.name : "Import"}
      </Button>
      <input
        accept=".xlsx, .xls, .csv"
        id="importExcel"
        name="reportTemplateName"
        type="file"
        className="d-none"
        onChange={(e) => {
          setFile(e.target.files[0]);
          const reader = new FileReader();
          reader.readAsBinaryString(e.target.files[0]);
          reader.onload = async (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            const newData = [];
            data
              .filter((item) => item.length != 0)
              .forEach((item) => {
                newData.push({
                  RowID: item[0],
                  status: 0,
                });
              });
            setDataExcel(newData);
          };
        }}
        onClick={(event) => {
          event.target.value = null;
        }}
      />
      <Button loading={loadingSync} onClick={onClickDB}>
        Đồng bộ
      </Button>

      <Progress percent={percentDone} />
      <Table
        dataSource={dataExcel}
        columns={[
          {
            title: "RowID",
            dataIndex: "RowID",
          },
          {
            title: "Status",
            dataIndex: "status",
            render: (item) => {
              return item == 1 ? (
                <>
                  <Spin indicator={<LoadingOutlined spin />} size="small" /> <span>Đang đồng bộ</span>
                </>
              ) : item == 2 ? (
                <>
                  <CheckCircleOutlined color={"green"} style={{ color: "green" }} /> <span>Đã đồng bộ</span>
                </>
              ) : (
                <></>
              );
            },
          },
        ]}
      />
    </>
  );
};

export default Index;
