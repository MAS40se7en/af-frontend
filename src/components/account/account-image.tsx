import { PencilLine } from "lucide-react";
import { GeneratedAvatar } from "../generated-avatar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { useState } from "react";
import EditImage from "./edit-image";

interface Props {
    image: string;
    name: string;
}

function AccountImage({ image, name }: Props) {
    const [open, setOpen] = useState(false);
    return (
        <div className="size-56 border rounded-full flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="z-10 absolute inset-0 flex items-center justify-center">
                {image ?
                    (<Avatar className='size-56'>
                        <AvatarImage
                            src={'/AF.png'}
                        />
                    </Avatar>)
                    : <GeneratedAvatar
                        seed={name || "avatar"}
                        variant="initials"
                        className="size-56"
                    />}
            </div>


            <div className="flex items-center justify-center pb-4 z-50 bottom-0 right-0 absolute w-full">
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger className="rounded-full transition-opacity duration-300 transform z-50 opacity-0 group-hover:opacity-100 w-fit text-center flex items-center justify-center bg-muted">
                        <PencilLine className="mr-2 size-4" />
                        edit
                    </DrawerTrigger>
                    <DrawerContent className="min-h-120 px-5">
                        <div className="flex flex-col items-start justify-center w-full lg:w-220 mx-auto">
                            <DrawerTitle className="text-2xl">
                                Edit Profile Image
                            </DrawerTitle>

                            <EditImage image={image} />
                        </div>


                    </DrawerContent>
                </Drawer>
            </div>

        </div>
    )
}

export default AccountImage