import { Button } from "antd";
import { useState } from "react";
import * as XLSX from "xlsx";
import { POST_SyncDonor } from "../../Data/Api/DangKyKham";

const Index = () => {
  const [file, setFile] = useState(null);

  const onClickDB = async () => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = async (evt) => {
      let newData = [];
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      //   data.forEach(async (item, idx) => {
      //     // await POST_SyncDonor(item[0]);
      //     console.log(item);
      //   });
      for (const item of data) {
        await POST_SyncDonor(item[0]);
        console.log("Done:", item);
      }
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
          console.log(e.target.files[0]);
          setFile(e.target.files[0]);
        }}
        onClick={(event) => {
          event.target.value = null;
        }}
      />
      <Button onClick={onClickDB}>Đồng bộ</Button>
    </>
  );
};

export default Index;
