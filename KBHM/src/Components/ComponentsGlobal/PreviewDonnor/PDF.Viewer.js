import { useState } from "react";
import { Button, Modal } from "antd";
import PDfViewer from "../../Modal.pdf";
import { useEffect } from "react";
import { GET_Person, GET_PropertiesPerson } from "../../../Data/Api/DangKyKham";
import { Post_CreateReport } from "../../../Data/Api/Report";

const ViewerPDFDonnor = ({ Open, Cancel, IDDonnor, ReportID }) => {
  const [ViewPDf, SetDataPDF] = useState(null);
  useEffect(() => {
    if (IDDonnor !== null) {
      ExportDocumentFile({ IDPerson: IDDonnor });
    }
  }, [IDDonnor, ReportID]);
  const ExportDocumentFile = async ({ IDPerson }) => {
    try {
      const PersonInfo = await GET_Person(IDPerson);
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