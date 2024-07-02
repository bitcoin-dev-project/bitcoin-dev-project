import { links } from "@/content/data"
import Link from "next/link"
import Drawer from "./drawer"
import { NavbarDropDown } from "./navbar-dropdown"

export default function NavBar() {
    return (
        <nav className="justify-center border-b-2 border-b-orange flex w-full m-auto sticky top-0 bg-white dark:bg-black z-50">
            <div className="w-full flex flex-col max-w-7xl">
                <div className="flex items-center justify-between p-6">
                    <Link href="/">
                        <h1 className="text-2xl md:text-xl font-bold">
                            The&nbsp;
                            <span className="text-orange">Bitcoin</span>
                            &nbsp;Dev Project
                        </h1>
                    </Link>
                    <Drawer />
                    <div className="md:hidden flex items-center gap-x-[24px] text-base">
                        <NavbarDropDown menuItem="Learn" isMobile={false} />
                        <NavbarDropDown
                            menuItem="Contribute"
                            isMobile={false}
                        />
                        {links.map((link) => (
                            <Link
                                key={link.text}
                                href={link.linkTo}
                                data-umami-event={`nav-${link.text}-clicked`}
                            >
                                {link.text}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    )
}
