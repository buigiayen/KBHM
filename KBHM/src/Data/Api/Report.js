import { HttpRequest } from "../Config/APIConnection";

export const Post_CreateReport = async ({ reportName, dataReport }) => {
  const body = { reportName, dataReport };
  return await HttpRequest("POST", "/ReportView", body, false, null);
};
