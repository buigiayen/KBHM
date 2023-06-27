import { useEffect, useState } from "react";
import { Button, Tag, Input, Modal } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Tables from "../../Components/Table.antd";
import { GET_AllPerson } from "../../Data/Api/DangKyKham";
import IconCombine from "../../Components/Icon";
import QRCam from "../../Components/QR.Camera";


const { Search } = Input;
const Index = () => {
  const navigator = useNavigate();
  const [ListPerson, SetListPerson] = useState([]);
  const [OpenModal, SetOpenModal] = useState(false);
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
  const PushPage = ({ ID }) => {
    navigator(`/QuanLyThongTin/${ID}`);
  };
  const SearchConditionColumns = [
    {
      title: "Hiến ngày",
      visible: true,
      isFilter: true,
      dataIndex: "SearchDate",
      typeData: "SearchDate",
    },
  ];
  const ColumnPerson = [
    {
      title: "Mã hiến",
      width: 300,
      dataIndex: "RowID",

      render: (_) => {
        return (
          <Button
            type="link"
            onClick={() => {
              PushPage({ ID: _ });
            }}>
            {_}
          </Button>
        );
      },
      isFilter: true,
    },
    {
      title: "Tên người hiến",
      dataIndex: "Name",
      width: 150,
      isFilter: true,
    },
    {
      title: "Ngày sinh",
      dataIndex: "BirthDay",
      width: 120,
      render: (_) => {
        return dayjs(_).format("DD/MM/YYYY");
      },
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "DateRegister",
      width: 120,
      render: (_) => {
        return dayjs(_).format("DD/MM/YYYY");
      },
    },
    {
      title: "Giới tính",
      dataIndex: "Sex",
      width: 85,
      render: (_) => {
        switch (_) {
          case 0:
            return <Tag color="#108ee9">Nữ</Tag>;
          case 1:
            return <Tag color="#87d068">Nam</Tag>;
          default:
            return <Tag color="purple">?</Tag>;
        }
      },
    },
    {
      title: "Điện thoại",
      dataIndex: "Phone",
      width: 120,

    },
    {
      title: "Cho phép hiến máu",
      dataIndex: "ChoPhepHienMau",

      width: 85,
      fixed: 'right',
      render: (_) => {
        switch (_) {
          case true:
            return <Tag color="#108ee9">Cho phép</Tag>;
          case false:
            return <Tag color="#f50">Không cho phép</Tag>;

          default:
            return <Tag color="purple">Chưa thực hiện</Tag>;
        }
      }
    },
    {
      title: "Đồng bộ",
      dataIndex: "Sync",
      fixed: 'right',
      width: 85,
      sorter: (a, b) => a.Sync - b.Sync,
      render: (_) => {
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
      },
    },
    ...SearchConditionColumns,
  ];
  return (
    <>
      <br></br>
      <Search
        placeholder="Tra cứu nhanh qua mã QR "
        suffix={suffix}
        onSearch={(e) => PushPage({ ID: e })}
        enterButton
      />
      <Tables
        dataSource={ListPerson}
        funcReload={FetchPerson}
        Columns={ColumnPerson}
        titleTable={"Danh sách người hiến"}
        Footer={`Số lượng hiến: ${ListPerson?.length ?? 0}`}
        propsTable={{ scroll: { x: 2000, y: 1500, size: 'small', scrollToFirstRowOnChange: true } }}
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
