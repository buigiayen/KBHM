import { HttpRequest } from "../Config/APIConnection";

export const POST_DangKyHienMau = async (prop) => {
    return await HttpRequest( 'POST',"/Person", prop, true);
}

//Person/:ID/Properties  -- lấy thông tin thuộc tính 
export const GET_PropertiesPerson = async (prop) => {
    return await HttpRequest( 'GET',`/Person/${prop}/Properties`);
}
//Person/:ID -- Lấy thông tin person
export const GET_Person = async (prop) => {
    return await HttpRequest( 'GET',`/Person/${prop}`);
}
//Person/:ID/Find/:Row -- Tìm thông tin person số lượng dòng
export const GET_PersonInfo = async (prop) => {
    return await HttpRequest( 'GET',`/Person/${prop.text}/Find/${prop.row}`);
}
//Person/:ID/Find/:Row -- Tìm thông tin person số lượng dòng
export const PUT_PersonInfo = async (prop) => {
    return await HttpRequest( 'PUT',`/Person`,prop, true);
}
