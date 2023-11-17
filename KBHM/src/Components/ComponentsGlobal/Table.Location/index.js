import { Input, Table } from "antd";
import { Get_Region_ALL, Change_Region } from "../../../Data/Api/Region";
import { useEffect, useState } from "react";
import Tables from "../../Table.antd";


const ExportTabLocation = () => {
    const [Data, SetData] = useState();
    useEffect(() => {
        FeatData();
    }, [])
    const FeatData = async () => {
        const data = await Get_Region_ALL()
        SetData(data)
    }

    const onChangeLocation = async ({ Region, ID, value }) => {
        await Change_Region({ Region: Region, ID: ID, Value: value });
    }
    const ColumnTinh = [
        {
            title: 'Tên tỉnh',
            dataIndex: 'tenTinh',
            key: 'tenTinh',
            isFilter: true,
            render: (_, enity) => {
                return <Input defaultValue={_} onPressEnter={(e) => { onChangeLocation({ Region: 'TINH', ID: enity.maTinh, value: e.target.value }) }}></Input>
            }
        },
    ]
    const ColumnHuyen = [
        {
            title: 'Tên Huyện',
            dataIndex: 'tenHuyen',
            key: 'tenHuyen',
            isFilter: true,
            render: (_, enity) => {
                return <Input onPressEnter={(e) => { onChangeLocation({ Region: 'HUYEN', ID: enity.maHuyen, value: e.target.value }) }} defaultValue={_} ></Input>
            }
        },
    ]
    const ColumnXa = [
        {
            title: 'Tên Xã',
            dataIndex: 'tenXa',
            key: 'tenXa',
            isFilter: true,
            render: (_, enity) => {
                return <Input defaultValue={_} onPressEnter={(e) => { onChangeLocation({ Region: 'XA', ID: enity.maXa, value: e.target.value }) }}></Input>
            }
        },
    ]
    const expandable2 = {
        expandedRowRender: (record) => {
            return <Tables isShowButtonDefault={false} Columns={ColumnXa} dataSource={record.amdDmXas} ></Tables>
        }
    }
    const expandable = {
        expandedRowRender: (record) => {
            return <Tables isShowButtonDefault={false} Columns={ColumnHuyen} dataSource={record.amdDmHuyen} expandable={expandable2} ></Tables>
        }
    }
    return (<Tables
        isShowButtonDefault={false}
        Columns={ColumnTinh}
        dataSource={Data}
        expandable={expandable}
    ></Tables>)

}
export default ExportTabLocation;