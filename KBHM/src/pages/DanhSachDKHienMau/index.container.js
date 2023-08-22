import { useEffect, useState } from "react";
import {
  Tag,
  Input,
  Modal,
  Card,
  DatePicker,
  Button,
  Alert,
  Space,
  Form,
} from "antd";
import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";
import { GET_AllPerson } from "../../Data/Api/DangKyKham";
import IconCombine from "../../Components/Icon";
import QRCam from "../../Components/QR.Camera";
import CardListDonnor from "../../Components/ComponentsGlobal/Card.ListDonnor/index";
import { Col, Row } from "antd";
import {
  ExportDocumentFile as ExportDataReport,
  ViewerPDFDonnor,
} from "../../Components/ComponentsGlobal/PreviewDonnor/PDF.Viewer";
import { Get_Category } from "../../Data/Api/Category";
import ElementCombobox from "../../Components/ComponentsGlobal/Combobox/Element.combobox";
import PieChart from "../../Components/Charts/PieCharts";
import PlotsChart from "../../Components/Charts/plotsChart";

const { Search } = Input;
const Index = () => {
  const styleLabel = {
    fontWeight: "bold",
  };
  const navigator = useNavigate();
  const [IsLoadding, SetIsLoading] = useState(false);
  const [ListPerson, SetListPerson] = useState([]);
  const [OpenModal, SetOpenModal] = useState(false);
  const [PreviewDonnor, SetPreviewDonnor] = useState(false);
  const [IDPreview, SetIDPreview] = useState();
  const [isShowPDFViewer, SetisShowPDFViewer] = useState(false);
  const [IDDonorInfo, setIDDonorInfo] = useState(null);
  const [DateRegister, SetDateRegister] = useState(dayjs());
  const [DiemlayMau, SetDiemLayMau] = useState();
  const [ReportID] = useState(process.env.REACT_APP_DEFAULT_REPORT);
  const [DataReport, SetDataReport] = useState();
  const [Category, setCategory] = useState([]);
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
      FromDate: dayjs(),
      ToDate: dayjs(),
    };
    FetchPerson(DateSearch);
    GetCategory();
  }, []);
  const GetCategory = async () => {
    setCategory(await Get_Category());
  };
  const FindDonnor = ({ dateValue, DiemLayMau }) => {
    const DateSearch = {
      DiemLayMau: DiemLayMau,
      FromDate: dateValue,
      ToDate: dateValue,
    };
    FetchPerson(DateSearch);
  };

  const GetdataReport = async ({ ID }) => {
    const data = await ExportDataReport({
      IDPerson: ID,
      Reportname: ReportID,
    });
    SetDataReport(data);
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
        return <Tag color="#108ee9">Đã đồng bộ</Tag>;
      case "2":
        return <Tag color="#87d068">Đã lấy máu</Tag>;
      case "3":
        return <Tag color="#f50">Đã hủy lấy máu</Tag>;
      default:
        return <Tag color="purple">Chưa thực hiện</Tag>;
    }
  };

  const ConvertSex = (_) => {
    switch (_) {
      case 0:
        return <Tag color="#108ee9">Nữ</Tag>;
      case 1:
        return <Tag color="#87d068">Nam</Tag>;
      default:
        return <Tag color="purple">?</Tag>;
    }
  };
  const ConvertStatus = (_) => {
    switch (_) {
      case true:
        return <Tag color="#108ee9">Cho phép</Tag>;
      case false:
        return <Tag color="#f50">Không cho phép</Tag>;

      default:
        return <Tag color="purple">Chưa thực hiện</Tag>;
    }
  };
  const ColorChar = (label) => {
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
  const descriptionCard = (value) => {
    const {
      RowID,
      Name,
      BirthDay,
      Sex,
      CCCD,
      Phone,
      DateRegister,
      Sync,
      ChoPhepHienMau,
    } = value;

    return (
      <>
        <p>
          {ConvertIsStatusDonnor(Sync)} {ConvertStatus(ChoPhepHienMau)}
        </p>
        <p>
          {" "}
          <small style={styleLabel}>Mã lần hiến:</small> {RowID}
        </p>
        <p>
          <small style={styleLabel}>Giới tính:</small> {ConvertSex(Sex)} •{" "}
          <small style={styleLabel}>CCCD: </small> {CCCD}
        </p>
        <p>
          <small style={styleLabel}>Số điện thoại: </small>{" "}
          <a href={`tel:+=${Phone}`}>{Phone}</a>
        </p>
        <p>
          <small style={styleLabel}>Ngày sinh: </small>{" "}
          {dayjs(BirthDay).format("DD/MM/YYYY")} •{" "}
          <small style={styleLabel}>Ngày hiến: </small>{" "}
          {dayjs(DateRegister).format("DD/MM/YYYY")}
        </p>
      </>
    );
  };

  const Title = ({ Name }) => {
    return <>{Name}</>;
  };
  const PushPage = ({ ID }) => {
    navigator(`/QuanLyThongTin/${ID}`);
  };

  return (
    <>
      <br></br>
      <Row>
        <Col xs={24} sm={24} md={6}>
          <Row>
            <Card style={{ width: 100 + "%" }}>
              <Search
                placeholder="Tra cứu nhanh qua mã QR "
                suffix={suffix}
                onSearch={(e) => PushPage({ ID: e })}
                enterButton
              />
            </Card>
            <Card style={{ width: 100 + "%" }}>
              <Form layout="vertical">
                <Form.Item label="Chọn ngày Hiến">
                  <DatePicker
                    style={{ width: 100 + "%" }}
                    allowClear={false}
                    defaultValue={dayjs()}
                    onChange={(e) => {
                      SetDateRegister(e);
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
                <Form.Item>
                  <Button
                    loading={IsLoadding}
                    type="primary"
                    style={{ width: 100 + "%" }}
                    onClick={() => Reload()}>
                    {" "}
                    <IconCombine.ReloadOutlined></IconCombine.ReloadOutlined>Tìm
                    kiếm
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Row>
          <Row>
            <Card title="BIỂU ĐỒ" style={{ width: 100 + "%" }}>
              {DataCharts() && (
                <>
                  <PieChart
                    dataSource={DataCharts()}
                    color={(label) => ColorChar(label)}></PieChart>

                  <PlotsChart
                    dataSource={DataCharts()}
                    color={(label) => ColorChar(label)}></PlotsChart>
                </>
              )}
            </Card>
          </Row>
        </Col>

        <Col sm={24} md={18}>
          <Card
            title={`Danh sách người hiến ngày: ${DateRegister.format(
              "DD/MM/YYYY"
            )} `}>
            {ListPerson.map((rs) => {
              return (
                <CardListDonnor
                  avatar={rs.UrlImage}
                  Title={Title({ Name: rs.Name, Sync: rs.Sync })}
                  description={descriptionCard(rs)}
                  ActionArray={[
                    <>
                      <IconCombine.EyeOutlined
                        onClick={() => {
                          SetPreviewDonnor(true);
                          SetIDPreview(rs.RowID);
                        }}
                        title="Xem trước"
                      />
                    </>,
                    <>
                      <IconCombine.EditOutlined
                        title="Sửa chi tiết"
                        onClick={() => {
                          PushPage({ ID: rs.RowID });
                        }}
                      />
                    </>,
                    <>
                      <IconCombine.PrinterOutlined
                        title=" In phiếu ĐK"
                        onClick={() => {
                          setIDDonorInfo(rs.RowID);
                          GetdataReport({ ID: rs.RowID });
                          SetisShowPDFViewer(true);
                        }}
                      />
                    </>,
                  ]}
                />
              );
            })}
          </Card>
        </Col>
      </Row>

      <br></br>

      <br></br>

      <Modal
        width={1000 + "px"}
        open={PreviewDonnor}
        onCancel={() => SetPreviewDonnor(false)}>
        <Row>
          <Col xl={12} xs={12}>
            <iframe
              src={
                window.location.protocol +
                "//" +
                window.location.host +
                "/TraCuuThongTin/" +
                IDPreview
              }
              width={950 + "px"}
              height={950 + "px"}></iframe>
          </Col>
        </Row>
      </Modal>

      <Modal
        width={1000 + "px"}
        open={isShowPDFViewer}
        onCancel={() => {
          SetisShowPDFViewer(false);
        }}>
        <ViewerPDFDonnor ViewPDf={DataReport} />
      </Modal>

      <Modal
        open={OpenModal}
        onOk={hideModal}
        onCancel={hideModal}
        title={"Quét QR"}
        okText="Lấy"
        cancelText="Tắt"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}>
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
    </>
  );
};
export default Index;
