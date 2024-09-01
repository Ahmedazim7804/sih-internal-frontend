import React from "react";
import ShareButton from "./components/share_button";

export default function TopBar() {
    return (
        <div className="w-full h-fit flex items-center">
           <img src="./img/logo.PNG" alt="logo" style={{ width: '185px', height: '65px',padding: '10px' ,  borderRadius: '20px',}}   />
            <ShareButton />
        </div>
    );
}
