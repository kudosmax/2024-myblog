import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import imgSize from "rehype-img-size";
import path from "path";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkRehype)
    .use(imgSize, { dir: "public" })
    .use(rehypeStringify)
    .process(markdown);

  // img 태그에 클래스 추가
  let html = result.toString();
  html = html.replace(/<img/g, '<img class="loading"');
  
  return html;
}
