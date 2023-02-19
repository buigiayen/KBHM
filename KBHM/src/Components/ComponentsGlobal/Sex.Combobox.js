import { Sex } from "../../Data/UnitData/data";
import Combobox from '../Combobox'
export default function SexCombobox(props) {
    const ReturnValue = (Value) =>{
        if(props.Value !==undefined){
            props.Value(Value);
        }
    }
    return (
        <Combobox data={Sex} valueDefault={props?.defaultValue} Value={ReturnValue} ></Combobox>
    )
}