import moment from "moment";

export const ConvertData = (props) => {
    const useDataReturn = [];
    props.map((rs) => {
        useDataReturn.push({ [rs.Key]: rs.value });
    });
    return useDataReturn ?? [];
};
export const FindkeyValueArray = (props) => {
    const Arr = props.Data ?? undefined;
    const ValueReturn = [];
    Arr.forEach((element) => {
        const { Key } = element;
        if (Key === props.Key) {
            ValueReturn.push(element);
        }
    });
    return ValueReturn;
};
export const ConvertDatetime = ({ DateTime }) => {
    console.log(JSON.stringify(DateTime));
    if (DateTime) {
        let Day, month;
        let { $D, $M , $y } = DateTime;
        month =  $M + 1;
        if ($D && $D < 10) {
            Day = "0" + $D
        }else{
            Day = $D
        }

        if (month && month < 10) {
            month = "0" + month;
        }else{
            month = $M + 1
        }
     
        // Tạo đối tượng Date với thời gian mặc định là 00:00:00
        var rTime = `${$y}-${month}-${Day}T00:00:00.000`;
        return rTime;
    } else {
        return undefined;
    }
};
