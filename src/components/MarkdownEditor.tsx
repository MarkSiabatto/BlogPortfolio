import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Link,
  ImageIcon,
  Code,
  Eye,
  Edit,
  Save,
  X,
} from "lucide-react";

interface MarkdownEditorProps {
  initialContent?: string;
  onSave?: (content: string, title: string, categories: string[]) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

const MarkdownEditor = ({
  initialContent = "",
  onSave = () => {},
  onCancel = () => {},
  isEditing = false,
}: MarkdownEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("edit");

  const insertMarkdown = (markdownSyntax: string) => {
    const textarea = document.getElementById(
      "markdown-textarea",
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    let newText = "";
    switch (markdownSyntax) {
      case "bold":
        newText = `${beforeText}**${selectedText || "bold text"}**${afterText}`;
        break;
      case "italic":
        newText = `${beforeText}_${selectedText || "italic text"}_${afterText}`;
        break;
      case "h1":
        newText = `${beforeText}# ${selectedText || "Heading 1"}${afterText}`;
        break;
      case "h2":
        newText = `${beforeText}## ${selectedText || "Heading 2"}${afterText}`;
        break;
      case "h3":
        newText = `${beforeText}### ${selectedText || "Heading 3"}${afterText}`;
        break;
      case "list":
        newText = `${beforeText}\n- ${selectedText || "List item"}\n- Another item${afterText}`;
        break;
      case "ordered-list":
        newText = `${beforeText}\n1. ${selectedText || "List item"}\n2. Another item${afterText}`;
        break;
      case "quote":
        newText = `${beforeText}\n> ${selectedText || "Blockquote"}${afterText}`;
        break;
      case "link":
        newText = `${beforeText}[${selectedText || "Link text"}](url)${afterText}`;
        break;
      case "image":
        newText = `${beforeText}![${selectedText || "Alt text"}](image-url)${afterText}`;
        break;
      case "code":
        newText = `${beforeText}\n\`\`\`\n${selectedText || "code block"}\n\`\`\`${afterText}`;
        break;
      default:
        newText = content;
    }

    setContent(newText);
    setTimeout(() => {
      textarea.focus();
    }, 0);
  };

  const addCategory = () => {
    if (
      currentCategory.trim() &&
      !categories.includes(currentCategory.trim())
    ) {
      setCategories([...categories, currentCategory.trim()]);
      setCurrentCategory("");
    }
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category));
  };

  const handleSave = () => {
    onSave(content, title, categories);
  };

  // Simple markdown renderer for preview
  const renderMarkdown = (markdown: string) => {
    // This is a very basic renderer for preview purposes
    // In a real app, you would use a proper markdown library
    let html = markdown
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\_(.+?)\_/g, "<em>$1</em>")
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
      .replace(/\!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1">')
      .replace(/^\> (.+)$/gm, "<blockquote>$1</blockquote>")
      .replace(/^- (.+)$/gm, "<ul><li>$1</li></ul>")
      .replace(/^\d+\. (.+)$/gm, "<ol><li>$1</li></ol>")
      .replace(/\`\`\`([\s\S]+?)\`\`\`/g, "<pre><code>$1</code></pre>")
      .replace(/\n/g, "<br>");

    return html;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-background">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isEditing ? "Edit Post" : "Create New Post"}
        </CardTitle>
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-bold"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Edit size={16} /> Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye size={16} /> Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-4">
            <div className="flex flex-wrap gap-2 p-2 bg-muted rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown("bold")}
                title="Bold"
              >
                <Bold size={18} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown("italic")}
                title="Italic"
              >
                <Italic size={18} />
              </Button>
              <Separator orientation="vertical" className="h-8" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown("h1")}
                title="Heading 1"
              >
                <Heading1 size={18} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown("h2")}
                title="Heading 2"
              >
                <Heading2 size={18} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown("h3")}
                title="Heading 3"
              >
                <Heading3 size={18} />
              </Button>
              <Separator orientation="vertical" className="h-8" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown("list")}
                title="Bullet List"
              >
                <List size={18} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown("ordered-list")}
                title="Numbered List"
              >
                <ListOrdered size={18} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown("quote")}
                title="Quote"
              >
                <Quote size={18} />
              </Button>
              <Separator orientation="vertical" className="h-8" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown("link")}
                title="Link"
              >
                <Link size={18} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown("image")}
                title="Image"
              >
                <ImageIcon size={18} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown("code")}
                title="Code Block"
              >
                <Code size={18} />
              </Button>
            </div>

            <Textarea
              id="markdown-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content in markdown..."
              className="min-h-[400px] font-mono"
            />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Categories</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {category}
                    <button
                      onClick={() => removeCategory(category)}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Add category"
                  value={currentCategory}
                  onChange={(e) => setCurrentCategory(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCategory()}
                />
                <Button onClick={addCategory} variant="outline" size="sm">
                  Add
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="min-h-[400px]">
            <ScrollArea className="h-[500px] rounded-md border p-4">
              <div className="prose max-w-none">
                <h1 className="text-2xl font-bold mb-4">
                  {title || "Post Title"}
                </h1>
                <div
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                  className="prose"
                />
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save size={16} />
          {isEditing ? "Update" : "Publish"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MarkdownEditor;
