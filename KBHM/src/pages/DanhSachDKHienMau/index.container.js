import { useEffect, useState } from "react";
import { Button, Tag } from "antd";
import Tables from "../../Components/Table.antd";
import { GET_AllPerson } from "../../Data/Api/DangKyKham";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
const Index = () => {
  const navigator = useNavigate();
  const [ListPerson, SetListPerson] = useState([]);
  const FetchPerson = async (props) => {
    const data = await GET_AllPerson(props);
    SetListPerson(data);
  };
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
      isFilter: true,
    },
    {
      title: "Ngày sinh",
      dataIndex: "BirthDay",
      render: (_) => {
        return dayjs(_).format("DD/MM/YYYY");
      },
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "DateRegister",
      render: (_) => {
        return dayjs(_).format("DD/MM/YYYY");
      },
    },
    {
      title: "Giới tính",
      dataIndex: "Sex",
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
    },
    {
      title: "Đồng bộ",
      dataIndex: "Sync",
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
      <Tables
        dataSource={ListPerson}
        funcReload={FetchPerson}
        Columns={ColumnPerson}
        titleTable={"Danh sách người hiến"}
        Footer={`Số lượng hiến: ${ListPerson?.length ?? 0}`}
        propsTable={[
          {
            scroll: {
              y: 3000,
              x: 5000,
            },
          },
        ]}
      />
    </>
  );
};
export default Index;
