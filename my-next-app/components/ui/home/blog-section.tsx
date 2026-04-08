"use client"

import Link from "next/link"
import { ArrowRight, Clock, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { blogPosts } from "@/lib/data"

export function BlogSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Badge variant="secondary" className="mb-4">Insights & Stories</Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              From Our Blog
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Articles on leadership, career growth, and success stories from women around the world.
            </p>
          </div>
          <Button variant="outline" className="gap-2 shrink-0" asChild>
            <Link href="/blog">
              Read All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Blog Grid - All Square Images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="group hover:shadow-lg transition-all h-full overflow-hidden">
                {/* Square Image Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 relative">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-serif text-5xl text-primary/30">HK</span>
                  </div>
                  <Badge variant="secondary" className="absolute top-3 left-3 text-xs">
                    {post.category}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-serif font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 text-base">
                    {post.title}
                  </h3>
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
      </div>
    </section>
  )
}
