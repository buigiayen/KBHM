import { useEffect, useMemo, useState } from "react";
import { GET_Element } from "../../Data/Api/Category";
import Combobox from '../Combobox'
export default function ElementCombobox(props) {
    const ReturnValue = (Value) => {
        if (props.Value !== undefined) {
            props.Value(Value);
        }
    }
    const [Data, setData] =useState([]);
    useMemo(async() => {
       await GET_Element().then(rs =>{setData(rs)})
     }, []);
    return (
        <Combobox data={Data} valueDefault={props?.defaultValue} Value={ReturnValue} ></Combobox>
    )
}