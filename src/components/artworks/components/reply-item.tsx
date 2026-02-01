import { GeneratedAvatar } from "@/components/generated-avatar"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import type { Reply } from "@/hooks/use-comments"
import { formatDate } from "@/lib/utils"

interface ReplyItemProps {
    reply: Reply
}

const ReplyItem = ({ reply }: ReplyItemProps) => {
    return (
        <div className="flex flex-col px-10 py-2">
            <div className="flex items-center gap-2 mb-3">
                {reply.user.imageUrl ?
                    <Avatar className='size-6'>
                        <AvatarImage
                            src={reply.user.imageUrl}
                        />
                    </Avatar>
                    : <GeneratedAvatar
                        seed={reply.user.fullName || "avatar"}
                        variant="initials"
                        className="size-6"
                    />}
                <div className="flex gap-2">
                    <h2 className="text-sm">{reply.user.fullName}</h2>
                    <span className="text-[10px] text-muted-foreground">{formatDate(new Date(reply.createdAt))}</span>
                </div>
            </div>
            <div className="pl-8">
                <span className="sm">{reply.text}</span>
            </div>
        </div>
    )
}

export default ReplyItem