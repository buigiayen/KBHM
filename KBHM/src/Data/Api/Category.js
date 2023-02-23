import { HttpRequest } from "../Config/APIConnection";

export const GET_Location = async () => {
  return await HttpRequest("GET", "/category/Location", null, true);
};
export const GET_Ml = async () => {
  return await HttpRequest("GET", "/category/Ml", null, true);
};
export const GET_Element = async () => {
  return await HttpRequest("GET", "/category/Element", null, true);
};
