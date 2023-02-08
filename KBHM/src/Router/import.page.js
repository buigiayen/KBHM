
import DangKyKhaiBao from '../pages/DangKyKhaiBao/index'

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
        element: <DangKyKhaiBao />
    },
    {
        path: '/Login',
        element: <DangKyKhaiBao />,
        index : true
    },

]
export default RoutesPage;