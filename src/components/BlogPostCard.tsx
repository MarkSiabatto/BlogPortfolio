import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
}

interface Author {
  id: string;
  name: string;
  avatar?: string;
}

interface BlogPostCardProps {
  id: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  publishedAt: Date;
  readTime?: string;
  commentCount?: number;
  categories?: Category[];
  author: Author;
  onClick?: () => void;
}

const BlogPostCard = ({
  id,
  title = "Blog Post Title",
  excerpt = "This is a short excerpt from the blog post that gives readers a preview of the content.",
  featuredImage = "https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&q=80",
  publishedAt = new Date(),
  readTime = "5 min read",
  commentCount = 0,
  categories = [
    { id: "1", name: "Technology" },
    { id: "2", name: "Web Development" },
  ],
  author = {
    id: "1",
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  onClick = () => {},
}: BlogPostCardProps) => {
  const formattedDate = publishedAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="overflow-hidden flex flex-col h-full bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={featuredImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <CardHeader className="pb-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {categories?.map((category) => (
            <Badge key={category.id} variant="secondary" className="text-xs">
              {category.name}
            </Badge>
          ))}
        </div>
        <h3
          className="text-xl font-bold line-clamp-2 hover:text-primary cursor-pointer"
          onClick={onClick}
        >
          {title}
        </h3>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {excerpt}
        </p>
      </CardContent>

      <CardFooter className="pt-2 border-t flex flex-col gap-2">
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{readTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            <span>{commentCount} comments</span>
          </div>
        </div>

        <div className="flex items-center justify-between w-full mt-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{author.name}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClick}
            className="text-xs"
          >
            Read more
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
