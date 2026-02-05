import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn, sortItemsByDate, type sortOptions } from "@/lib/utils";
import { PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import AddComment from "./add-comment";
import CommentItem from "./comment-item";
import { Separator } from "@/components/ui/separator";
import useCommentsActions, { useGetComments } from "@/hooks/use-comments";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ArtworkCommentsProps {
    artworkId: number;
    refetchArtwork: () => void;
    userId: number;
    isUserArtist: boolean;
}

const ArtworkComments = ({ artworkId, refetchArtwork, userId, isUserArtist }: ArtworkCommentsProps) => {
    const {
        comments,
        commentsError,
        refetchComments,
    } = useGetComments(Number(artworkId));

    const [sort, setSort] = useState<sortOptions>({
        value: "latest",
        label: "Latest"
    });

    const [
        commentActions,
        replyActions
    ] = useCommentsActions();

    const [hoverButton, setHoverButton] = useState(false);
    const [isAddingComment, setIsAddingComment] = useState(false);

    useEffect(() => {
        if (commentActions.postCommentSuccess) {
            refetchComments();
            refetchArtwork();
            setIsAddingComment(false);
        }
    }, [
        commentActions.postComment,
        commentActions.postCommentSuccess,
        refetchComments
    ]);

    useEffect(() => {
        if (replyActions.postReplySuccess) {
            refetchComments();
            refetchArtwork();
        }
    }, [
        replyActions.postReply,
        replyActions.postReplySuccess,
        refetchComments
    ]);

    useEffect(() => {
        if (commentActions.isDeletingCommentSuccess) {
            refetchComments();
            refetchArtwork();
        }
    }, [
        commentActions.deleteComment,
        commentActions.isDeletingCommentSuccess,
        refetchComments
    ])

    useEffect(() => {
        if (replyActions.isDeletingReplySuccess) {
            refetchComments();
            refetchArtwork();
        }
    }, [
        replyActions.deleteReply,
        replyActions.isDeletingReplySuccess,
        refetchComments
    ])

    const sortedComments = sortItemsByDate({ items: comments, sortOptions: sort });

    return (
        <div>
            <div className="flex justify-between">
                <div className="flex gap-3 items-start">
                    <div>
                        <h2 className="font-semibold text-2xl">Comments</h2>
                        <span className="text-sm text-muted-foreground">{comments.length} comments</span>
                    </div>
                    <Select
                        value={sort.value ?? undefined}
                        onValueChange={(value: "latest" | "oldest") => setSort({ value, label: value === "latest" ? "Latest" : "Oldest" })}
                    >
                        <SelectTrigger>
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
                </div>
                <Dialog open={isAddingComment} onOpenChange={setIsAddingComment}>
                    <DialogTrigger asChild>
                        <Button
                            variant="ghost"
                            onMouseEnter={() => setHoverButton(true)}
                            onMouseLeave={() => setHoverButton(false)}
                            className="transition-colors duration-200 ease-in-out w-fit"
                        >
                            <span className={cn(
                                "-mr-3 opacity-30 transition-all duration-300",
                                hoverButton && "mr-1 opacity-100"
                            )}>{hoverButton && "Add a comment"}</span>
                            <PencilLine />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add a new Comment</DialogTitle>
                        </DialogHeader>
                        <AddComment
                            postComment={commentActions.postComment}
                            postCommentSuccess={commentActions.postCommentSuccess}
                            postCommentError={commentActions.postCommentError}
                            isPostingComment={commentActions.isPostingComment}
                            artworkId={artworkId}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                {commentsError && <div className="text-red-500">{commentsError}</div>}
                <ul className="max-h-110 overflow-y-auto outline-3 outline-secondary border-2 border-primary-foreground rounded-lg mt-2 py-2">
                    {sortedComments && sortedComments.map((comment, index) => (
                        <li key={comment.id}>
                            <CommentItem
                                deleteComment={commentActions.deleteComment}
                                isUserArtist={isUserArtist}
                                userId={userId}
                                artworkId={artworkId}
                                comment={comment}
                                replyActions={replyActions}
                            />
                            {index < comments.length - 1 && <Separator />}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ArtworkComments