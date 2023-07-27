import { Sex } from "../../../Data/UnitData/data";
import Combobox from '../../Combobox'

export default function SexCombobox({ onChange, Name, initialValue, PropsFormItem }) {
    return (
        <Combobox
            PropsFormItem={PropsFormItem}
            onChange={onChange}
            data={Sex}
            initialValue={initialValue}
            Name={Name}
        >
        </Combobox>

    )
}