"use client"

import Link from "next/link"
import { ArrowRight, Clock, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { blogPosts } from "@/lib/data"

export function BlogSection() {
  return (
    <section className="py-10 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end md:gap-6">
          <div>
            <Badge variant="secondary" className="mb-3 md:mb-4">
              Insights & Stories
            </Badge>
            <h2 className="mb-2 font-serif text-2xl font-bold text-foreground md:text-4xl">
              From Our Blog
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground md:text-base">
              Articles on leadership, career growth, and success stories from women around the world.
            </p>
          </div>
          <Button variant="outline" className="w-fit shrink-0 gap-2" asChild>
            <Link href="/blog">
              Read All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="divide-y divide-border rounded-xl border border-border bg-card md:hidden">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="flex items-start gap-3 px-3 py-3 transition-colors hover:bg-muted/40"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                <span className="font-serif text-sm text-primary/50">HK</span>
              </div>
              <div className="min-w-0 flex-1">
                <Badge variant="secondary" className="mb-1 text-[10px]">
                  {post.category}
                </Badge>
                <h3 className="line-clamp-2 text-sm font-medium text-foreground">{post.title}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>

        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-accent/20">
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-serif text-5xl text-primary/30">HK</span>
                  </div>
                  <Badge variant="secondary" className="absolute left-3 top-3 text-xs">
                    {post.category}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="mb-3 line-clamp-2 font-serif text-base font-semibold text-foreground transition-colors group-hover:text-primary">
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
