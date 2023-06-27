import { HttpRequest } from "../Config/APIConnection";

export const Get_Category = async () => {
  return await HttpRequest("GET", "/bl/category", null, true);
};
