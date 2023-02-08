import { HttpRequest } from "../Config/APIConnection";

export const POST_DangKyHienMau = async (prop) => {
    return await HttpRequest("/Region", 'GET', prop.body, true, prop.parmas);
}