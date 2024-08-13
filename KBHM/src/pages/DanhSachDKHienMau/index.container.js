import { useEffect, useState } from "react";
import {
  Tag,
  Input,
  Modal,
  Card,
  DatePicker,
  Button,
  Form,
  Avatar,
  Space,
} from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { GET_AllPerson } from "../../Data/Api/DangKyKham";
import IconCombine from "../../Components/Icon";
import QRCam from "../../Components/QR.Camera";
import ExportTabLocation from "../../Components/ComponentsGlobal/Table.Location";
import { Col, Row } from "antd";
import { ExportDocumentFile as ExportDataReport } from "../../Components/ComponentsGlobal/PreviewDonnor/PDF.Viewer";
import { Get_Category } from "../../Data/Api/Category";
import ElementCombobox from "../../Components/ComponentsGlobal/Combobox/Element.combobox";
import PieChart from "../../Components/Charts/PieCharts";
import PlotsChart from "../../Components/Charts/plotsChart";
import QRCode from "../../Components/QRCode";
import Tables from "../../Components/Table.antd";

const { Search } = Input;
const Index = () => {
  const navigator = useNavigate();
  const [IsLoadding, SetIsLoading] = useState(false);
  const [ListPerson, SetListPerson] = useState([]);
  const [OpenModal, SetOpenModal] = useState(false);
  const [isShowQRLocation, SetisShowQRLocation] = useState(false);
  const [DateRegister, SetDateRegister] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [DiemlayMau, SetDiemLayMau] = useState();
  const [QRDiemlayMau, SetQRDiemLayMau] = useState();
  const [ReportID] = useState(process.env.REACT_APP_DEFAULT_REPORT);
  const [Category, setCategory] = useState([]);
  const [ModalLocation, setModalLocation] = useState(false);

  const FetchPerson = async (props) => {
    const data = await GET_AllPerson(props);
    SetListPerson(data);
    SetIsLoading(false);
  };

  const hideModal = () => {
    SetOpenModal(false);
  };
  const suffix = (
    <IconCombine.CameraOutlined
      onClick={() => {
        SetOpenModal(true);
      }}
    />
  );
  useEffect(() => {
    const DateSearch = {
      FromDate: dayjs().format("YYYY-MM-DD"),
      ToDate: dayjs().format("YYYY-MM-DD"),
    };
    FetchPerson(DateSearch);
    GetCategory();
  }, []);

  const GetCategory = async () => {
    setCategory(await Get_Category());
  };
  const TagStyle = {
    width: "100%",
    textAlign: "center",
  };

  const GetdataReport = async ({ ID }) => {
    await ExportDataReport({
      IDPerson: ID,
      Reportname: ReportID,
    });
  };
  const Reload = () => {
    SetIsLoading(true);
    const Search = {
      DiemLayMau: DiemlayMau,
      FromDate: DateRegister,
      ToDate: DateRegister,
    };
    console.log(Search);
    FetchPerson(Search);
  };
  const ConvertIsStatusDonnor = (_) => {
    switch (_) {
      case "1":
        return (
          <Tag style={TagStyle} color="#108ee9">
            Đã đồng bộ
          </Tag>
        );
      case "2":
        return (
          <Tag style={TagStyle} color="#87d068">
            Đã lấy máu
          </Tag>
        );
      case "3":
        return (
          <Tag style={TagStyle} color="#f50">
            Đã hủy lấy máu
          </Tag>
        );
      default:
        return (
          <Tag style={TagStyle} color="purple">
            Chưa thực hiện
          </Tag>
        );
    }
  };
  const ConvertSex = (_) => {
    switch (_) {
      case 0:
        return (
          <Tag style={TagStyle} color="#108ee9">
            Nữ
          </Tag>
        );
      case 1:
        return (
          <Tag style={TagStyle} color="#87d068">
            Nam
          </Tag>
        );
      default:
        return (
          <Tag style={TagStyle} color="purple">
            ?
          </Tag>
        );
    }
  };
  const ConvertStatus = (_) => {
    switch (_) {
      case true:
        return (
          <Tag style={TagStyle} color="#108ee9">
            Cho phép
          </Tag>
        );
      case false:
        return (
          <Tag style={TagStyle} color="#f50">
            Không cho phép
          </Tag>
        );

      default:
        return (
          <Tag style={TagStyle} color="purple">
            Chưa thực hiện
          </Tag>
        );
    }
  };
  const ColorCharts = (label) => {
    if (label === "Cho phép hiến máu") {
      return "#52c41a";
    }
    if (label === "Không cho phép hiến máu") {
      return "#ff4d4f";
    }
    if (label === "Đã đồng bộ") {
      return "#3f6600";
    } else {
      return "#5B8FF9";
    }
  };
  const DataCharts = () => {
    const Data = [
      {
        label: "Cho phép hiến máu",
        value: ListPerson.filter((rs) => rs.ChoPhepHienMau === true).length,
      },
      {
        label: "Không cho phép hiến máu",
        value: ListPerson.filter((rs) => rs.ChoPhepHienMau === false).length,
      },
      {
        label: "Đã đồng bộ",
        value: ListPerson.filter((rs) => rs.Sync === "1").length,
      },
      { label: "Tổng số lượng hiến", value: ListPerson.length },
    ];

    return Data;
  };

  const initialColumnsDonnor = [
    {
      key: "Edit",
      title: " ",
      dataIndex: "RowID",
      render: (_) => {
        return (
          <Space>
            <IconCombine.EditOutlined
              title="Sửa chi tiết"
              onClick={() => {
                PushPage({ ID: _ });
              }}
            />
            <IconCombine.PrinterOutlined
              title=" In phiếu ĐK"
              onClick={() => {
                GetdataReport({ ID: _ });
              }}
            />
          </Space>
        );
      },
      width: 50,
      align: "center",
    },

    {
      key: "UrlImage",
      title: "Ảnh",
      dataIndex: "UrlImage",
      render: (_) => {
        return <Avatar src={_}> </Avatar>;
      },
      align: "center",
      width: 75,
    },
    {
      key: "Name",
      title: "Họ và tên",
      dataIndex: "Name",
      isFilter: true,
      width: 320,
    },
    {
      key: "Sex",
      title: "Giới tính",
      dataIndex: "Sex",
      render: (_) => {
        return ConvertSex(_);
      },
      width: 90,
    },
    {
      key: "CCCD",
      title: "CCCD",
      dataIndex: "CCCD",
      isFilter: true,
      width: 120,
    },
    {
      key: "Phone",
      title: "Điện thoại",
      dataIndex: "Phone",
      isFilter: true,
      render: (_) => <a href={`tel:+=${_}`}>{_}</a>,
      width: 120,
    },
    {
      key: "BirthDay",
      title: "Ngày sinh",
      dataIndex: "BirthDay",
      render: (_) => <small>{dayjs(_).format("DD/MM/YYYY")}</small>,
      width: 120,
    },
    {
      key: "Sync",
      title: "Đồng bộ",
      dataIndex: "Sync",
      render: (_) => ConvertIsStatusDonnor(_),
      width: 120,
    },
    {
      key: "ChoPhepHienMau",
      title: "Hiến máu",
      dataIndex: "ChoPhepHienMau",
      render: (_) => ConvertStatus(_),
      width: 120,
    },
  ];

  const PushPage = ({ ID }) => {
    navigator(`/QuanLyThongTin/${ID}`);
  };

  return (
    <>
      <br></br>
      <Row>
        <Col xs={24} sm={24} md={6}>
          <Card style={{ width: 100 + "%" }}>
            <Form layout="vertical">
              <Form.Item label="Chọn ngày Hiến">
                <DatePicker
                  style={{ width: 100 + "%" }}
                  allowClear={false}
                  defaultValue={dayjs()}
                  onChange={(e) => {
                    SetDateRegister(e.format("YYYY-MM-DD").toString());
                  }}
                  format={"DD/MM/YYYY"}
                />
              </Form.Item>
              <ElementCombobox
                dataSource={Category?.location}
                Name={"DiemLayMau"}
                Label="Điểm lấy máu"
                autoClear={true}
                onChange={(e) => {
                  SetDiemLayMau(e);
                }}
              />
              <Space>
                <Button
                  loading={IsLoadding}
                  type="dashed"
                  style={{ width: 100 + "%" }}
                  onClick={() => SetisShowQRLocation(true)}
                  icon={<IconCombine.QrcodeOutlined />}
                >
                  Tạo QR điểm hiến
                </Button>
                <Button
                  loading={IsLoadding}
                  type="dashed"
                  style={{ width: 100 + "%" }}
                  onClick={() => setModalLocation(true)}
                  icon={<IconCombine.GlobalOutlined />}
                >
                  Địa danh
                </Button>
                <Button
                  loading={IsLoadding}
                  type="primary"
                  style={{ width: 100 + "%" }}
                  onClick={() => Reload()}
                  icon={<IconCombine.ReloadOutlined />}
                >
                  Tìm kiếm
                </Button>
              </Space>
            </Form>
          </Card>

          <Row>
            <Card title="BIỂU ĐỒ" style={{ width: 100 + "%" }}>
              {DataCharts() && (
                <>
                  <PlotsChart
                    dataSource={DataCharts()}
                    color={(label) => ColorCharts(label)}
                  ></PlotsChart>
                </>
              )}
            </Card>
          </Row>
        </Col>

        <Col sm={24} md={18}>
          <Card
            className="CardListTable"
            style={{ padding: "0%" }}
            title={`Danh sách người hiến ngày: ${DateRegister} `}
            extra={[
              <Search
                placeholder="Tra cứu nhanh qua mã QR "
                suffix={suffix}
                onSearch={(e) => PushPage({ ID: e })}
                enterButton
              />,
            ]}
          >
            <Tables
              Columns={initialColumnsDonnor}
              dataSource={ListPerson}
            ></Tables>
          </Card>
        </Col>
      </Row>
      <Modal
        title="Chọn điểm hiến"
        width={500}
        open={isShowQRLocation}
        okButtonProps={{ style: { visibility: "hidden" } }}
        cancelButtonProps={{ style: { visibility: "hidden" } }}
        onCancel={() => {
          SetisShowQRLocation(false);
        }}
      >
        <Form
          onFinish={(e) => {
            SetQRDiemLayMau(e);
          }}
        >
          <ElementCombobox
            dataSource={Category?.location}
            Name={"DiemLayMau"}
            Label="Điểm lấy máu"
            autoClear={true}
            ruler={[
              {
                message: "Bắt buộc",
                required: true,
              },
            ]}
          />

          <Form.Item
            label="Thời gian hiến: "
            name={"NgayHien"}
            initialValue={dayjs()}
          >
            <DatePicker format={"DD/MM/YYYY"}></DatePicker>
          </Form.Item>

          <Button style={{ width: 100 + "%" }} type="primary" htmlType="submit">
            Tạo QR
          </Button>
        </Form>
        <>
          {QRDiemlayMau && (
            <>
              <QRCode
                value={
                  window.location.origin +
                  "/DiemHien/" +
                  QRDiemlayMau?.DiemLayMau +
                  "/TimeChecking/" +
                  QRDiemlayMau?.NgayHien
                }
              ></QRCode>
            </>
          )}
        </>
      </Modal>
      <Modal
        open={OpenModal}
        onOk={hideModal}
        onCancel={hideModal}
        title={"Quét QR"}
        okText="Lấy"
        cancelText="Tắt"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        {OpenModal && (
          <QRCam
            Value={(e) => {
              if (e != null && e != undefined) {
                PushPage({ ID: e });
                SetOpenModal(false);
              }
            }}
          />
        )}
      </Modal>
      <Modal
        open={ModalLocation}
        width={2000 + "px"}
        onOk={() => {
          setModalLocation(false);
        }}
        onCancel={() => {
          setModalLocation(false);
        }}
        title={"Địa danh"}
        okText="Lấy"
        cancelText="Tắt"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <ExportTabLocation></ExportTabLocation>
      </Modal>
    </>
  );
};
export default Index;
