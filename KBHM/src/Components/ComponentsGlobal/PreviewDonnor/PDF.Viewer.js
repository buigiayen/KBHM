import { useState } from "react";
import { Button, Modal } from "antd";
import PDfViewer from "../../Modal.pdf";
import { useEffect } from "react";
import { GET_Person, GET_PropertiesPerson } from "../../../Data/Api/DangKyKham";
import { Post_CreateReport } from "../../../Data/Api/Report";
import { Get_Job } from "../../../Data/Api/Category";

const ViewerPDFDonnor = ({ Open, Cancel, IDDonnor, ReportID }) => {
  const [ViewPDf, SetDataPDF] = useState(null);
  useEffect(() => {
    SetDataPDF(null);
    if (IDDonnor !== null) {
      ExportDocumentFile({ IDPerson: IDDonnor });
    }
  }, [IDDonnor, ReportID]);
  const ExportDocumentFile = async ({ IDPerson }) => {
    try {
      const JobList = await Get_Job();
      console.log(JobList);
      const PersonInfo = await GET_Person(IDPerson);
      const mappedJob = JobList.find(job => job.value === PersonInfo[0].NgheNghiep);
      if(mappedJob){
        PersonInfo[0].NgheNghiep = mappedJob.label;
      }
      const PersonProperties = await GET_PropertiesPerson(IDPerson);
      const resultProperties = PersonProperties.reduce((acc, rs) => {
        acc[rs.Key] = rs.value;
        return acc;
      }, {});

      const combinedObject = [];
      combinedObject.push({ ...PersonInfo[0], ...resultProperties });
      let objJsonStr = JSON.stringify(combinedObject);
      var data = await Post_CreateReport({
        reportName: ReportID,
        dataReport: objJsonStr,
      });

      base64toBlob({ DataPDF: data?.data });
    } catch (e) {
      console.log(e);
    }
  };
  const base64toBlob = ({ DataPDF }) => {
    if (DataPDF) {
      const base64WithoutPrefix = DataPDF;
      const bytes = atob(base64WithoutPrefix);

      let length = bytes?.length;
      let out = new Uint8Array(length);

      while (length--) {
        out[length] = bytes.charCodeAt(length);
      }

      const blob = new Blob([out], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      SetDataPDF(url);
    } else {
      return "";
    }
  };

  return (
    <Modal open={Open} onCancel={() => Cancel()} width={1000 + "px"}>
      <PDfViewer urlPDF={ViewPDf} />
    </Modal>
  );
};
export default ViewerPDFDonnor;
