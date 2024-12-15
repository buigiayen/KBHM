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
    let oldResult = "HBV ................   HCV................   HIV..................";
    const mappedJob = JobList.find((job) => job.value === PersonInfo[0].NgheNghiep);
    if (mappedJob) {
      PersonInfo[0].NgheNghiep = mappedJob.label;
    }
    let HistoryDonnor = [];
    if (GetHistoryDonnor) {
      if (GetHistoryDonnor[0]?.resultBloods)
        oldResult = `HBV ${GetHistoryDonnor[0]?.resultBloods?.find((x) => x.testCode == "HBV")?.result || "................"}   HCV ${
          GetHistoryDonnor[0]?.resultBloods?.find((x) => x.testCode == "HCV")?.result || "................"
        }   HIV ${GetHistoryDonnor[0]?.resultBloods?.find((x) => x.testCode == "HAV")?.result || "................"}`;
      HistoryDonnor.push(GetHistoryDonnor[0]);
    }

    const PersonProperties = await GET_PropertiesPerson(IDPerson);
    const resultProperties = PersonProperties.reduce((acc, rs) => {
      acc[rs.Key] = rs.value;
      return acc;
    }, {});

    const combinedObject = [];
    combinedObject.push({
      ...PersonInfo[0],
      ...resultProperties,
      ...HistoryDonnor[0],
      DaHien: HistoryDonnor[0] != null,
      oldResult: oldResult,
    });
    let objJsonStr = JSON.stringify(combinedObject);

    await Post_CreateReport({
      reportName: Reportname,
      dataReport: objJsonStr,
    });
    // await Post_CreateReportExcel({
    //   reportName: Reportname,
    //   dataReport: objJsonStr,
    // });
  } catch (e) {
    console.log("PDF ERR", e);
  }
};
