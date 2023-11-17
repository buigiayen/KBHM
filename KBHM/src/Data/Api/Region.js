import { HttpRequest } from "../Config/APIConnection";

export const Get_Region = async (prop) => {
    return await HttpRequest('GET',"/sys/Region",  null, false, prop);
}
export const Get_Region_ALL = async () => {
    return await HttpRequest('GET',"/sys/Region/ALL",  null, false, null);
}
export const Change_Region = async ({Region, ID, Value}) => {
    const parma = {Region: Region , ID : ID , Value: Value}
    return await HttpRequest('PATCH',"/sys/Region",  null, false, parma);
}