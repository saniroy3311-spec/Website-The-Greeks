import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/markdown";

export const revalidate = 3600; // revalidate every hour

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-cream pt-32 pb-20 relative z-10 bg-graph-pattern">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-brand-gold hover:text-brand-navy mb-8 transition-colors"
          >
            <ArrowLeft size={12} />
            Back to Home
          </Link>

          {/* Heading */}
          <div className="border-b border-brand-border pb-10 mb-16">
            <h1 className="font-serif text-5xl md:text-6xl text-brand-charcoal font-bold tracking-tight mb-4">
              Thinking out loud.
            </h1>
            <p className="font-sans text-base md:text-lg text-brand-muted leading-relaxed max-w-2xl">
              Analysis, guides, and updates on option mechanics, Pine Script v5 development, and automated VPS bot execution.
            </p>
          </div>

          {/* Blog Listing */}
          <div className="space-y-12">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border-b border-brand-border/40 pb-12 last:border-b-0"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 bg-brand-gold/10 text-brand-gold rounded text-[10px] font-mono uppercase font-bold tracking-wider">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-brand-muted font-mono">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-brand-muted font-mono">
                    <BookOpen size={12} />
                    {post.readTime}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`} className="group block mb-4">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-charcoal group-hover:text-brand-navy transition-colors duration-200 leading-tight">
                    {post.title}
                  </h2>
                </Link>

                <p className="font-sans text-sm text-brand-muted leading-relaxed mb-6 max-w-3xl line-clamp-3">
                  {post.summary}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold hover:text-brand-navy transition-colors duration-200"
                >
                  Read full article →
                </Link>
              </article>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
