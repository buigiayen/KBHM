import { HttpRequest } from "../Config/APIConnection";

export const POST_DangKyHienMau = async (prop) => {
    return await HttpRequest('POST', "/Person", prop, true);
}

//Person/:ID/Properties  -- lấy thông tin thuộc tính 
export const GET_PropertiesPerson = async (prop) => {
    return await HttpRequest('GET', `/Person/${prop}/Properties`);
}
//Person/:ID -- Lấy thông tin person
export const GET_Person = async (prop) => {
    return await HttpRequest('GET', `/Person/${prop}`);
}
//Person/:ID/Find/:Row -- Tìm thông tin person số lượng dòng
export const GET_PersonInfo = async (prop) => {
    return await HttpRequest('GET', `/Person/${prop.text}/Find/${prop.row}`);
}

export const PUT_PersonInfo = async (prop) => {
    return await HttpRequest('PUT', `/Person`, prop, true);
}
export const PUT_PersonInfo_healthy = async (prop) => {
    return await HttpRequest('PUT', `/Person/healthy`, prop, true);
}

export const PUT_PersonTrip = async (prop) => {
    return await HttpRequest('PUT', `/Person/Trip`, prop, true);
}

export const PUT_PersonDone = async (prop) => {
    return await HttpRequest('PUT', `/Person/Done`, prop, true);
}

export const GET_DonorExCheck = async ({DonorExCode}) => {
    return await HttpRequest('GET', `/SyncDonnor/CheckDonnorExCode?DonorExCode=${DonorExCode}`);
}
export const POST_SyncDonor = async (ID) => {
    try {
        let DataPerson = {};
        await GET_Person(ID).then(rs => DataPerson = rs);

        if (DataPerson !== undefined) {
            const { RowID, Name, BirthDay, Sex, CCCD, Phone, Email, DateRegister,
                DiaChiLienLac, DiaChiThuongTru_ChiTiet, MaTuiMau, DiemLayMau,
                LuongMauCoTheHien, LuongHien, LoaiHienThanhPhan, HuyetAp, TinhTrangLamSang, Mach, ChieuCao
            } = DataPerson[0]

            const DataSync = {
                DateIn: DateRegister,
                DonorCode: CCCD,
                DonorName: Name,
                DonorNameUnsign: Name,
                Sex: `${Sex}`,
                Age: null,
                Address: DiaChiLienLac + DiaChiThuongTru_ChiTiet,
                Phone: Phone,
                BirthDay: BirthDay,
                DonorExCode: MaTuiMau,
                BloodSourceLocationId: DiemLayMau,
                BloodVolume: `${LuongHien}`,
                ElementID: `${LoaiHienThanhPhan}`,
                BLOODPRESSURE: `${HuyetAp}`,
                HGB: '1',
                PULSE: `${Mach}`,
                STATUS: TinhTrangLamSang,
                WEIGH: `${ChieuCao}`,
            }
            console.log(DataSync)
            return await HttpRequest('POST', `/SyncDonnor`, DataSync);
        }
        else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
}

