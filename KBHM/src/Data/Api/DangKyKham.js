import { HttpRequest } from "../Config/APIConnection";

export const POST_DangKyHienMau = async (prop) => {
  return await HttpRequest("POST", "/kbhm/Person", prop, true);
};

export const GET_AllPerson = async (props) => {
  return await HttpRequest("GET", `/kbhm/Person`, null, true, props);
};
//Person/:ID/Properties  -- lấy thông tin thuộc tính
export const GET_PropertiesPerson = async (prop) => {
  return await HttpRequest("GET", `/kbhm/Person/${prop}/Properties`);
};
//Person/:ID -- Lấy thông tin person
export const GET_Person = async (prop) => {
  return await HttpRequest("GET", `/kbhm/Person/${prop}`);
};
//Person/:ID/Find/:Row -- Tìm thông tin person số lượng dòng
export const GET_PersonInfo = async (prop) => {
  return await HttpRequest("GET", `/kbhm/Person/${prop.text}/Find/${prop.row}`);
};

export const PUT_PersonInfo = async (prop) => {
  return await HttpRequest("PUT", `/kbhm/Person`, prop, true);
};
export const PUT_PersonInfo_healthy = async (prop) => {
  return await HttpRequest("PUT", `/kbhm/Person/healthy`, prop, true);
};

export const PUT_PersonTrip = async (prop) => {
  return await HttpRequest("PUT", `/kbhm/Person/Trip`, prop, true);
};

export const PUT_PersonDone = async (prop) => {
  return await HttpRequest("PUT", `/kbhm/Person/Done`, prop, true);
};
export const PUT_PersonABORH = async ({ RowID, ABO, RH, HST, HBV }) => {
  const body = { RowID, ABO, RH, HST, HBV };
  return await HttpRequest("PUT", `/kbhm/Person/ABORH`, body, true);
};

export const GET_DonorExCheck = async ({ DonorExCode }) => {
  return await HttpRequest("GET", `/bl/SyncDonnor/CheckDonnorExCode?DonorExCode=${DonorExCode}`);
};
export const POST_SyncDonor = async (ID) => {
  try {
    let DataPerson = await GET_Person(ID);
    if (DataPerson !== undefined && DataPerson.length > 0) {
      const {
        RowID,
        Name,
        BirthDay,
        Sex,
        CCCD,
        Phone,
        Email,
        DateRegister,
        DiaChiLienLac,
        DiaChiThuongTru_ChiTiet,
        MaTuiMau,
        DiemLayMau,
        LuongMauCoTheHien,
        LuongHien,
        LoaiHienThanhPhan,
        HuyetAp,
        TinhTrangLamSang,
        Mach,
        ChieuCao,
        NgheNghiep,
        DiaChiCoQuan,
        CanNang,
        ABO,
        RH,
        HST,
        HBV,
        BacSiKham,
        Tua,
        NgayBatDau,
        NgayKetThuc,
      } = DataPerson[0];
      const DataSync = {
        DateIn: DateRegister,
        DonorCode: CCCD,
        DonorName: Name,
        DonorNameUnsign: Name,
        Sex: `${Sex}`,
        CCCD: CCCD,
        Age: new Date(BirthDay).getFullYear(),
        Address: (DiaChiLienLac || "") + " " + (DiaChiThuongTru_ChiTiet || ""),
        Phone: Phone,
        BirthDay: BirthDay,
        DonorExCode: MaTuiMau,
        BloodSourceLocationId: DiemLayMau,
        BloodVolume: LuongHien,
        ElementID: LoaiHienThanhPhan,
        BLOODPRESSURE: HuyetAp,
        HGB: "1",
        PULSE: Mach ? `${Mach}` : null,
        STATUS: TinhTrangLamSang,
        WEIGH: CanNang,
        HEIGH: ChieuCao,
        JobID: NgheNghiep,
        ContactAddress: DiaChiCoQuan,
        ABO: ABO,
        Rh: RH,
        HST: HST,
        HBV: HBV,
        DoctorID: BacSiKham,
        UserSync: localStorage.getItem("userID"),
        TripID: Tua,
        ExtractTimeStart: NgayBatDau,
        ExtractTimeEnd: NgayKetThuc,
      };
      return await HttpRequest("POST", `/bl/SyncDonnor`, DataSync);
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

export const POST_SyncDelay = async (ID, data) => {
  try {
    console.log(data);
    let DataPerson = await GET_Person(ID);
    if (DataPerson !== undefined) {
      const { RowID, Name, BirthDay, Sex, CCCD, Phone, DateRegister, DiaChiLienLac, DiaChiThuongTru_ChiTiet, NgheNghiep, DiaChiCoQuan, ABO, RH, HST, HBV } = DataPerson[0];
      const DataSync = {
        DateIn: DateRegister,
        DonorCode: CCCD,
        DonorName: Name,
        DonorNameUnsign: Name,
        Sex: `${Sex}`,
        Age: new Date(BirthDay).getFullYear(),
        Address: (DiaChiLienLac || "") + " " + (DiaChiThuongTru_ChiTiet || ""),
        Phone: Phone,
        BirthDay: BirthDay,
        JobID: NgheNghiep,
        ContactAddress: DiaChiCoQuan,
        ABO_Donor: ABO,
        Rh_Donor: RH,
        CCCD: CCCD,
        HST: HST,
        HBV: HBV,
        CCCD: CCCD,
        ...data,
      };
      return await HttpRequest("POST", `/bl/SyncDonnor/Delay`, DataSync, true);
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

export const POST_SyncDelayDelete = async (data) => {
  return await HttpRequest("POST", `/bl/SyncDonnor/Delay/Delete`, data, true);
};

export const POST_PersonDonateDelay = async (data) => {
  return await HttpRequest("POST", `/kbhm/Person/Delay`, data, true);
};

export const PUT_PersonDonateDelay = async (data) => {
  return await HttpRequest("PUT", `/kbhm/Person/Delay`, data, true);
};

export const GET_PersonDonateDelay = async (CCCD) => {
  return await HttpRequest("GET", `/kbhm/Person/Delay/${CCCD}`);
};

export const DELETE_PersonDonateDelay = async (ID, data) => {
  return await HttpRequest("PUT", `/kbhm/Person/Delay/${ID}`, data);
};

export const GET_DonorDelay = async (DonorCode) => {
  return await HttpRequest("GET", `/bl/SyncDonnor/Delay?DonorCode=${DonorCode}`);
};

export const GET_LastDonor = async (CCCD) => {
  return await HttpRequest("GET", `/kbhm/Person/Lastdonor/${CCCD}`);
};
