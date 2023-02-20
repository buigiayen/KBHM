import { HttpRequest } from "../Config/APIConnection";

export const GET_Location = async (prop) => {
    return await HttpRequest( 'GET',"/Location", prop, true);
}
export const GET_Ml = async (prop) => {
    return await HttpRequest( 'GET',"/Ml", prop, true);
}
export const GET_Element = async (prop) => {
    return await HttpRequest( 'GET',"/Element", prop, true);
}
