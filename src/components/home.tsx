import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import BlogPostCard from "./BlogPostCard";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  categories: string[];
  image: string;
  featured?: boolean;
}

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Mock data for blog posts
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Getting Started with React and TypeScript",
      excerpt:
        "Learn how to set up a new project with React and TypeScript to build type-safe applications.",
      author: {
        name: "Jane Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      },
      date: "2023-06-15",
      categories: ["React", "TypeScript", "Frontend"],
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      featured: true,
    },
    {
      id: "2",
      title: "Building RESTful APIs with Node.js and Express",
      excerpt:
        "A comprehensive guide to creating robust backend services using Node.js and Express.",
      author: {
        name: "John Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      },
      date: "2023-06-10",
      categories: ["Node.js", "Backend", "API"],
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    },
    {
      id: "3",
      title: "CSS Grid vs Flexbox: When to Use Each",
      excerpt:
        "Understanding the differences between CSS Grid and Flexbox and knowing when to apply each one.",
      author: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
      date: "2023-06-05",
      categories: ["CSS", "Frontend", "Design"],
      image:
        "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
    },
    {
      id: "4",
      title: "Introduction to State Management with Redux",
      excerpt:
        "Learn how to manage application state effectively using Redux in your React applications.",
      author: {
        name: "Mike Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      },
      date: "2023-05-28",
      categories: ["React", "Redux", "State Management"],
      image:
        "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80",
    },
    {
      id: "5",
      title: "Optimizing Database Queries for Performance",
      excerpt:
        "Tips and techniques for writing efficient database queries that scale with your application.",
      author: {
        name: "Lisa Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      },
      date: "2023-05-20",
      categories: ["Database", "Performance", "SQL"],
      image:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
    },
    {
      id: "6",
      title: "Responsive Web Design Best Practices",
      excerpt:
        "Creating websites that look great on any device with modern responsive design techniques.",
      author: {
        name: "David Brown",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      },
      date: "2023-05-15",
      categories: ["CSS", "Design", "Frontend"],
      image:
        "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80",
    },
  ];

  // Extract unique categories from blog posts
  const categories = [
    "all",
    ...Array.from(new Set(blogPosts.flatMap((post) => post.categories))),
  ].sort();

  // Filter posts based on search query and active category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || post.categories.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  // Get featured post
  const featuredPost = blogPosts.find((post) => post.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold">
              Blog Platform
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {categories.slice(0, 5).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-sm font-medium ${activeCategory === category ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                className="w-[200px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Authentication */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/new-post">New Post</Link>
                </Button>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                    alt="User"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button 
                  size="sm" 
                  asChild
                  className="bg-[#800000] hover:bg-[#8B0000] text-white"
                >
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-sm px-3 py-1 rounded-full ${activeCategory === category ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="container px-4 py-8">
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
            <div className="grid md:grid-cols-2 gap-6 bg-card rounded-xl overflow-hidden border shadow-sm">
              <div className="h-64 md:h-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex gap-2 mb-2">
                    {featuredPost.categories.map((category) => (
                      <Badge 
                        key={category} 
                        variant="secondary"
                        className="bg-[#556B2F] hover:bg-[#6B8E23] text-white"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {featuredPost.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                      />
                      <AvatarFallback>
                        {featuredPost.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{featuredPost.author.name}</span>
                  </div>
                  <Button 
                    asChild
                    className="bg-[#800000] hover:bg-[#8B0000] text-white"
                  >
                    <Link to={`/post/${featuredPost.id}`}>Read More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Category Tabs (Desktop) */}
        <div className="hidden md:block mb-8">
          <Tabs
            defaultValue="all"
            value={activeCategory}
            onValueChange={setActiveCategory}
          >
            <TabsList className="w-full justify-start overflow-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Blog Posts */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Latest Posts</h2>
            {searchQuery && (
              <p className="text-muted-foreground">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "result" : "results"} for "
                {searchQuery}"
              </p>
            )}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  author={post.author}
                  date={post.date}
                  categories={post.categories}
                  image={post.image}
                />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                No posts found matching your criteria.
              </p>
            </Card>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background py-6">
        <div className="container px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2023 Blog Platform. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              to="/about"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
