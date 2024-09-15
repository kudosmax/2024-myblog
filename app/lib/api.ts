import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    category: string;
  };
  content: string;
}

export function getPostSlugs(): string[] {
  try {
    return fs.readdirSync(postsDirectory);
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) =>
      post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
    );
  return posts;
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      frontmatter: {
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString().split("T")[0],
        category: data.category || "Uncategorized", // 카테고리 추가
      },
      content,
    };
  } catch (error) {
    console.error(`Error reading file ${fullPath}:`, error);
    return {
      slug: realSlug,
      frontmatter: {
        title: "Error",
        date: new Date().toISOString(),
        category: "Error",
      },
      content: "There was an error loading this post.",
    };
  }
}

export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category.toLowerCase()
  );
}