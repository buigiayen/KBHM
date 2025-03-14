export const formType = {
  checkbox: "checkbox",
  text: "text",
  textarea: "textarea",
  select: "select",
  datetimepicker: "datetimepicker",
  datepicker: "datepicker",
};
export const Sex = [
  {
    value: 0,
    label: "Nữ",
  },
  {
    value: 1,
    label: "Nam",
  },
];
export const Question = [
  {
    Key: 1,
    value: "1. Hiện tại anh/chị có các bệnh:",
    data: [
      {
        Key: "1.1",
        value: "Các bệnh mãn tính hoặc cấp tính về thần kinh, tâm thần, hô hấp, tuần hoàn, tiết niệu, tiêu hóa, gan mật, nội tiết, máu, bệnh hệ thống, bệnh tự miễn, tình trạng dị ứng nặng",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "1.2",
        value: "Căn bệnh ác tính như ung thư phổi, ung thư gan, ung thư da...",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "1.3",
        value: "Mang thai vào thời điểm đăng ký hiến máu",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "1.4",
        value: "Có tiền sử lấy, hiến, ghép bộ phận cơ thể người",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "1.5",
        value: "Nghiện ma túy, nghiện rượu",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "1.6",
        value: "Khuyết tật nặng",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "1.7",
        value: "Các bệnh lây truyền qua đường máu, đường tình dục tại thời điểm đăng ký hiến máu",
        ShowText: true,
        type: formType.checkbox,
      },
    ],
    warning: true,
  },
  {
    Key: 2,
    value: "2. Trong vòng 12 tháng anh/chị có",
    data: [
      {
        Key: "2.1",
        value: "Mắc bệnh Sốt rét, Giang mai, Lao, Viêm não, viêm màng não, uốn ván",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "2.2",
        value: "Phẫu thuật ngoại khoa?",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "2.3",
        value: "Kết thúc đợt tiêm vắc xin phòng bệnh dại hoặc tiêm, truyền máu, chế phẩm máu và các chế phẩm sinh học nguồn gốc từ máu?",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "2.4",
        value: "Sinh con hoặc chấm dứt thai nghén?",
        ShowText: true,
        type: formType.checkbox,
      },
    ],
    warning: true,
  },
  {
    Key: 3,
    value: "3. Trong vòng 6 tháng gần đây, anh/chị có",
    data: [
      {
        Key: "3.1",
        value: "Sút cân >= 4Kg không rõ nguyên nhân, Nổi hạch kéo dài, Chữa rang, châm cứu?",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "3.2",
        value: "Xăm mình, xỏ lỗ qua da(tai, mũi...)",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "3.3",
        value: "Phơi nhiễm với máu và dịch cơ thể từ người có nguy cơ hoặc đã nhiễm các bệnh lây truyền qua đường máu",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "3.4",
        value: "Khỏi bệnh sau khi mắc một trong các bệnh: Thương hàn, nhiễm trùng huyết, viêm tắc động, tĩnh mạch, viêm tủy xương, viêm tụy?",
        ShowText: true,
        type: formType.checkbox,
      },
    ],
    warning: true,
  },
  {
    Key: 4,
    value: "4. Trong vòng 4 tháng: Anh/chị có",
    data: [
      {
        Key: "4.1",
        value: "Thực hiện thủ thuật/phẫu thuật nội soi không?",
        ShowText: true,
        type: formType.checkbox,
      },
    ],
    warning: true,
  },
  {
    Key: 5,
    value: "5. Trong vòng 4 tuần gần đây, anh/chị có",
    data: [
      {
        Key: "5.1",
        value:
          "Khỏi bệnh sau khi mắc một trong các bệnh: Viêm dạ dày ruột, viêm đường tiết niệu, viêm da nhiễm trùng, viêm phế quản, viêm phổi, sởi, ho gà, quai bị, sốt xuất huyết, kiết lỵ, rubella, tả?",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "5.2",
        value: "Kết thúc đợt tiêm vắc xin phòng: Rubella, sởi, thương hàn, tả, quai bị, thủy đậu, BCG?",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "5.3",
        value: "Đi vào vùng có dịch bệnh lưu hành(Sốt rét, Sốt xuất huyết, Zika...)",
        ShowText: true,
        type: formType.checkbox,
      },
    ],
    warning: true,
  },
  {
    Key: 6,
    value: "6. Trong vòng 7 ngày gần đây, anh/chị có",
    data: [
      {
        Key: "6.1",
        value: "Tiêm vacxin phòng virut viêm gan B",
        ShowText: true,
        type: formType.checkbox,
      },
    ],

    warning: true,
  },
  {
    Key: 7,
    value: "7. Trong vòng 14 ngày gần đây anh/chị có",
    data: [
      {
        Key: "7.1",
        value: "Bị cúm ho, nhức đầu, sốt hoặc đang dùng thuốc kháng sinh, Aspirin, Corticoid...",
        ShowText: true,
        type: formType.checkbox,
      },
    ],

    warning: true,
  },
];
export const labo = [
  {
    Key: 3,
    Name: "Nhóm máu ABO",
    Result: "",
    UserValid: "",
  },
  {
    Key: 4,
    Name: "Nhóm máu RH",
    Result: "",
    UserValid: "",
  },
];
export const ABO = [
  {
    label: "A",
    value: "A",
  },
  {
    label: "B",
    value: "B",
  },
  {
    label: "O",
    value: "O",
  },
  {
    label: "AB",
    value: "AB",
  },
];
export const RH = [
  {
    label: "+",
    value: "+",
  },
  {
    label: "-",
    value: "-",
  },
];

