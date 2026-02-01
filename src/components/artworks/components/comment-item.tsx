import { GeneratedAvatar } from "@/components/generated-avatar"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Comment } from "@/hooks/use-comments"
import { formatDate } from "@/lib/utils"
import { EllipsisVertical } from "lucide-react"

interface CommentProps {
    comment: Comment
}

const CommentItem = (
    { comment }: CommentProps
) => {
    return (
        <div className="w-full min-h-15 flex items-start py-2 px-3 justify-between">
            <div className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-2">
                    {comment.user.imageUrl ?
                    <Avatar className='size-9'>
                        <AvatarImage
                            src={comment.user.imageUrl}
                        />
                    </Avatar>
                    : <GeneratedAvatar
                        seed={comment.user.fullName || "avatar"}
                        variant="initials"
                        className="size-9"
                    />}
                <div>
                    <h2>{comment.user.fullName}</h2>
                    <span className="text-xs text-muted-foreground">{formatDate(new Date(comment.createdAt))}</span>
                </div>
                </div>
                <p className="px-5">{comment.text}</p>
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <EllipsisVertical className="size-8 hover:bg-muted p-2 rounded-full" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="py-1">
                        <DropdownMenuItem className="px-0 py-1 transition-all">
                            <Button variant={"ghost"} className="w-full text-start">Report</Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-0 py-1 transition-all">
                            <Button variant={"ghost"} className="w-full text-start">Remove</Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default CommentItem