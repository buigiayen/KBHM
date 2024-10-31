using System;
using System.Collections.Generic;
using System.Globalization;

namespace BloodBank.api.Model
{
    public class PatientInfo
    {
        public string PatientID { get; set; }

        public string MaYTe { get; set; }

        public string InsureNumber { get; set; }

        public string Bed { get; set; }

        public string OrderID { get; set; }

        public string OrderCode { get; set; }

        public string SampleID { get; set; }

        public string Sequence { get; set; }

        public string HoTen { get; set; }

        public DateTime GioChiDinh_DateTime { get; set; }

        public string GioChiDinh
        {
            get
            {
                return GioChiDinh_DateTime.ToString("yyyy-MM-dd HH:mm:ss");
            }
            set
            {
                DateTime result = DateTime.Now;

                if (DateTime.TryParseExact(value, "yyyy-MM-dd HH:mm:ss",
                    CultureInfo.InvariantCulture, DateTimeStyles.None, out result))
                {
                    GioChiDinh_DateTime = result;
                }
                else if (DateTime.TryParseExact(value, "yyyy.MM.dd HH:mm:ss",
                    CultureInfo.InvariantCulture, DateTimeStyles.None, out result))
                {
                    GioChiDinh_DateTime = result;
                }
                else if (DateTime.TryParseExact(value, "yy.MM.dd HH:mm:ss",
                    CultureInfo.InvariantCulture, DateTimeStyles.None, out result))
                {
                    GioChiDinh_DateTime = result;
                }
                else
                {
                    throw new Exception("GioChiDinh is not a valid format.");
                }
            }
        }

        public string GioiTinh { get; set; }

        public int NamSinh { get; set; }

        public DateTime? NgaySinh_DateTime { get; set; }

        public string NgaySinh
        {
            get
            {
                if (NgaySinh_DateTime != null)
                {
                    return NgaySinh_DateTime.GetValueOrDefault().ToString("yyyy-MM-dd");
                }

                return null;
            }
            set
            {
                DateTime result = DateTime.Now;
                NgaySinh_DateTime = null;
                if (DateTime.TryParseExact(value, "yyyy-MM-dd",
                    CultureInfo.InvariantCulture, DateTimeStyles.None, out result))
                {
                    NgaySinh_DateTime = result;
                }
                else if (DateTime.TryParseExact(value, "yyyy/MM/dd",
                    CultureInfo.InvariantCulture, DateTimeStyles.None, out result))
                {
                    NgaySinh_DateTime = result;
                }
            }
        }

        public string Address { get; set; }

        public string MaBSChiDinh { get; set; }

        public string ChanDoan { get; set; }

        public string MaDoiTuong { get; set; }

        public string MaKhoaPhong { get; set; }

        public bool CapCuu { get; set; }

        public string ReceptionLocationId { get; set; }

        public string ReceptionLocationName { get; set; }

        public List<LisProfileOrder> ListTestProfileOrder { get; set; }

        public List<LisTestOrder> ListTestOrder { get; set; }

        public List<LisViSinhTestOrder> ListViSinhTestOrder { get; set; }

        public string HisCode { get; set; }

        public DateTime? DateGet { get; set; }

        public PatientInfo()
        {
            ListTestProfileOrder = new List<LisProfileOrder>();
            ListTestOrder = new List<LisTestOrder>();
            ListViSinhTestOrder = new List<LisViSinhTestOrder>();
        }
    }

    public class LisProfileOrder
    {
        public string OrderDetailID { get; set; }

        public string MaProfile { get; set; }

        public string TestTypeId { get; set; }
    }

    public class LisTestOrder
    {
        public string OrderDetailID { get; set; }

        public string MaDV { get; set; }

        public string TestTypeId { get; set; }
    }

    public class LisViSinhTestOrder
    {
        public string OrderDetailID { get; set; }

        public string MaViSinh { get; set; }

        public string TestTypeId { get; set; }
    }

    public class DataHanhChinh
    {
        public string ObjectID { get; set; }
        public string LocationID { get; set; }
    }
}