export const HST = [
  {
    label: "< 125",
    value: "< 125",
  },
  {
    label: "> 125",
    value: "> 125",
  },
];

export const HbsAg = [
  {
    label: "Âm tính",
    value: "Âm tính",
  },
  {
    label: "Dương tính",
    value: "Dương tính",
  },
];

export const TimeTriHoan = {
  Day: 1,
  Week: 2,
  Month: 3,
  Year: 4,
  Forever: 5,
  Temporary: 6,
};

export const TimeTriHoanText = {
  1: "ngày",
  2: "tuần",
  3: "tháng",
  4: "năm",
  5: "vĩnh viễn",
  6: "tạm thời",
};

export const disease = [
  {
    label: "HIV",
    name: "HIV_Infection",
  },
  {
    label: "HCV",
    name: "HCV_Infection",
  },
  {
    label: "HBV",
    name: "HBV_Infection",
  },
  {
    label: "VDRL",
    name: "VDRL_Infection",
  },
];

export const risk = [
  {
    label: "Mắc bệnh AIDS",
    name: "AIDS_Risk",
  },
  {
    label: "Viêm gan",
    name: "Liver_Risk",
  },
];

export const PositiveAgain = [
  {
    label: "HIV",
    name: "HIV_Positive",
  },
  {
    label: "HCV",
    name: "HCV_Positive",
  },
  {
    label: "HBV",
    name: "HBV_Positive",
  },
  {
    label: "VDRL",
    name: "VDRL_Positive",
  },
  {
    label: "Coombs TT",
    name: "CoombsTT_Positive",
  },
  {
    label: "KTBT",
    name: "KTBT_Positive",
  },
  {
    label: "HBsAg",
    name: "HBsAg_Positive",
  },
];

export const NotDetermined = [
  {
    label: "ABO",
    name: "ABO_Undetermined",
  },
  {
    label: "Rh",
    name: "Rh_Undetermined",
  },
];

export const Standard = [
  {
    label: "Cân nặng",
    name: "Weight",
  },
  {
    label: "Huyết áp",
    name: "BloodPressure",
  },
  {
    label: "Mạch",
    name: "Pulse",
  },
  {
    label: "Nhiệt độ",
    name: "Temperature",
  },
  {
    label: "Hb",
    name: "Hb",
  },
  {
    label: "Tiền sử sức khỏe",
    hasInput: true,
    name: "HealthHistory",
    inputName: "HealthHistoryDetail",
  },
  {
    label: "MCV",
    name: "MCV",
  },
  {
    label: "Hct",
    name: "HCT",
  },
  {
    label: "Số lượng bạch cầu",
    name: "WhiteBloodCellQuantity",
  },
  {
    label: "Ven nhỏ",
    name: "SmallVen",
  },
  {
    label: "Số lượng tiểu cầu",
    name: "PlateletQuantity",
  },
  {
    label: "Thời gian hiến máu nhắc lại",
    name: "TimeBloodDonorsReiterated",
  },
  {
    label: "HBsAg (Test nhanh)",
    name: "HbsAg",
  },
];
