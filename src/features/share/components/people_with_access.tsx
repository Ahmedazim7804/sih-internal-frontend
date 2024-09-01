import { IconContext } from "react-icons";
import { FaUser } from "react-icons/fa";
import { ICollabrator } from "../interfaces/collabrator_interface";

export default function PeopleWithAccess({
    collabrator,
}: {
    collabrator: ICollabrator;
}) {
    console.log(collabrator);
    return (
        <div className="flex items-center my-4">
            <div
                className="
        bg-gray-500
        flex
        border-none hover:border-none active:border-none rounded-full px-5 w-12 h-12 items-center justify-center mr-2"
            >
                <div className="flex justify-center items-center">
                    <IconContext.Provider
                        value={{ color: "White", size: "24px" }}
                    >
                        <FaUser className="inline-block" />
                    </IconContext.Provider>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center">
                <p className="text-base">{collabrator.user.name}</p>
                <p className="text-sm text-gray-700">
                    {collabrator.user.email}
                </p>
            </div>

            <p
                className={`ml-auto text-white ${
                    collabrator.editPermissions
                        ? "bg-[#4CAF50]"
                        : "bg-yellow-500"
                } rounded-full px-4 py-1 text-sm font-bold`}
            >
                {collabrator.editPermissions ? "Editor" : "Read-only"}
            </p>
        </div>
    );
}
