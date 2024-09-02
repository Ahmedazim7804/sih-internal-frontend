import { ThreeDots } from "react-loader-spinner";

export default function LoadingScreen() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <ThreeDots color="#facc15" />
        </div>
    );
}
