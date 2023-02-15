
import DangKyKhaiBao from '../pages/DangKyKhaiBao/index'
import Login from '../pages/DangNhap/index'
import TraCuuThongTin from '../pages/TraCuuThongTin/index'

const  RoutesPage = [
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
        index : true
    },

]
export default RoutesPage;