import { HttpRequest } from "../Config/APIConnection";

export const POST_CreateQr = async (data) => {
  return await HttpRequest("POST", `/kbhm/Person/CreateQr`, data, true);
};

export const GetQrDonationActive = async (RowID) => {
  return await HttpRequest("GET", `/kbhm/Person/GetQrDonationActive?RowID=${RowID}`);
};

export const PUT_ChangeActive = async (data) => {
  return await HttpRequest("PUT", `/kbhm/Person/ChangeActive`, data, true);
};


export const GET_ListQr = async (data) => {
  return await HttpRequest("GET",`/kbhm/Person/GetListQR`, null, true, data)
}
