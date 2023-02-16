import { useEffect } from "react";
import {Get_Token_Veryfy} from '../../Data/Api/Login'

const Index = () => {
    useEffect(() => {
        Get_Token_Veryfy();
    })
    return (<>
        Quản lý thông tin
    </>)

}

export default Index;