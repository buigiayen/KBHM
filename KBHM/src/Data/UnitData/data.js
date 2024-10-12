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
    value: "1. Anh/Chị đã từng hiến máu chưa?",
    data: [
      {
        Key: "1.1",
        value: "Anh/Chị đã từng hiến máu chưa",
        ShowText: false,
        type: formType.checkbox,
      },
    ],
    warning: false,
  },
  {
    Key: 2,
    value: "2. Hiện tại anh/chị có các bệnh:",
    data: [
      {
        Key: "2.1",
        value: "Viêm khớp, đau dạ dày, viêm gan, bệnh tim, huyết áp thấp/cao, hen, ho kéo dài, bệnh máu, bệnh lao?",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "2.2",
        value: "Bệnh khác",
        ShowText: true,
        type: formType.text,
      },
    ],
    warning: true,
  },
  {
    Key: 3,
    value: "3. Trong vòng 12 tháng gần đây anh/chị có bị mắc các bệnh và đã được điều trị khỏi",
    data: [
      {
        Key: "3.1",
        value: "Sốt rét, Giang mai, Lao, Viêm não, viêm màng não, phẫu thuật ngoại khoa?",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "3.2",
        value: "Kết thúc đợt tiêm vắc xin phòng bệnh dại sau khi bị động vật cắn hoặc tiêm, truyền máu, chế phẩm máu và các chế phẩm sinh học nguồn gốc từ máu?",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "3.3",
        value: "Sinh con hoặc chấm dứt thai nghén?",
        ShowText: true,
        type: formType.checkbox,
      },
    ],
    warning: true,
  },
  {
    Key: 4,
    value: "4. Trong vòng 6 tháng gần đây, anh/chị có bị một trong các triệu chứng sau không?",
    data: [
      {
        Key: "4.1",
        value: "Sút cân >= 4Kg không rõ nguyên nhân, Nổi hạch kéo dài, Chữa rang, châm cứu?",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "4.2",
        value: "Xăm mình, xỏ lỗ qua da(tai, mũi...)",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "4.3",
        value: "Sử dụng tiêm chích ma túy, Quan hệ tình dục với người cùng giới?",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "4.4",
        value: "Quan hệ tình dục với người nhiễm HIV hoặc người có nguy cơ lây nhiễm HIV?",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "4.5",
        value: "Khỏi bệnh sau khi mắc một trong các bệnh: Thương hàn, nhiễm trùng huyết, viêm tắc động, tĩnh mạch, viêm tủy xương, viêm tụy?",
        ShowText: true,
        type: formType.checkbox,
      },
    ],

    warning: true,
  },
  {
    Key: 5,
    value: "5. Trong vòng 4 tuần gần đây, anh/chị có bị mắc các bệnh và đã được điều trị khỏi",
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
        value: "Bị cúm, ho, nhức đầu, sốt hoặc đang dùng thuốc kháng sinh, Aspirin, Corticoid...",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "6.2",
        value: "Tiêm vacxin phòng virut viêm gan B",
        ShowText: true,
        type: formType.checkbox,
      },
      {
        Key: "4.3",
        value: "Đến khám bác sỹ làm xét nghiệm",
        ShowText: true,
        type: formType.checkbox,
      },
    ],

    warning: true,
  },
  {
    Key: 7,
    value: "7. Câu hỏi dành cho phụ nữ.",
    data: [
      {
        Key: "7.1",
        value: "Hiện có thai, hoặc nuôi con dưới 12 tháng tuổi?",
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
