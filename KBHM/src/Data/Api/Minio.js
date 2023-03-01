import { HttpRequest } from "../Config/APIConnection";

export const Get_Minio = async (prop) => {
    return await HttpRequest( 'GET',"/File", null, true,prop);
}
export const Post_Minio = async (pra) => {
    return await HttpRequest( 'POST',"/File", pra, true, pra, 'multipart/form-data');
}

