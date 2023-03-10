
import { createContext, useState } from "react";
const DangKyContext = createContext({});
function DangKyProvider({ element }) {
    const [ChoPhepHienMau, SetChoPhepHienMau] = useState({});
 
    const ValueData = {
        ChoPhepHienMau,
      
    }
    return (
        <DangKyContext.Provider value={ValueData} >
            {element}
        </DangKyContext.Provider >
    )
}
export { DangKyContext, DangKyProvider }