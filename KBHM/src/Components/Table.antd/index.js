import React, { useEffect, useState, useRef } from "react";
import { Table, Form, Modal, Space } from "antd";
import { Button, Input, Popover, Alert } from "antd";
import {
  ReloadOutlined,
  FilterOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Search from "./Component/Search";
import SearchAble from "./Component/SearchAble";
import "./style.css";

const Tables = ({
  isShowButtonDefault = true,
  Buttons = [],
  titleTable,
  Columns,
  dataSource,
  isloading,
  funcReload,
  onSelectRow,
  propsTable,
  expandable,
  Delete,
  keyIndex,
  Footer,
}) => {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [Column, SetColumns] = useState([]);
  const [OpenModalFilter, setOpenModalFilter] = useState(false);
  const [DataSource, setDataSource] = useState([]);
  const [Pramter, SetPramter] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState([]);
  const [FilterKey, SetFilterKey] = useState();
  const [Loading, Setloading] = useState(true);

  useEffect(() => {
    Setloading(true);
    var ListKey = [];
    if (dataSource != undefined) {
      dataSource.map((rs, index) => {
        ListKey.push({ ...rs, key: index });
      });
    }
    setDataSource(ListKey);
    setTimeout(() => {
      setSelectedRowKeys([]);
      onSelectRow && onSelectRow([]);
      Setloading(false);
    }, 1000);
  }, [dataSource]);

  useEffect(() => {
    const data = [];
    if (Columns !== undefined) {
      Columns.forEach((element) => {
        let propsColumns = element;
        if (element.isFilter) {
          propsColumns = {
            ...propsColumns,
            ...getColumnSearchProps(element.dataIndex, element.title),
          };
        }
        if (!element.visible) {
          data.push(propsColumns);
        }
      });
    }

    SetColumns(data);
  }, [Columns]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText("");
    confirm();
  };

  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${title}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "white" : "white",
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          if (searchInput.current !== undefined) {
            searchInput.current.select();
          }
        }, 100);
      }
    },
  });
  const TimeOutReload = () => {
    setTimeout(() => {
      funcReload();
      setSelectedRowIndex([]);
    }, 500);
  };
  const ButtonDefault = [
    <Popover content={"Làm mới danh sách"}>
      <Button
        type="text"
        icon={<ReloadOutlined style={{ color: "blue" }} />}
        onClick={() => {
          funcReload && funcReload();
          SetFilterKey(null);
        }}
      ></Button>
    </Popover>,
    <Popover>
      <Search
        onConfirm={(e) => {
          Fillter({ valueFind: e });
        }}
      />
    </Popover>,

    <Popover content={"Lọc danh sách"}>
      <Button
        type="text"
        onClick={() => {
          setOpenModalFilter(!OpenModalFilter);
        }}
        icon={<FilterOutlined style={{ color: "green" }} />}
      ></Button>
    </Popover>,
    ...Buttons,
    Delete && (
      <Popover content="Xoá mục được chọn">
        <Button
          danger
          disabled={selectedRowIndex.length > 0 ? false : true}
          onClick={() => {
            selectedRowIndex.map((element) => {
              Delete(element[keyIndex]);
            });
            TimeOutReload();
          }}
          type="text"
          icon={<DeleteOutlined style={{ color: "red" }} />}
        ></Button>
      </Popover>
    ),
  ];
  const Fillter = ({ valueFind }) => {
    if (valueFind === null) {
      SetFilterKey(null);
      funcReload();
    } else {
      SetFilterKey(valueFind);
      const Text = { search: valueFind };
      funcReload && funcReload(Text);
    }
  };
  const FillterAble = ({ valueFind }) => {
    if (valueFind === null) {
      SetFilterKey(null);
      funcReload();
    } else {
      funcReload && funcReload(valueFind);
    }
  };
  const onSelect = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    onSelectRow && onSelectRow(selectedRows);
    setSelectedRowIndex(selectedRows);
  };

  return (
    <>
      {FilterKey && (
        <Alert message={`${"Lọc"} : ${FilterKey}`} type="success" />
      )}
      <Table
        bordered
        columns={Column}
        loading={Loading}
        dataSource={DataSource}
        rowSelection={{
          selectedRowKeys,
          type: "checkbox",
          onChange: onSelect,
        }}
        size="small"
        footer={() => Footer}
        {...propsTable}
        expandable={expandable}
        pagination={{ pageSize: 14}}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
      ></Table>

      <Modal
        open={OpenModalFilter}
        title={"Lọc điều kiện"}
        onCancel={() => {
          form.resetFields();
          setOpenModalFilter(false);
          funcReload();
        }}
        onOk={() => {
          form
            .validateFields()
            .then((rs) => {
              let Condition = { rs };
              if (rs?.SearchDate) {
                Condition = {
                  FromDate: rs.SearchDate[0],
                  ToDate: rs.SearchDate[1],
                  rs,
                };
              }
              FillterAble({ valueFind: Condition });
              setOpenModalFilter(false);
            })
            .catch((er) => {
              console.log(er);
            });
        }}
      >
        <Form form={form} layout="vertical">
          {Columns &&
            Columns.filter((p) => p.isFilter === true).map((element) => {
              return (
                <SearchAble
                  initialValue={element.initialValue}
                  title={element.title}
                  dataIndex={element.dataIndex}
                  typeData={element.typeData}
                  onKeyPress={() => {
                    form
                      .validateFields()
                      .then((rs) => {
                        FillterAble({ valueFind: rs });
                        setOpenModalFilter(false);
                      })
                      .catch((er) => {
                        console.log(er);
                      });
                  }}
                ></SearchAble>
              );
            })}
        </Form>
      </Modal>
    </>
  );
};

export default Tables;
