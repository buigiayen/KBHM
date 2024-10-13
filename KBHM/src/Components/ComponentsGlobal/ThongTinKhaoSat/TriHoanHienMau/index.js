import { Button, Checkbox, Col, Divider, Form, Input, InputNumber, Modal, Radio, Row, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import ThoiGianTriHoan from "./ThoiGianTriHoan";
import ThongTinTriHoan from "./ThongTinTriHoan";
import { DELETE_PersonDonateDelay, POST_PersonDonateDelay, POST_SyncDelay, POST_SyncDelayDelete, POST_SyncDonor, PUT_PersonDonateDelay } from "../../../../Data/Api/DangKyKham";
import { DateTimeToLocaleDate } from "./helper";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const TriHoanHienMau = ({ ID, dataDelay, GetDataDelay, DataPerson, isDelaySync }) => {
  const [modal, contextHolder] = Modal.useModal();

  const formRef = useRef();
  const [loaiTriHoan, setLoaiTriHoan] = useState(null);

  const onChangeTimeTriHoan = (e) => {
    setLoaiTriHoan(e.target.value);
    formRef.current.setFieldValue("DelayTime", null);
  };

  const UpdateTriHoanInformation = async (data) => {
    if (dataDelay) {
      modal.confirm({
        title: "Xác nhận hủy trì hoãn",
        icon: <ExclamationCircleOutlined />,
        content: "",
        okText: "Xác nhận",
        cancelText: "Hủy",
        onOk: async () => {
          await DELETE_PersonDonateDelay(dataDelay.RowID).then(async () => {
            const dataSync = {
              DonorCode: DataPerson.CCCD,
              RegisterDate: dataDelay.DelayDate,
            };
            await POST_SyncDelayDelete(dataSync).then(() => {
              GetDataDelay(DataPerson.CCCD);
            });
          });
        },
      });
    } else {
      let delayDate = DateTimeToLocaleDate(new Date());
      const dataPost = {
        ...data,
        CCCD: DataPerson.CCCD,
        DelayTimeline: loaiTriHoan,
        DelayDate: delayDate,
      };
      await POST_PersonDonateDelay(dataPost).then(async () => {
        const dataSync = {
          RegisterDate: delayDate,
          DonorCode: DataPerson.CCCD,
          Delay: loaiTriHoan,
          TimeDelay: data.DelayTime,
          HIV: data.HIV_Infection || false,
          HCV: data.HCV_Infection || false,
          HBV: data.HBV_Infection || false,
          VDRL: data.VDRL_Infection || false,
          AIDS: data.AIDS_Risk || false,
          VG: data.Liver_Risk || false,
          Xam: data.Tattoo || false,
          CJD: data.CJD || false,
          Hormon: data.Hormon || false,
          Weight: data.Weight || false,
          BloodPressure: data.BloodPressure || false,
          Pulse: data.Pulse || false,
          Temperature: data.Temperature || false,
          Hb: data.Hb || false,
          HealthHistory: data.HealthHistory || false,
          Other3: data.HealthHistoryDetail,
          MCV: data.MCV || false,
          Hct: data.HCT || false,
          WBCQuantity: data.WhiteBloodCellQuantity || false,
          SmallVeins: data.SmallVen || false,
          PLTQuantity: data.PlateletQuantity || false,
          TimeBloodDonorsReiterated: data.TimeBloodDonorsReiterated || false,
          HBsAgTN: data.HbsAg || false,
          Other1: data.Other,
          KQHIV: data.HIV_Positive || false,
          KQHCV: data.HCV_Positive || false,
          KQHBV: data.HBV_Positive || false,
          KQVDRL: data.VDRL_Positive || false,
          CoombsTT: data.CoombsTT_Positive || false,
          KTBT: data.KTBT_Positive || false,
          HBsAg: data.HBsAg_Positive || false,
          ABO: data.ABO_Undetermined || false,
          Rh: data.Rh_Undetermined || false,
        };
        await POST_SyncDelay(ID, dataSync).then(() => GetDataDelay(DataPerson.CCCD));
      });
    }
  };

  useEffect(() => {
    if (dataDelay) {
      setLoaiTriHoan(dataDelay.DelayTimeline);
    }
  }, [dataDelay]);

  return (
    <>
      {contextHolder}
      <Form onFinish={UpdateTriHoanInformation} initialValues={dataDelay} ref={formRef} disabled={dataDelay}>
        <ThoiGianTriHoan onChangeTimeTriHoan={onChangeTimeTriHoan} loaiTriHoan={loaiTriHoan} dataDelay={dataDelay} />
        <ThongTinTriHoan />
        <Button htmlType="submit" type="primary" style={{ width: 100 + "%" }} disabled={!loaiTriHoan || isDelaySync} danger={dataDelay}>
          {dataDelay ? "Hủy trì hoãn" : "Xác nhận"}
        </Button>
      </Form>
    </>
  );
};

export default TriHoanHienMau;
