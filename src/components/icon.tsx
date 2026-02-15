import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface IconProps {
    className?: string;
}

const Icon = ({ className }: IconProps) => {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <img src="/AFbigHeader.png" alt="logo" className="w-[2rem] rounded-md" />
            <Link to="/" type="" className="font-semibold">ArtFocused</Link>
        </div>
    )
}

export default Icon