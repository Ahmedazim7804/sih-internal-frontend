export default function SpreadSheetHeaders() {
    return (
        <div className="flex cursor-pointer flex-row items-center py-4 px-4">
            <p className="mr-[17ch]">Today</p>
            <div className="flex-1 flex justify-evenly">
                <p>Access Level</p>
                <p>Created At</p>
            </div>
        </div>
    );
}
