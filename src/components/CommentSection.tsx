import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MoreVertical, Reply, Edit, Trash2, Send } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  replies: Comment[];
}

interface CommentSectionProps {
  postId?: string;
  comments?: Comment[];
  currentUser?: {
    id: string;
    name: string;
    avatar: string;
  };
  isAuthenticated?: boolean;
}

const CommentSection = ({
  postId = "1",
  comments = [
    {
      id: "1",
      author: {
        id: "101",
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      },
      content:
        "This is a great article! I learned a lot from your insights on this topic.",
      timestamp: "2023-06-15T14:30:00Z",
      replies: [
        {
          id: "3",
          author: {
            id: "103",
            name: "Alex Johnson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
          },
          content:
            "I agree with Jane. The examples you provided were very helpful.",
          timestamp: "2023-06-15T15:45:00Z",
          replies: [],
        },
      ],
    },
    {
      id: "2",
      author: {
        id: "102",
        name: "Michael Brown",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      },
      content:
        "Have you considered exploring the alternative approach mentioned in recent studies? I think it could add another dimension to your analysis.",
      timestamp: "2023-06-16T09:15:00Z",
      replies: [],
    },
  ],
  currentUser = {
    id: "101",
    name: "Jane Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  },
  isAuthenticated = true,
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleCommentSubmit = () => {
    // Placeholder for comment submission logic
    console.log("Submitting comment:", newComment);
    setNewComment("");
  };

  const handleReplySubmit = (commentId: string) => {
    // Placeholder for reply submission logic
    console.log("Submitting reply to comment", commentId, ":", replyContent);
    setReplyingTo(null);
    setReplyContent("");
  };

  const handleEditSubmit = (commentId: string) => {
    // Placeholder for edit submission logic
    console.log("Editing comment", commentId, ":", editContent);
    setEditingComment(null);
    setEditContent("");
  };

  const handleDeleteComment = (commentId: string) => {
    // Placeholder for delete logic
    console.log("Deleting comment:", commentId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderComment = (comment: Comment, isReply = false) => {
    const isCommentOwner = currentUser?.id === comment.author.id;
    const isEditing = editingComment === comment.id;

    return (
      <div key={comment.id} className={`mb-4 ${isReply ? "ml-12" : ""}`}>
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={comment.author.avatar}
              alt={comment.author.name}
            />
            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">{comment.author.name}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  {formatDate(comment.timestamp)}
                </span>
              </div>

              {isCommentOwner && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingComment(comment.id);
                        setEditContent(comment.content);
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {isEditing ? (
              <div className="mt-2">
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingComment(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleEditSubmit(comment.id)}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm mt-1">{comment.content}</p>

                {isAuthenticated && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs mt-1 h-7 px-2"
                    onClick={() => {
                      setReplyingTo(comment.id);
                      setReplyContent("");
                    }}
                  >
                    <Reply className="mr-1 h-3 w-3" />
                    Reply
                  </Button>
                )}
              </>
            )}

            {replyingTo === comment.id && (
              <div className="mt-2">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReplyingTo(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleReplySubmit(comment.id)}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {comment.replies.map((reply) => renderComment(reply, true))}
      </div>
    );
  };

  return (
    <div className="bg-background w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Comments ({comments.length})
      </h2>

      {isAuthenticated ? (
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end mt-2">
                  <Button
                    onClick={handleCommentSubmit}
                    disabled={!newComment.trim()}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-6 p-4 text-center">
          <p>Please sign in to leave a comment.</p>
          <Button className="mt-2">Sign In</Button>
        </Card>
      )}

      {comments.length > 0 ? (
        <div>{comments.map((comment) => renderComment(comment))}</div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
