import Logo from "../../components/logo";
import SearchBar from "./components/search_bar";
import ProfileComponent from "../sheet/components/profile_component";

export default function DashboardTopBar({
    setquery,
    submitsearch,
}: {
    setquery: (query: string) => void;
    submitsearch: () => void;
}) {
    return (
        <div className="flex justify-between items-center w-full h-16 bg-white shadow-md">
            <Logo />
            <SearchBar setquery={setquery} submitsearch={submitsearch} />
            <ProfileComponent atEnd={false} />
        </div>
    );
}
