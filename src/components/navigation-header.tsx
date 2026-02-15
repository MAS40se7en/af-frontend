import { useLocation } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import AccountMenu from "./account-menu"
import { Menu } from "lucide-react"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTrigger } from "./ui/drawer"
import { useEffect, useState } from "react"
import NavLinks from "./nav-links"
import Icon from "./icon"

const NavigationHeader = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setOpenDrawer(false);
    }, [location]);

    return (
        <div className="w-full sticky top-0 right-0 left-0 bg-background/80 dark:bg-black/80 px-4 border-b-2 z-50 backdrop-blur-sm">
            <div className="h-12 flex items-center justify-between lg:w-3/5 mx-auto">
                <div className="flex items-center gap-7">
                    <Drawer open={openDrawer} onOpenChange={setOpenDrawer} direction="right">
                        <DrawerTrigger asChild className="md:hidden">
                            <Menu className="hover:cursor-pointer" />
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerDescription>
                                    <NavLinks />
                                </DrawerDescription>
                            </DrawerHeader>
                        </DrawerContent>
                    </Drawer>
                    <Icon />

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