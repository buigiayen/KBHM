import { useEffect, useMemo, useState } from "react";
import { GET_Ml } from "../../Data/Api/Category";
import Combobox from '../Combobox'
export default function MlCombobox(props) {
    const ReturnValue = (Value) => {
        if (props.Value !== undefined) {
            props.Value(Value);
        }
    }
    const [Data, setData] =useState([]);
    useEffect(() => {
        async function get() {
            await GET_Ml().then(rs =>{setData(rs)})
        }
        get();
      
     }, []);
    return (
        <Combobox  data={Data} valueDefault={props?.defaultValue} Value={ReturnValue} ></Combobox>
    )
}