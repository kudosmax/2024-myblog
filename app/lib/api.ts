import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    category: string; // 이 줄이 있는지 확인해주세요
  };
  content: string;
}

export function getPostSlugs(): string[] {
  try {
    return fs.readdirSync(postsDirectory).filter((file) => {
      // .obsidian 폴더와 숨김 파일(.으로 시작하는 파일) 제외
      return !file.startsWith(".") && file.endsWith(".md");
    });
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null) // null 값 필터링
    .sort((post1, post2) =>
      post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
    );
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
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
        category: data.category || "Uncategorized",
      },
      content,
    };
  } catch (error) {
    console.error(`Error reading file ${fullPath}:`, error);
    return null;
  }
}

export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category.toLowerCase()
  );
}
