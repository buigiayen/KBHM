import { useEffect, useMemo, useState } from "react";
import { GET_Location } from "../../Data/Api/Category";
import Combobox from '../Combobox'
export default function LocationCombobox(props) {
    const ReturnValue = (Value) => {
        if (props.Value !== undefined) {
            props.Value(Value);
        }
    }
    const [Data, setData] =useState([]);
    useEffect(() => {
        async function get() {
            await  GET_Location().then(rs =>{setData(rs)})
        }
        get();
     }, []);
    return (
        <Combobox data={Data} valueDefault={props?.defaultValue} Value={ReturnValue} ></Combobox>
    )
}