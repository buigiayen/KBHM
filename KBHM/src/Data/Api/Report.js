import { HttpRequestFile } from "../Config/APIConnection";

export const Post_CreateReport = async ({ reportName, dataReport }) => {
  const body = { reportName, dataReport };
  return await HttpRequestFile("POST", "/rp/ReportView", body, false, null);
};
