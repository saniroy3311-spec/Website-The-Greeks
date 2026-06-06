import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  summary: string;
  content: string;
}

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    
    // Convert markdown content to HTML string
    // In marked, marked.parse returns a string or Promise<string>. Since it can be async, we await it.
    const htmlContent = await marked.parse(content);
    
    return {
      slug: realSlug,
      title: data.title || "",
      date: data.date || "",
      category: data.category || "",
      readTime: data.readTime || "",
      summary: data.summary || "",
      content: htmlContent,
    } as Post;
  } catch (error) {
    console.error(`Error reading post by slug ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const postsPromises = slugs.map((slug) => getPostBySlug(slug));
  const posts = await Promise.all(postsPromises);
  
  // Filter out any null posts
  const validPosts = posts.filter((post): post is Post => post !== null);
  
  // Sort posts by date (using a simple dictionary comparison or parse date)
  return validPosts.sort((post1, post2) => {
    // Basic date parsing (e.g., "June 2025" vs "May 2025" -> we'll sort based on our defined array order)
    const monthOrder: { [key: string]: number } = {
      "June 2025": 3,
      "May 2025": 2,
      "April 2025": 1
    };
    const order1 = monthOrder[post1.date] || 0;
    const order2 = monthOrder[post2.date] || 0;
    return order2 - order1; // newest first
  });
}
