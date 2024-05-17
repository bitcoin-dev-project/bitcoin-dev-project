import React from "react"
import Image from "next/image"
import FilterIcon from "../public/filter.svg"
import SidebarFilter from "./sidebar-filter"

const SearchInput = ({ filtersCount }: { filtersCount: number | null }) => {
    return (
        <div className="flex items-center justify-center w-full max-w-3xl pt-6 pr-[7px]">
            <div className="flex gap-4 items-center w-full">
                <input
                    type="text"
                    className={
                        "text-black border-[1.5px] bg-secondary-gray text-base rounded-md placeholder:font-rebond placeholder:font-light outline-gray-600 border-gray-500 px-4 placeholder:text-gray-500 h-12 w-full"
                    }
                    placeholder="Search for good first issues"
                />

                <section className="hidden md:block relative">
                    <Menu />
                    {filtersCount && filtersCount > 0 ? (
                        <section className="h-3.5 w-3.5 bg-black rounded-full text-white text-[10px] flex items-center justify-center absolute top-0 right-0 z-50 mt-[-6px] mr-[-6px]">
                            <p className="leading-[90%]">{filtersCount}</p>
                        </section>
                    ) : null}
                </section>
            </div>
        </div>
    )
}

export default SearchInput

export const Menu = () => {
    const [open, setOpen] = React.useState(false)
    const toggle = () => setOpen(!open)

    React.useEffect(() => {
        document.body.classList.toggle("overflow-hidden", open)
    }, [open])

    return (
        <div className="flex h-fit overflow-hidden">
            <button
                className="cursor-pointer w-fit border border-gray-400 bg-gray-100 p-3 rounded-lg relative z-40"
                onClick={toggle}
            >
                <Image src={FilterIcon} alt="filter icon" className="h-5 w-5" />
            </button>
            {open ? (
                <div className="w-full">
                    <div className="w-full bg-white h-full min-h-[calc(100vh-78px)] fixed origin-top-right top-[78px] right-0 opacity-100 z-40 p-4  transition-opacity delay-500 duration-200 ease-in-out overflow-hidden">
                        <div className="flex flex-col gap-6">
                            <SidebarFilter toggle={() => setOpen(!open)} />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
