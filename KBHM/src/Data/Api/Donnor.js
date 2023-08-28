import { HttpRequest } from "../Config/APIConnection";
export const CheckHistoryDonnor = async ({ IdentityID }) => {
  return await HttpRequest(
    "GET",
    `/bl/SyncDonnor/History?IdentityID=${IdentityID}`
  );
};
