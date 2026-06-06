import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug, getPostSlugs } from "@/lib/markdown";

interface PostParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
}

export default async function BlogPostPage({ params }: PostParams) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-cream pt-32 pb-20 relative z-10 bg-graph-pattern">
        <article className="max-w-3xl mx-auto px-6 md:px-12">
          
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-brand-gold hover:text-brand-navy mb-8 transition-colors"
          >
            <ArrowLeft size={12} />
            Back to Articles
          </Link>

          {/* Post Header */}
          <div className="border-b border-brand-border pb-8 mb-10">
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-brand-muted uppercase tracking-wider mb-4">
              <span className="px-2.5 py-0.5 bg-brand-navy text-brand-cream rounded font-bold">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={12} className="text-brand-gold" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen size={12} className="text-brand-gold" />
                {post.readTime}
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-[44px] text-brand-charcoal font-bold tracking-tight leading-tight">
              {post.title}
            </h1>
          </div>

          {/* Compiled HTML Content */}
          <div
            className="blog-article-content font-sans text-brand-charcoal leading-relaxed text-base"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Post Footer */}
          <div className="border-t border-brand-border pt-12 mt-16 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-serif text-sm font-bold text-brand-charcoal">The Greeks</span>
              <span className="font-sans text-[10px] text-brand-muted uppercase tracking-widest mt-0.5">
                Precision built systems
              </span>
            </div>
            <Link
              href="/#book-a-call"
              className="px-6 py-2.5 bg-brand-gold text-brand-cream rounded-full hover:bg-brand-gold/90 transition-all font-sans text-xs uppercase tracking-widest font-semibold"
            >
              Start Your Build
            </Link>
          </div>

        </article>
      </main>
      <Footer />
    </>
  );
}
