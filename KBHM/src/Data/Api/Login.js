import { HttpRequest } from "../Config/APIConnection";

export const Get_Token = async (prop) => {
    return await HttpRequest( 'GET',"/Authorization", null, true,prop, 'multipart/form-data');
}
export const Get_Token_Veryfy = async () => {
    return await HttpRequest( 'GET',"/TokenVeryfy");
}

