import { Button } from "antd";
import PropTypes from 'prop-types';
import { PUT_PersonDone, POST_SyncDonor } from "../../../../../Data/Api/DangKyKham";
import { Warning, Info } from "../../../../notification";
import { prototype } from "react-qr-reader";
const ButtonIndex = ({
    Name,
    Type,
    Icon,
    PersonInfo,
    disabled,
    Reload

}) => {
    const PushState = async () => {
        console.log(PersonInfo);
        const ClonePeronUpdate = PersonInfo;
        ClonePeronUpdate.SyncData = 1;

        await PUT_PersonDone(ClonePeronUpdate).then(async () => {
            await POST_SyncDonor(ClonePeronUpdate.RowID)
                .then(() => { Info({ message: 'Hoàn thành trạng thái !' }) })
                .catch(() => { Warning({ message: 'Có lỗi xảy ra' }) })
        })
        Reload();
    };
    return (<Button
        icon={Icon}
        className="btnFull"
        onClick={PushState}
        type={Type}
        disabled={disabled}
    >
        {Name}
    </Button>);
}
ButtonIndex.propTypes = {
    Icon: PropTypes.object,
    Type: PropTypes.object,
    PersonInfo: PropTypes.object,
    Name: PropTypes.string,
    disabled : PropTypes.bool,
    Reload : PropTypes.func
};
export default ButtonIndex;