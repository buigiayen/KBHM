import { HttpRequest } from "../Config/APIConnection";
const CheckHistoryDonnor = async ({ IdentityID }) => {
  return await HttpRequest(
    "GET",
    `/bl/SyncDonnor/History?IdentityID=${IdentityID}`
  );
};
