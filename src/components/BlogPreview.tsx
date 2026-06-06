import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getAllPosts } from "@/lib/markdown";

export default async function BlogPreview() {
  const posts = await getAllPosts();

  return (
    <section id="blog-preview" className="py-24 bg-brand-cream border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">
              Publications
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-charcoal font-bold tracking-tight mt-2">
              Thinking out loud.
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold hover:text-brand-navy transition-colors duration-200"
          >
            Read All Articles
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-brand-parchment/30 border border-brand-border rounded-xl p-8 flex flex-col justify-between hover:border-brand-gold/50 hover:shadow-md transition-all duration-300 group"
            >
              <div>
                {/* Category Pill and Read Time Row */}
                <div className="flex justify-between items-center mb-6">
                  <span className="px-2.5 py-1 bg-brand-cream border border-brand-gold/20 rounded text-[9px] font-mono uppercase tracking-wider text-brand-gold font-bold">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-brand-muted font-mono">
                    <BookOpen size={10} className="text-brand-navy" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-brand-charcoal mb-4 group-hover:text-brand-navy transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="font-sans text-xs text-brand-muted leading-relaxed mb-6 line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brand-gold uppercase group-hover:text-brand-navy transition-colors duration-200 pt-4 border-t border-brand-border/40">
                Read Article
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
