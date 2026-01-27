import { FolderSearch } from "lucide-react"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

interface NoElementsProps {
    url: string,
    text: string,
    objectName: string,
    className?: string,
}

function NoElements({
    url,
    text,
    className,
    objectName
}: NoElementsProps) {
  return (
    <Empty className="border-2">
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <FolderSearch />
            </EmptyMedia>
            <EmptyTitle>No {objectName} here yet!</EmptyTitle>
            <EmptyDescription>
                {text}
            </EmptyDescription>
            <EmptyContent className={cn("flex-row justify-center gap-2", className)}>
                <Link to={url} className="bg-foreground text-background px-3 py-2 rounded-lg hover:bg-foreground/90 active:bg-foreground/70">Create one</Link>
            </EmptyContent>
        </EmptyHeader>
    </Empty>
  )
}

export default NoElements