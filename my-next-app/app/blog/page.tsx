"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Clock, User, ArrowRight } from "lucide-react"
import { TopBar } from "@/components/layout/top-bar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const blogPosts = [
  {
    id: "1",
    title: "10 Tips for Writing a Winning Scholarship Essay",
    excerpt: "Master the art of scholarship essay writing with these proven strategies that have helped thousands of women secure funding for their education. Learn how to tell your story compellingly.",
    category: "Application Tips",
    author: "Dr. Sarah Chen",
    date: "2026-03-28",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: "2",
    title: "Breaking Barriers: Women in STEM Leadership",
    excerpt: "Inspiring stories of women who have risen to leadership positions in science, technology, engineering, and mathematics. Their journeys offer valuable lessons for aspiring leaders.",
    category: "Leadership",
    author: "Maya Rodriguez",
    date: "2026-03-25",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "3",
    title: "How to Build a Strong Professional Network",
    excerpt: "Networking strategies specifically designed for women navigating professional spaces and building meaningful connections that advance careers.",
    category: "Career Growth",
    author: "Amina Okonkwo",
    date: "2026-03-22",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "From Application to Acceptance: A Fellowship Journey",
    excerpt: "A first-hand account of navigating the fellowship application process and tips for success from a recent fellow.",
    category: "Success Stories",
    author: "Lisa Park",
    date: "2026-03-18",
    readTime: "7 min read",
  },
  {
    id: "5",
    title: "Negotiating Your Worth: Salary Tips for Women",
    excerpt: "Practical strategies for negotiating compensation packages and advocating for yourself in the workplace.",
    category: "Career Growth",
    author: "Dr. Jennifer Walsh",
    date: "2026-03-15",
    readTime: "6 min read",
  },
  {
    id: "6",
    title: "Global Peacebuilding: Women Leading Change",
    excerpt: "How women around the world are driving peace initiatives and creating sustainable change in their communities.",
    category: "Leadership",
    author: "Fatima Al-Hassan",
    date: "2026-03-12",
    readTime: "9 min read",
  },
  {
    id: "7",
    title: "The Ultimate Guide to PhD Applications",
    excerpt: "Everything you need to know about applying to doctoral programs, from choosing advisors to writing proposals.",
    category: "Application Tips",
    author: "Prof. Maria Santos",
    date: "2026-03-10",
    readTime: "12 min read",
  },
  {
    id: "8",
    title: "How I Won the Fulbright Scholarship",
    excerpt: "An inspiring success story from a Fulbright scholar sharing her journey and key strategies for application success.",
    category: "Success Stories",
    author: "Grace Kimani",
    date: "2026-03-08",
    readTime: "8 min read",
  },
]

const categories = ["All", "Application Tips", "Leadership", "Career Growth", "Success Stories"]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || post.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Badge variant="secondary" className="mb-4">Insights & Stories</Badge>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Blog
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Articles on leadership, career growth, application tips, and inspiring success stories from women around the world.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold mb-6">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`}>
                    <Card className="group hover:shadow-lg transition-all h-full overflow-hidden">
                      <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="font-serif text-6xl text-primary/20">WG</span>
                      </div>
                      <CardContent className="p-6">
                        <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                        <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <h2 className="font-serif text-2xl font-bold mb-6">
              {activeCategory === "All" ? "All Articles" : activeCategory}
            </h2>
            {regularPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`}>
                    <Card className="group hover:shadow-md transition-all h-full">
                      <div className="h-32 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <span className="font-serif text-4xl text-primary/20">WG</span>
                      </div>
                      <CardContent className="p-5">
                        <Badge variant="secondary" className="mb-3 text-xs">{post.category}</Badge>
                        <h3 className="font-serif font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter.</p>
              </div>
            )}
          </div>

          {/* Load More */}
          {regularPosts.length > 0 && (
            <div className="flex justify-center mt-12">
              <Button variant="outline" size="lg" className="gap-2">
                Load More Articles
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
