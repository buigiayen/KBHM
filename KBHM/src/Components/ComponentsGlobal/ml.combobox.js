import { useEffect, useMemo, useState } from "react";
import { GET_Ml } from "../../Data/Api/Category";
import Combobox from '../Combobox'
export default function MlCombobox(props) {
    const ReturnValue = (Value) => {
        if (props.Value !== undefined) {
            props.Value(Value);
        }
    }
    const [isLoading,SetisLoading] = useState();
    const [Data, setData] =useState([]);
    useEffect(() => {
        SetisLoading(true);
        async function get() {
            await GET_Ml().then(rs =>{setData(rs)})
        }
        setTimeout(() => {
            get();
            SetisLoading(false)
        }, 5000);
     }, []);
    return (
        <Combobox  data={Data} valueDefault={props?.defaultValue} Value={ReturnValue} loading={isLoading} ></Combobox>
    )
}