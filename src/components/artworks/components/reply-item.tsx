import { GeneratedAvatar } from "@/components/generated-avatar"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Reply } from "@/hooks/use-comments"
import { formatDate } from "@/lib/utils"
import { EllipsisVertical } from "lucide-react";

interface ReplyItemProps {
    reply: Reply;
    userId: number;
    artworkId: number;
    commentId: number;
    isUserArtist: boolean;
    deleteReply: ({ commentId, replyId, artworkId }: { commentId: number, replyId: number, artworkId: number }) => void
}

const ReplyItem = ({ reply, userId, isUserArtist, deleteReply, commentId, artworkId }: ReplyItemProps) => {
    return (
        <div className="flex flex-col px-5 py-3">
            <div className="flex justify-between">
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
                <div className="flex flex-col justify-between items-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <EllipsisVertical className="size-8 hover:bg-muted p-2 rounded-full" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="py-1">
                            <DropdownMenuItem className="px-0 py-1 transition-all">
                                <Button variant={"ghost"} className="w-full text-start">Report</Button>
                            </DropdownMenuItem>
                            {(reply.user.id === userId || isUserArtist) && (
                                <DropdownMenuItem className="px-0 py-1 transition-all">
                                    <Button
                                        variant={"ghost"}
                                        className="w-full text-start"
                                        onClick={() => deleteReply({replyId: reply.id, commentId, artworkId})}
                                    >
                                        Remove
                                    </Button>
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
            <div className="pl-8">
                <span className="sm">{reply.text}</span>
            </div>
        </div>
    )
}

export default ReplyItem