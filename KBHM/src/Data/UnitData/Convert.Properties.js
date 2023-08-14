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
    console.log(DateTime);
    if (DateTime) {
        const { $D, $M, $y } = DateTime;
        // Tạo đối tượng Date với thời gian mặc định là 00:00:00
        return `${$y}-${$M + 1}-${$D}T00:00:00.000`;
    } else {
        return undefined;
    }
};
