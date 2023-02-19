
export const Sex = [
    {
        value: 0,
        label: "Nữ"
    },
    {
        value: 1,
        label: "Nam"
    },
   

]
export const Question = [
    {
        Key: 1,
        value: "1. Anh/Chị đã từng hiến máu chưa?",
        data: [{
            Key: "1.1",
            value: "Anh/Chị đã từng hiến máu chưa",
            ShowText: false,
        }],
        warning: false,
    },
    {
        Key: 2,
        value: "2. Anh/Chị có bị các bệnh mãn tính",
        data: [{
            Key: "2.1",
            value: "Thấp khớp, chảy máu tiêu hóa, viêm gan/vàng da, bệnh tim , huyết áp thấp/cao, bệnh thận, ho hen, kéo dài, bệnh máu, lao, ung htuw ... và các bệnh khác? ",
            ShowText: true,
        }],
        warning: true,
    },
    {
        Key: 3,
        value: "3. Trong vòng 6 tháng gần đây, anh/chị có:",
        data: [{
            Key: "3.1",
            value: "Sút cân >4Kg không rõ nguyên nhân ",
            ShowText: true,
        },
        {
            Key: "3.2",
            value: "Nổi hạch kéo dài",
            ShowText: true,
        },
        {
            Key: "3.3",
            value: "Chữa răng, châm cứu, phẫu thuật",
            ShowText: true,
        },
        {
            Key: "3.4",
            value: "Xăm mình, xỏ lỗ qua da(tai,mũi,...)",
            ShowText: true,
        },
        {
            Key: "3.5",
            value: "Sử dụng ma túy, tiêm chích",
            ShowText: true,
        },
        {
            Key: "3.6",
            value: "Quan hệ tình dục với người nhiễm HIV hoặc người có nguy cơ nhiễm HIV",
            ShowText: true,
        },
        {
            Key: "3.7",
            value: "Quan hệ tình dục với người đồng giới",
            ShowText: true,
        },
        {
            Key: "3.8",
            value: "Tiêm vắc xin phòng bệnh",
            ShowText: true,
        },
        {
            Key: "3.9",
            value: "Trong vùng có dịch(số rét, bò điên,...) lưu hành",
            ShowText: true,
        }],

        warning: true,
    },
    {
        Key: 4,
        value: "4. Trong vòng 1 tuần gần đây, anh chị/có",
        data: [{
            Key: "4.1",
            value: "Cúm, ho, nhức đầu, sốt ...",
            ShowText: true,
        },
        {
            Key: "4.2",
            value: "Dùng thuốc kháng sinh, aspirin, corticoid ...",
            ShowText: true,
        },
        {
            Key: "4.3",
            value: "Đến khám bác sỹ làm xét nghiệm",
            ShowText: true,
        }],

        warning: true,
    },
    {
        Key: 5,
        value: "5. Anh/Chị là đối tượng hưởng trợ cấp tàn tật hoặc trợ cấp tàn tật hoặc nạn nhân chất độc màu da cam?",
        data: [{
            Key: "5.1",
            value: "Anh/Chị là đối tượng hưởng trợ cấp tàn tật hoặc trợ cấp tàn tật hoặc nạn nhân chất độc màu da cam?",
            ShowText: false,
        }],

        warning: true,
    },
    {
        Key: 6,
        value: "6. (câu hỏi dành cho nữ) Chị đang có thai hoặc nuôi con dưới 12 tháng tuổi?",
        data: [{
            Key: "6.1",
            value: "(câu hỏi dành cho nữ) Chị đang có thai hoặc nuôi con dưới 12 tháng tuổi?",
            ShowText: false,
        }],

        warning: true,
    }
]