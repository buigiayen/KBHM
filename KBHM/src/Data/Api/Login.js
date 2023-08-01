import { HttpRequest } from "../Config/APIConnection";

export const Get_Token = async (prop) => {
    return await HttpRequest( 'POST',"/bl/Authorization", prop, true,null);
}
export const Get_Token_Veryfy = async () => {
    return await HttpRequest( 'GET',"/bl/TokenVeryfy");
}

