import { HttpRequestV2 } from "../Config/APIConnection";

export const Get_Minio = async (prop) => {
    return await HttpRequestV2( 'GET',"/File", null, true,prop);
}
export const Post_Minio = async (pra) => {
    return await HttpRequestV2( 'POST',"/File", pra, true, pra, 'multipart/form-data');
}

