import printJS from "print-js";
import { connectionApiThirdParty } from "../Config/APIConnection";
const reportUrl = "https://creasoft.top:9019/report/Rp_dkhienmau.repx";
export const Post_CreateReport = async ({ dataReport }) => {
  const body = { ReportUrl: reportUrl, dataReport, tableName: "" };
  var data = await connectionApiThirdParty({
    URL: "https://creasoft.top/ReportServer/api/Reports/ReportView/PDF/Preview",
    method: "POST",
    body: body,
    headers: null,
    responseType: "blob",
  });
  const blob = new Blob([data?.data], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  printJS({ printable: url, type: "pdf", showModal: true });
};

