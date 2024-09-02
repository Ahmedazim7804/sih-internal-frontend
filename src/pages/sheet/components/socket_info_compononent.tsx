export default function SocketInfoCompononent() {
    const disconnectedCss: string = "shadow-[0_0_10px_5px_#ef4444] bg-red-400";

    return (
        <div className="flex flex-row w-fit justify-center items-center">
            <div
                className={`h-2 w-2 rounded-full border-none outline-none ${disconnectedCss} shadow mx-4`}
            ></div>
            <p>You are connected</p>
        </div>
    );
}
