
export const ConvertData = (props) => {
    const useDataReturn = [];
    props.map(rs => {
        useDataReturn.push({ [rs.Key]: rs.value });
    })
    return useDataReturn ?? [];
}
export const FindkeyValueArray = (props) => {
    const Arr = props.Data ?? undefined;
    const ValueReturn = [];
    Arr.forEach(element => {
        const { Key } = element;
        if (Key === props.Key){
            ValueReturn.push(element)    
        }
    });
    return ValueReturn;
}