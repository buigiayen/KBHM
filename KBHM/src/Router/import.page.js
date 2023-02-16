
import DangKyKhaiBao from '../pages/DangKyKhaiBao/index'
import Login from '../pages/DangNhap/index'
import TraCuuThongTin from '../pages/TraCuuThongTin/index'
import QuanLyThongTin from '../pages/QuanLyThongTin/Index'
import Error_404 from '../pages/Error/Error_404'
const RoutesPage = [
    {
        path: '/',
        element: <DangKyKhaiBao />
    },
    {
        path: '/DangKyKhaiBao',
        element: <DangKyKhaiBao />
    },
    {
        path: '/TraCuuThongTin/:ID',
        element: <TraCuuThongTin />
    },
    {
        path: '/Login',
        element: <Login />,
        index: true
    },
    {
        path: '/QuanLyThongTin',
        element: < QuanLyThongTin />,

    }, {
        path: '*',
        element: <Error_404/>,

    }

]
export default RoutesPage;