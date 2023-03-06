
import { createContext, useState } from "react";


const DangKyContext = createContext({});

const DangKyProvider = ({ element }) => {
    const [PersonData, SetPersonData] = useState();
    const onhandlePersonData = ({ PersonData }) => {
        SetPersonData(PersonData);
    }
    <DangKyContext.Provider value={PersonData}>
        {element}
    </DangKyContext.Provider>
}
export { DangKyContext, DangKyProvider }