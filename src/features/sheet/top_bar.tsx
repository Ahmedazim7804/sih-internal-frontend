import React from "react";
import ShareButton from "./components/share_button";
import FilePickerButton from "./components/file_picker_button";

export default function TopBar() {
    return (
        <div className="w-full h-fit flex items-center">
            <p>SmartSheets</p>
            {/* <ShareButton /> */}
            <FilePickerButton />
        </div>
    );
}
