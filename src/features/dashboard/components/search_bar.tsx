import React from "react";

export default function SearchBar() {
    return (
        <form className="w-1/3">
            <div className="relative w-full">
                <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 outline-none hover:outline-none active:outline-none w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg  border border-gray-300 focus:ring-yellow-400 focus:border-yellow-400"
                    placeholder="Search your spreadsheets"
                    required
                />
                <button
                    type="submit"
                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-yellow-400 rounded-e-lg border border-yellow-400 hover:bg-yellow-500 focus:ring-1 focus:outline-none focus:ring-yellow-300"
                >
                    <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>
        </form>
    );
}
