import PDfViewer from "../../Modal.pdf";
import { GET_Person, GET_PropertiesPerson } from "../../../Data/Api/DangKyKham";
import { Post_CreateReport } from "../../../Data/Api/Report";
import { Get_Job } from "../../../Data/Api/Category";
import { CheckHistoryDonnor } from "../../../Data/Api/Donnor";

export const ExportDocumentFile = async ({ IDPerson, Reportname }) => {
  try {
    const JobList = await Get_Job();
    const PersonInfo = await GET_Person(IDPerson);
    const GetHistoryDonnor = await CheckHistoryDonnor({
      IdentityID: PersonInfo[0].CCCD,
    });

    const mappedJob = JobList.find(
      (job) => job.value === PersonInfo[0].NgheNghiep
    );
    if (mappedJob) {
      PersonInfo[0].NgheNghiep = mappedJob.label;
    }
    let HistoryDonnor = [];
    console.log(GetHistoryDonnor);
    if (GetHistoryDonnor) {
      HistoryDonnor.push(GetHistoryDonnor[0]);
    }
    console.log(HistoryDonnor);
    const PersonProperties = await GET_PropertiesPerson(IDPerson);
    const resultProperties = PersonProperties.reduce((acc, rs) => {
      acc[rs.Key] = rs.value;
      return acc;
    }, {});

    const combinedObject = [];
    combinedObject.push({
      ...PersonInfo[0],
      ...resultProperties,
      ...HistoryDonnor[0]
    });
    let objJsonStr = JSON.stringify(combinedObject);

    var data = await Post_CreateReport({
      reportName: Reportname,
      dataReport: objJsonStr,
    });
   
    return data?.data;
  } catch (e) {
    console.log("PDF ERR", e);
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
    return url;
  } else {
    return "";
  }
};


