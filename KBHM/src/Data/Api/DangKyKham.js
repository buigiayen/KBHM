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
