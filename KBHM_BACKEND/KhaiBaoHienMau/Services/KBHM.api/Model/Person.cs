using System;
using System.Collections.Generic;

namespace KBHM.api.Model
{
    public enum Sync
    {
        None,
        Sync,
        GetBlood,
        CancelBlood,
        SyncError
    }
    public class Person : Filter
    {

        public Guid RowID { get; set; }
        public string Name { get; set; }
        public DateTime BirthDay { get; set; }
        public int? Sex { get; set; }
        public string CCCD { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string NoiCapCCCD { get; set; }
        public string DiaChiThuongTru_ChiTiet { get; set; }
        public string DiaChiThuongTru { get; set; }
        public string DiaChiThuongLienLac_ChiTiet { get; set; }
        public string DiaChiLienLac { get; set; }
        public double? CanNang { get; set; }
        public double? ChieuCao { get; set; }
        public double? Mach { get; set; }
        public string? HuyetAp { get; set; }
        public string TinhTrangLamSang { get; set; }
        public bool? ChoPhepHienMau { get; set; }
        public double? LuongMauLay { get; set; }
        public int? TamHoan { get; set; }
        public DateTime? NgayHien { get; set; }
        public double? LuongHien { get; set; }
        public string PhanUng { get; set; }
        public string XuTri { get; set; }
        public int? LuongMauCoTheHien { get; set; }
        public string MaTuiMau { get; set; }
        public string DiemLayMau { get; set; }
        public int? LoaiHienThanhPhan { get; set; }
        public Sync? SyncData { get; set; }
        public string UrlImage { get; set; }
        public int? warning { get; set; }
        public string NgheNghiep { get; set; }
        public string DiaChiCoQuan { get; set; }
        public string NguoiLayMau { get; set; }
        public string NguoiDongBo { get; set; }
        public List<PersonProperties> PersonProperties { get; set; }

    }
}
