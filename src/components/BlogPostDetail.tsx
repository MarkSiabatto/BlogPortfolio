import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  Clock,
  Edit,
  MessageSquare,
  Share2,
  ThumbsUp,
  Trash2,
} from "lucide-react";

interface BlogPostDetailProps {
  post?: {
    id: string;
    title: string;
    content: string;
    featuredImage: string;
    publishedDate: string;
    readTime: string;
    author: {
      name: string;
      avatar: string;
    };
    categories: string[];
    likes: number;
    comments: number;
    isOwnPost?: boolean;
  };
}

const BlogPostDetail = ({ post }: BlogPostDetailProps) => {
  const [isLiked, setIsLiked] = useState(false);
  // Fix the undefined count reference
  const count = 0;

  // Default post data if none is provided
  const defaultPost = {
    id: "1",
    title: "Understanding React Hooks: A Comprehensive Guide",
    content: `
# Understanding React Hooks

React Hooks are a powerful feature introduced in React 16.8 that allow you to use state and other React features without writing a class component.

## Why Hooks?

Hooks solve several problems in React:

- Reusing stateful logic between components
- Splitting complex components into smaller functions
- Using React features without classes

## Basic Hooks

### useState

\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

### useEffect

\`\`\`jsx
useEffect(() => {
  document.title = \`You clicked ${count} times\`;
}, [count]);
\`\`\`

### useContext

\`\`\`jsx
const theme = useContext(ThemeContext);
\`\`\`

## Additional Hooks

- useReducer
- useCallback
- useMemo
- useRef
- useImperativeHandle
- useLayoutEffect
- useDebugValue

## Custom Hooks

You can create your own Hooks to extract component logic into reusable functions.

\`\`\`jsx
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    
    window.addEventListener('resize', updateSize);
    updateSize();
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  return size;
}
\`\`\`

## Conclusion

Hooks are a game-changer for React development, making your code more readable, maintainable, and testable.
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    publishedDate: "May 15, 2023",
    readTime: "8 min read",
    author: {
      name: "Jane Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
    categories: ["React", "JavaScript", "Web Development"],
    likes: 42,
    comments: 13,
    isOwnPost: true,
  };

  const displayPost = post || defaultPost;

  // Function to render markdown content (simplified version)
  const renderMarkdown = (content: string) => {
    // In a real implementation, you would use a library like marked or react-markdown
    // This is a simplified version for the UI scaffolding
    return (
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {content.split("\n").map((line, index) => {
          if (line.startsWith("# ")) {
            return (
              <h1 key={index} className="text-3xl font-bold mt-6 mb-4">
                {line.substring(2)}
              </h1>
            );
          } else if (line.startsWith("## ")) {
            return (
              <h2 key={index} className="text-2xl font-bold mt-5 mb-3">
                {line.substring(3)}
              </h2>
            );
          } else if (line.startsWith("### ")) {
            return (
              <h3 key={index} className="text-xl font-bold mt-4 mb-2">
                {line.substring(4)}
              </h3>
            );
          } else if (line.startsWith("```")) {
            return (
              <pre
                key={index}
                className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 overflow-x-auto"
              >
                <code>{line.substring(3)}</code>
              </pre>
            );
          } else if (line.startsWith("- ")) {
            return (
              <li key={index} className="ml-6">
                {line.substring(2)}
              </li>
            );
          } else if (line === "") {
            return <br key={index} />;
          } else {
            return (
              <p key={index} className="my-3">
                {line}
              </p>
            );
          }
        })}
      </div>
    );
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleEdit = () => {
    // Navigate to edit page or open edit modal
    console.log("Edit post:", displayPost.id);
  };

  const handleDelete = () => {
    // Show confirmation dialog and delete post
    console.log("Delete post:", displayPost.id);
  };

  const handleShare = () => {
    // Open share dialog or copy link to clipboard
    console.log("Share post:", displayPost.id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-background">
      {/* Featured Image */}
      <div className="w-full h-[400px] rounded-lg overflow-hidden mb-8">
        <img
          src={displayPost.featuredImage}
          alt={displayPost.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{displayPost.title}</h1>

        {/* Author and Meta Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={displayPost.author.avatar}
                alt={displayPost.author.name}
              />
              <AvatarFallback>
                {displayPost.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{displayPost.author.name}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-1 h-3 w-3" />
                <span>{displayPost.publishedDate}</span>
                <span className="mx-2">•</span>
                <Clock className="mr-1 h-3 w-3" />
                <span>{displayPost.readTime}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {displayPost.isOwnPost && (
              <>
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button variant="outline" size="sm" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {displayPost.categories.map((category, index) => (
            <Badge key={index} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Post Content */}
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          {renderMarkdown(displayPost.content)}
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* Post Actions */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={isLiked ? "text-primary" : ""}
            onClick={handleLike}
          >
            <ThumbsUp
              className={`h-5 w-5 mr-1 ${isLiked ? "fill-current" : ""}`}
            />
            {displayPost.likes + (isLiked ? 1 : 0)}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="h-5 w-5 mr-1" />
            {displayPost.comments}
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-1" /> Share
        </Button>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">
          Comments ({displayPost.comments})
        </h2>
        {/* CommentSection component would be rendered here */}
        <div className="bg-muted/30 p-6 rounded-lg">
          <p className="text-center text-muted-foreground">
            Comments section will be implemented separately
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
