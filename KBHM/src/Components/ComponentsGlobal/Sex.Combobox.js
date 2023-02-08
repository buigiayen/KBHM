import { Sex } from "../../Data/UnitData/data";
import Combobox from '../Combobox'
export default function SexCombobox() {
    return (
        <Combobox data={Sex} valueDefault={{ ...Sex[0] }}></Combobox>
    )
}