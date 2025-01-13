import React from "react";
import DangKyKhaiBao from "../pages/DangKyKhaiBao/index";
import Login from "../pages/DangNhap/index";
import TraCuuThongTin from "../pages/TraCuuThongTin/index";
import QuanLyThongTin from "../pages/QuanLyThongTin/Index";
import DanhSachDKHienMau from "../pages/DanhSachDKHienMau/index";
import Error_404 from "../pages/Error/Error_404";
import DongBo from "../pages/DongBo/index";
const RoutesPage = [
  {
    path: "/",
    element: <DangKyKhaiBao />,
  },
  {
    path: "/DangKyKhaiBao",
    element: <DangKyKhaiBao />,
  },
  {
    path: "/RowID/:RowID",
    element: <DangKyKhaiBao />,
  },
  {
    path: "/TraCuuThongTin/:ID",
    element: <TraCuuThongTin />,
  },
  {
    path: "/DiemHien/:IDDiemHien/TraCuuThongTin/:ID",
    element: <TraCuuThongTin />,
  },
  {
    path: "/TraCuuThongTin",
    element: <TraCuuThongTin />,
  },
  {
    path: "/DanhSachDangKyHienMau",
    element: <DanhSachDKHienMau />,
    isAdmin: true,
  },
  {
    path: "/Login",
    element: <Login />,
    index: true,
  },
  {
    path: "/QuanLyThongTin/:ID",
    element: <QuanLyThongTin />,
  },
  {
    path: "/DongBo",
    element: <DongBo />,
  },
  {
    path: "*",
    element: <Error_404 />,
  },
  {
    path: "/api-gw/",
  },
];
export default RoutesPage;
