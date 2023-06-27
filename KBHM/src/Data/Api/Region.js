import { HttpRequest } from "../Config/APIConnection";

export const Get_Region = async (prop) => {
    return await HttpRequest('GET',"/sys/Region",  null, false, prop);
}