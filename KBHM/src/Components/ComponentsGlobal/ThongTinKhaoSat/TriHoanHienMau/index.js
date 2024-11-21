import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, InputNumber, Modal, Radio, Row, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import ThoiGianTriHoan from "./ThoiGianTriHoan";
import ThongTinTriHoan from "./ThongTinTriHoan";
import { DELETE_PersonDonateDelay, POST_PersonDonateDelay, POST_SyncDelay, POST_SyncDelayDelete, POST_SyncDonor, PUT_PersonDonateDelay } from "../../../../Data/Api/DangKyKham";
import { DateTimeToLocaleDate } from "./helper";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const TriHoanHienMau = ({ ID, dataDelay, GetDataDelay, DataPerson, qualified }) => {
  const [modal, contextHolder] = Modal.useModal();
  const formRef = useRef();
  const formModalRef = useRef();
  const [loaiTriHoan, setLoaiTriHoan] = useState(null);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const onChangeTimeTriHoan = (e) => {
    setLoaiTriHoan(e.target.value);
    formRef.current.setFieldValue("DelayTime", null);
  };

  const onCancelDelay = async (data) => {
    if (dataDelay.RowID) {
      await DELETE_PersonDonateDelay(dataDelay.RowID, data).then(async () => {
        formModalRef.current.resetFields();
        const dataSync = {
          Comment: data.CancelReason,
          DonorCode: DataPerson.CCCD,
          RegisterDate: DateTimeToLocaleDate(new Date(dataDelay.DelayDate)),
          Delay: loaiTriHoan,
          TimeDelay: dataDelay.DelayTime || 0,
          HIV: dataDelay.HIV_Infection || false,
          HCV: dataDelay.HCV_Infection || false,
          HBV: dataDelay.HBV_Infection || false,
          VDRL: dataDelay.VDRL_Infection || false,
          AIDS: dataDelay.AIDS_Risk || false,
          VG: dataDelay.Liver_Risk || false,
          Xam: dataDelay.Tattoo || false,
          CJD: dataDelay.CJD || false,
          Hormon: dataDelay.Hormon || false,
          Weight: dataDelay.Weight || false,
          BloodPressure: dataDelay.BloodPressure || false,
          Pulse: dataDelay.Pulse || false,
          Temperature: dataDelay.Temperature || false,
          Hb: dataDelay.Hb || false,
          HealthHistory: dataDelay.HealthHistory || false,
          Other3: dataDelay.HealthHistoryDetail,
          MCV: dataDelay.MCV || false,
          Hct: dataDelay.HCT || false,
          WBCQuantity: dataDelay.WhiteBloodCellQuantity || false,
          SmallVeins: dataDelay.SmallVen || false,
          PLTQuantity: dataDelay.PlateletQuantity || false,
          TimeBloodDonorsReiterated: dataDelay.TimeBloodDonorsReiterated || false,
          HBsAgTN: dataDelay.HbsAg || false,
          Other1: dataDelay.Other,
          KQHIV: dataDelay.HIV_Positive || false,
          KQHCV: dataDelay.HCV_Positive || false,
          KQHBV: dataDelay.HBV_Positive || false,
          KQVDRL: dataDelay.VDRL_Positive || false,
          CoombsTT: dataDelay.CoombsTT_Positive || false,
          KTBT: dataDelay.KTBT_Positive || false,
          HBsAg: dataDelay.HBsAg_Positive || false,
          ABO: dataDelay.ABO_Undetermined || false,
          Rh: dataDelay.Rh_Undetermined || false,
        };
        console.log(dataSync);
        await POST_SyncDelayDelete(dataSync).then(() => {
          GetDataDelay(DataPerson.CCCD);
        });
      });
      setOpen(false);
    } else {
      formModalRef.current.resetFields();
      const dataSync = {
        Comment: data.CancelReason,
        DonorCode: DataPerson.CCCD,
        RegisterDate: DateTimeToLocaleDate(new Date(dataDelay.DelayDate)),
        Delay: loaiTriHoan,
        TimeDelay: dataDelay.DelayTime || 0,
        HIV: dataDelay.HIV_Infection || false,
        HCV: dataDelay.HCV_Infection || false,
        HBV: dataDelay.HBV_Infection || false,
        VDRL: dataDelay.VDRL_Infection || false,
        AIDS: dataDelay.AIDS_Risk || false,
        VG: dataDelay.Liver_Risk || false,
        Xam: dataDelay.Tattoo || false,
        CJD: dataDelay.CJD || false,
        Hormon: dataDelay.Hormon || false,
        Weight: dataDelay.Weight || false,
        BloodPressure: dataDelay.BloodPressure || false,
        Pulse: dataDelay.Pulse || false,
        Temperature: dataDelay.Temperature || false,
        Hb: dataDelay.Hb || false,
        HealthHistory: dataDelay.HealthHistory || false,
        Other3: dataDelay.HealthHistoryDetail,
        MCV: dataDelay.MCV || false,
        Hct: dataDelay.HCT || false,
        WBCQuantity: dataDelay.WhiteBloodCellQuantity || false,
        SmallVeins: dataDelay.SmallVen || false,
        PLTQuantity: dataDelay.PlateletQuantity || false,
        TimeBloodDonorsReiterated: dataDelay.TimeBloodDonorsReiterated || false,
        HBsAgTN: dataDelay.HbsAg || false,
        Other1: dataDelay.Other,
        KQHIV: dataDelay.HIV_Positive || false,
        KQHCV: dataDelay.HCV_Positive || false,
        KQHBV: dataDelay.HBV_Positive || false,
        KQVDRL: dataDelay.VDRL_Positive || false,
        CoombsTT: dataDelay.CoombsTT_Positive || false,
        KTBT: dataDelay.KTBT_Positive || false,
        HBsAg: dataDelay.HBsAg_Positive || false,
        ABO: dataDelay.ABO_Undetermined || false,
        Rh: dataDelay.Rh_Undetermined || false,
      };
      await POST_SyncDelayDelete(dataSync).then(() => {
        GetDataDelay(DataPerson.CCCD);
      });
      setOpen(false);
    }
  };

  const UpdateTriHoanInformation = async (data) => {
    if (dataDelay) {
      showModal();
    } else {
      const dataPost = {
        ...data,
        CCCD: DataPerson.CCCD,
        DelayTimeline: loaiTriHoan,
        DelayTime: data.DelayTime || 0,
      };
      await POST_PersonDonateDelay(dataPost).then(async () => {
        const dataSync = {
          RegisterDate: data.DelayDate,
          DonorCode: DataPerson.CCCD,
          Delay: loaiTriHoan,
          TimeDelay: data.DelayTime || 0,
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
    } else {
      setLoaiTriHoan(null);
      formRef.current.resetFields();
    }
  }, [dataDelay]);

  return (
    <>
      {contextHolder}
      <Form onFinish={UpdateTriHoanInformation} initialValues={dataDelay} ref={formRef} disabled={dataDelay}>
        <Form.Item label="Ngày trì hoãn" name="DelayDate" rules={[{ required: true, message: "Yêu cầu" }]}>
          <DatePicker />
        </Form.Item>
        <ThoiGianTriHoan onChangeTimeTriHoan={onChangeTimeTriHoan} loaiTriHoan={loaiTriHoan} dataDelay={dataDelay} />
        <ThongTinTriHoan />
        <Button htmlType="submit" type="primary" style={{ width: 100 + "%" }} disabled={!loaiTriHoan || !qualified} danger={dataDelay}>
          {dataDelay ? "Hủy trì hoãn" : "Xác nhận"}
        </Button>
      </Form>
      <Modal
        title={
          <>
            <ExclamationCircleOutlined style={{ color: "#edd45c" }} /> Xác nhận hủy trì hoãn
          </>
        }
        open={open}
        onOk={() => {
          formModalRef.current.submit();
        }}
        onCancel={hideModal}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form layout="vertical" ref={formModalRef} onFinish={onCancelDelay}>
          <Form.Item name="CancelReason" label="Lý do hủy trì hoãn" rules={[{ required: true, message: "Yêu cầu" }]}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TriHoanHienMau;
