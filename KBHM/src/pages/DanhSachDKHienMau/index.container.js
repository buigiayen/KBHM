import { useEffect, useState } from "react";
import { Tag, Input, Modal, Card, DatePicker, Button, Alert } from "antd";
import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";
import { GET_AllPerson } from "../../Data/Api/DangKyKham";
import IconCombine from "../../Components/Icon";
import QRCam from "../../Components/QR.Camera";
import CardListDonnor from "../../Components/ComponentsGlobal/Card.ListDonnor/index";
import { Col, Row } from "reactstrap";
import ViewerPDFDonnor from "../../Components/ComponentsGlobal/PreviewDonnor/PDF.Viewer";

const { Search } = Input;
const Index = () => {
  const styleLabel = {
    fontWeight: "bold",
  };
  const navigator = useNavigate();
  const [ListPerson, SetListPerson] = useState([]);
  const [OpenModal, SetOpenModal] = useState(false);
  const [PreviewDonnor, SetPreviewDonnor] = useState(false);
  const [IDPreview, SetIDPreview] = useState();
  const [isShowPDFViewer, SetisShowPDFViewer] = useState(false);
  const [IDDonorInfo, setIDDonorInfo] = useState(null);
  const [DateRegister, SetDateRegister] = useState(dayjs());
  const [ReportID, SetReportID] = useState();
  const FetchPerson = async (props) => {
    const data = await GET_AllPerson(props);
    SetListPerson(data);
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
  }, []);
  const FindDonnor = ({ dateValue }) => {
    const DateSearch = {
      FromDate: dateValue,
      ToDate: dateValue,
    };
    FetchPerson(DateSearch);
  };
  const Reload = () => {
    const DateSearch = {
      FromDate: DateRegister,
      ToDate: DateRegister,
    };
    FetchPerson(DateSearch);
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
      <Search
        placeholder="Tra cứu nhanh qua mã QR "
        suffix={suffix}
        onSearch={(e) => PushPage({ ID: e })}
        enterButton
      />
      <Row />
      <br></br>
      <div>
        {ListPerson.length > 0 && (
          <Row>
            <Col xs={12} md={4} lg={3}>
              <Alert
                message={
                  `Cho phép hiến máu: ` +
                  ListPerson.filter((rs) => rs.ChoPhepHienMau === true).length
                }
                type="success"
              />
            </Col>
            <Col xs={12} md={4} lg={3}>
              <Alert
                message={
                  `Không cho phép hiến: ` +
                  ListPerson.filter((rs) => rs.ChoPhepHienMau === false).length
                }
                type="error"
              />
            </Col>
            <Col xs={12} md={4} lg={3}>
              <Alert
                message={
                  `Đã đồng bộ: ` +
                  ListPerson.filter((rs) => rs.Sync === "1").length
                }
                type="info"
              />
            </Col>
            <Col xs={12} md={4} lg={3}>
              <Alert
                message={`Tổng số lượng hiến: ` + ListPerson.length}
                type="info"
              />
            </Col>
          </Row>
        )}
      </div>
      <br></br>
      <Card
        title={`Danh sách người hiến ngày: ${DateRegister.format(
          "DD/MM/YYYY"
        )} `}
        extra={[
          <DatePicker
            allowClear={false}
            defaultValue={dayjs()}
            onChange={(e) => {
              FindDonnor({ dateValue: e });
              SetDateRegister(e);
            }}
            format={"DD/MM/YYYY"}
          />,
          <Button
            type="link"
            title="Tải lại danh sách"
            onClick={() => {
              Reload();
            }}
            icon={<IconCombine.ReloadOutlined />}
          />,
        ]}>
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
                  {rs.Sync === "1" ? (
                    <IconCombine.PrinterOutlined
                      title=" In phiếu ĐK"
                      onClick={() => {
                        setIDDonorInfo(rs.RowID);
                        SetisShowPDFViewer(true);
                      }}
                    />
                  ) : (
                    ""
                  )}
                </>,
              ]}
            />
          );
        })}
      </Card>
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
      <ViewerPDFDonnor
        ReportID={ReportID}
        Open={isShowPDFViewer}
        Cancel={() => {
          SetisShowPDFViewer(false);
        }}
        IDDonnor={IDDonorInfo}
      />
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
