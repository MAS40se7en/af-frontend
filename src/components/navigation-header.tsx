import { NavLink, useLocation, useParams } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import AccountMenu from "./account-menu"
import { Menu } from "lucide-react"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTrigger } from "./ui/drawer"
import { useEffect, useState } from "react"
import NavLinks from "./nav-links"

const NavigationHeader = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setOpenDrawer(false);
    }, [location]);

    return (
        <div className="w-full sticky top-0 right-0 left-0 bg-background dark:bg-black px-4 border-b-2">
            <div className="h-12 flex items-center justify-between lg:w-3/5 mx-auto">
                <div className="flex items-center gap-7">
                    <Drawer open={openDrawer} onOpenChange={setOpenDrawer} direction="right">
                        <DrawerTrigger asChild className="md:hidden">
                            <Menu />
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerDescription>
                                    <NavLinks />
                                </DrawerDescription>
                            </DrawerHeader>
                        </DrawerContent>
                    </Drawer>
                    <div className="flex items-center gap-2">
                        <img src="/AFbigHeader.png" alt="logo" className="w-[2rem] rounded-md" />
                        <span className="font-semibold">ArtFocused</span>
                    </div>

                    <div className="hidden md:block">
                        <NavLinks />
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <AccountMenu />
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}

export default NavigationHeader