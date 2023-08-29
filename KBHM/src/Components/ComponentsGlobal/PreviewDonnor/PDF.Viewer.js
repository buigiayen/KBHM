import PDfViewer from "../../Modal.pdf";
import { GET_Person, GET_PropertiesPerson } from "../../../Data/Api/DangKyKham";
import { Post_CreateReport } from "../../../Data/Api/Report";
import { Get_Job } from "../../../Data/Api/Category";

export const ExportDocumentFile = async ({ IDPerson , Reportname }) => {
  try {
    console.log(IDPerson);
    const JobList = await Get_Job();
    console.log(JobList);
    const PersonInfo = await GET_Person(IDPerson);
    const mappedJob = JobList.find(
      (job) => job.value === PersonInfo[0].NgheNghiep
    );
    if (mappedJob) {
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
      reportName: Reportname,
      dataReport: objJsonStr,
    });
    console.log(data);
    return base64toBlob({ DataPDF: data?.data });
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
    return url;
  } else {
    return "";
  }
};

export const ViewerPDFDonnor = ({ ViewPDf }) => {
  return <PDfViewer urlPDF={ViewPDf} />;
};

