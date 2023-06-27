import { HttpRequest } from "../Config/APIConnection";

export const Get_Token = async (prop) => {
    return await HttpRequest( 'GET',"/bl/Authorization", null, true,prop);
}
export const Get_Token_Veryfy = async () => {
    return await HttpRequest( 'GET',"/bl/TokenVeryfy");
}

