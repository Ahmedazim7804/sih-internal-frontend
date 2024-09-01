import React from "react";

export default function SpreadSheetList({
    children,
}: {
    children: Array<JSX.Element>;
}) {
    return (
        <div className="mx-auto w-[750px] sm:w-[75%] md:w-[70%] lg:w-[65%] xl:w-[55%] 2xl:w-[55%]">
            {children}
        </div>
    );
}
