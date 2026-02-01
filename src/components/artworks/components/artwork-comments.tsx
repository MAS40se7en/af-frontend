import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import AddComment from "./add-comment";
import CommentItem from "./comment-item";
import { Separator } from "@/components/ui/separator";
import useCommentsActions, { useGetComments } from "@/hooks/use-comments";

interface ArtworkCommentsProps {
    artworkId: number;
    refetchArtwork: () => void
}

const ArtworkComments = ({ artworkId, refetchArtwork }: ArtworkCommentsProps) => {
    const {
        comments,
        commentsError,
        refetchComments,
    } = useGetComments(Number(artworkId));
    const {
        postComment,
        isPostingComment,
        postCommentError,
        postCommentSuccess
    } = useCommentsActions();
    const [hoverButton, setHoverButton] = useState(false);
    const [isAddingComment, setIsAddingComment] = useState(false);

    useEffect(() => {
        if (postCommentSuccess) {
            refetchComments();
            refetchArtwork();
            setIsAddingComment(false);
        }
    }, [
        postComment,
        postCommentSuccess,
        refetchComments
    ]);

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h2 className="font-semibold text-2xl">Comments</h2>
                    <span className="text-sm text-muted-foreground">{comments.length} comments</span>
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
                            postComment={postComment}
                            postCommentSuccess={postCommentSuccess}
                            postCommentError={postCommentError}
                            isPostingComment={isPostingComment}
                            artworkId={artworkId} />
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                {commentsError && <div className="text-red-500">{commentsError}</div>}
                <ul className="max-h-110 overflow-y-auto outline-3 outline-secondary border-2 border-primary-foreground rounded-lg mt-2 py-2">
                    {comments.map((comment, index) => (
                        <li key={comment.id}>
                            <CommentItem comment={comment} />
                            {index < comments.length - 1 && <Separator />}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ArtworkComments