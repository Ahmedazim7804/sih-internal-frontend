import ShareButton from "./components/share_button";
import FilePickerButton from "./components/file_picker_button";
import ProfileComponent from "./components/profile_component";
import { useSocket } from "../../hooks/use_socket";
import Logo from "../../components/logo";

export default function TopBar() {
    // const { sheet, previousSheet, setSheet, updateData } = useSheetContext();
    // const { connect, disconnect, listen, send, subscribe, stopListen } =
    useSocket();

    // useEffect(() => {
    //     listen("STATE", (data) => {
    //         console.log(data.data);

    //         setSheet(data.data);
    //         updateData();
    //     });

    //     return () => {
    //         stopListen();
    //         disconnect();
    //     };
    // });

    return (
        <div className="w-full h-fit flex items-center">
            <Logo />
            <div className="ml-auto flex items-center">
                <FilePickerButton></FilePickerButton>
                <ShareButton />
                <ProfileComponent atEnd={true} />
            </div>
        </div>
    );
}
