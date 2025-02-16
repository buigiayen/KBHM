import { Card, Col, Space } from "antd";
import Tables from "../../Components/Table.antd";
import IconCombine from "../../Components/Icon";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const Index = ({ DateRegister, dataSource }) => {
  const initialColumns = [
    {
      key: "Edit",
      title: " ",
      dataIndex: "RowID",
      render: (_) => {
        return (
          <Space>
            <IconCombine.EditOutlined title="Sửa chi tiết" onClick={() => {}} />
          </Space>
        );
      },
      width: 50,
      align: "center",
    },
    {
      key: "DiemLayMau",
      title: "Điểm lấy máu",
      dataIndex: "DiemLayMau",
      render: (_) => {
        return _;
      },
      width: 90,
    },
    {
      key: "NgayHien",
      title: "Ngày hiến",
      dataIndex: "NgayHien",
      render: (_) => <small>{dayjs(_).format("DD/MM/YYYY")}</small>,
      width: 120,
    },
    {
      key: "UserCreate",
      title: "Người tạo mã",
      dataIndex: "UserCreate",
      render: (_) => {
        return _;
      },
      width: 90,
    },
    {
      key: "CreateTime",
      title: "Ngày tạo mã",
      dataIndex: "CreateTime",
      render: (_) => <small>{dayjs(_).format("DD/MM/YYYY")}</small>,
      width: 120,
    },
    {
      key: "Active",
      title: "Trạng thái",
      dataIndex: "Ative",
      isFilter: true,
      render: (_) => <a href={`tel:+=${_}`}>{_}</a>,
      width: 120,
    },
  ];

  return (
    <>
      <Card
        className="CardListTable"
        style={{ padding: "0%" }}
        title={`Danh sách mã hiến ngày: ${DateRegister} `}
      >
        <Tables Columns={initialColumns} dataSource={dataSource}></Tables>
      </Card>
    </>
  );
};

export default Index;
