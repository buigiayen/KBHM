import { HttpRequest } from "../Config/APIConnection";

export const Get_Category = async () => {
  return await HttpRequest("GET", "/bl/category", null, true);
};

export const Get_Job = async () => {
  return await HttpRequest("GET", "/bl/category/job", null, true);
};

export const Get_Doctor = async () => {
  return await HttpRequest("GET", "/bl/category/doctor", null, true);
};
