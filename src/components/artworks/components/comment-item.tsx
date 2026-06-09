import { GeneratedAvatar } from "@/components/generated-avatar"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Comment, Reply as ReplyType, ReplyActions } from "@/hooks/use-comments"
import { cn, formatDate, sortItemsByDate, type sortOptions } from "@/lib/utils"
import { ChevronRight, EllipsisVertical, Reply } from "lucide-react"
import { useState } from "react"
import ReplyItem from "./reply-item"
import ReplyToComment from "./reply-to-comment"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface CommentProps {
    comment: Comment;
    replyActions: ReplyActions;
    artworkId: number;
    userId: number;
    isUserArtist: boolean;
    deleteComment: (commentId: number) => void
}

const CommentItem = (
    { comment, replyActions, artworkId, userId, isUserArtist, deleteComment }: CommentProps
) => {
    const [replying, setReplying] = useState(!(replyActions.postReplySuccess && replyActions.lastRepliedCommentId === comment.id));
    const [showReplies, setShowReplies] = useState(replyActions.postReplySuccess && replyActions.lastRepliedCommentId === comment.id);

    const [sort, setSort] = useState<sortOptions>({
        value: "latest",
        label: "Latest"
    });

    const sortedReplies: ReplyType[] = sortItemsByDate({ items: comment.replies, sortOptions: sort }) as ReplyType[];

    return (
        <div className="flex flex-col transition-all duration-200">
            <div className="w-full min-h-15 flex items-start py-2 px-3 justify-between">
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-3">
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
                    <p className="px-5 mb-1">{comment.text}</p>
                    <div className="flex items-center w-full gap-1">
                        <Button
                            variant={"ghost"}
                            className="text-xs text-muted-foreground"
                            onClick={() => {
                                setShowReplies(prev => !prev);
                            }}
                        >
                            Show replies
                            <ChevronRight className={cn("size-5 -ml-3 opacity-0 transition-all", showReplies && "rotate-90 ml-0 opacity-100")} />
                        </Button>
                        <Select
                            value={sort.value ?? undefined}
                            onValueChange={(value: "latest" | "oldest") => setSort({ value, label: value === "latest" ? "Latest" : "Oldest" })}
                        >
                            <SelectTrigger
                                className={cn(
                                    "border-none text-xs bg-transparent dark:bg-transparent text-muted-foreground -ml-3 opacity-0 transition-all",
                                    showReplies && "ml-0 opacity-100",
                                    !showReplies && "hidden",
                                    !sortedReplies || sortedReplies.length === 0 && "hover:cursor-not-allowed"
                                )}
                                disabled={!showReplies || (!sortedReplies || sortedReplies.length === 0)}
                            >
                                <SelectValue placeholder="sort" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>sort by</SelectLabel>
                                    <SelectItem value="latest">Latest</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={() => setReplying(!replying)}
                            variant={"ghost"}
                            className=""
                        >
                            <Reply />
                        </Button>
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
                            {(comment.user.id === userId || isUserArtist) && (
                                <DropdownMenuItem className="px-0 py-1 transition-all">
                                    <Button
                                        variant={"ghost"}
                                        className="w-full text-start"
                                        onClick={() => deleteComment(comment.id)}
                                    >
                                        Remove
                                    </Button>
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
            <div className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-in-out overflow-y-scroll",
                showReplies || replying ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}>
                <div className="overflow-hidden">
                    {replyActions.isPostingReplyError && <div className="text-red-500 text-sm">{replyActions.postReplyError?.message}</div>}
                    {replying && <ReplyToComment
                        artworkId={artworkId}
                        commentId={comment.id}
                        postReply={replyActions.postReply}
                        isPostingReply={replyActions.isPostingReply}
                        isPostingReplyError={replyActions.isPostingReplyError}
                        postReplyError={replyActions.postReplyError}
                        postReplySuccess={replyActions.postReplySuccess}
                    />}
                    {sortedReplies && sortedReplies.length > 0 && showReplies && (
                        <div className="flex justify-end pb-2">
                            <ul className="flex flex-col border max-w-5/6 min-w-5/6 rounded-lg px-0">
                                {sortedReplies.map((reply, index) => (
                                    <>
                                        <ReplyItem key={reply.id} commentId={comment.id} artworkId={artworkId} userId={userId} isUserArtist={isUserArtist} reply={reply} deleteReply={replyActions.deleteReply} />
                                        {index !== sortedReplies.length - 1 && (
                                            <Separator />
                                        )}
                                    </>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default CommentItem