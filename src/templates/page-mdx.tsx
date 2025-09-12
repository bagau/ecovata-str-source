import React from "react";
import { graphql } from "gatsby";
import type { HeadFC } from "gatsby";
import Layout from "../components/Layout";
import { MDXProvider } from "@mdx-js/react";
import LocalGallery from "../components/LocalGallery";

const components = {
  LocalGallery,
};

interface PageMDXProps {
  data: {
    mdx: {
      body: string;
      frontmatter: {
        title: string;
        date?: string;
        slug?: string;
      };
    };
  };
  children: React.ReactNode;
}

const PageMDX: React.FC<PageMDXProps> = ({ data, children }) => {
  const { frontmatter } = data.mdx;
  const { body } = data.mdx;

  // Обработка MDX контента аналогично blog-post-mdx.tsx
  const renderBodyAsText = () => {
    let processedBody = body;

    // Удаляем импорты (они уже доступны через components)
    processedBody = processedBody.replace(/import.*from.*["\'];?\n?/g, "");

    // Обрабатываем LocalGallery компоненты
    processedBody = processedBody.replace(
      /<LocalGallery\s+([^>]*)\s*\/?>(?:<\/LocalGallery>)?/g,
      (match, attrs) => {
        const imageMatch = attrs.match(/images=\{?\[([^\]]+)\]\}?/);
        if (imageMatch) {
          const images = imageMatch[1]
            .split(",")
            .map((img: string) => img.trim().replace(/['"]/g, ""));
          return `<div style="margin: 1rem 0;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
              ${images
                .map(
                  (img: string) =>
                    `<img src="${img}" style="width: 100%; border-radius: 4px;" alt="Фото" />`
                )
                .join("")}
            </div>
          </div>`;
        }
        return match;
      }
    );

    // Стандартная markdown обработка с поддержкой таблиц
    processedBody = processedBody
      .replace(
        /^#\s+(.*)$/gm,
        '<h1 style="color: #2c3e50; margin: 1.5rem 0 1rem 0;">$1</h1>'
      )
      .replace(
        /^##\s+(.*)$/gm,
        '<h2 style="color: #2c3e50; margin: 1.2rem 0 0.8rem 0;">$1</h2>'
      )
      .replace(
        /^###\s+(.*)$/gm,
        '<h3 style="color: #2c3e50; margin: 1rem 0 0.6rem 0;">$1</h3>'
      )
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(
        /!\[(.*?)\]\(([^)]+)\)/g,
        '<img alt="$1" src="$2" style="max-width: 100%; height: auto; border-radius: 4px; margin: 1rem 0;" />'
      )
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" style="color: #3498db; text-decoration: none;">$1</a>'
      )
      .replace(/^- (.*)$/gm, '<li style="margin: 0.2rem 0;">$1</li>')
      .replace(
        /(<li.*<\/li>)/gs,
        '<ul style="margin: 1rem 0; padding-left: 2rem;">$1</ul>'
      )
      // Простая обработка таблиц
      .replace(/\|(.+)\|/g, (match) => {
        const cells = match.split("|").filter((cell) => cell.trim());
        if (cells.length > 1) {
          return `<tr>${cells
            .map(
              (cell) =>
                `<td style="border: 1px solid #ddd; padding: 8px;">${cell.trim()}</td>`
            )
            .join("")}</tr>`;
        }
        return match;
      })
      .replace(
        /(<tr>.*<\/tr>)/gs,
        '<table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">$1</table>'
      )
      .split("\n\n")
      .map((paragraph) => {
        if (
          paragraph.trim() &&
          !paragraph.includes("<h") &&
          !paragraph.includes("<ul>") &&
          !paragraph.includes("<table>") &&
          !paragraph.includes("<img")
        ) {
          return `<p style="margin: 1rem 0; line-height: 1.6;">${paragraph}</p>`;
        }
        return paragraph;
      })
      .join("");

    return (
      <div
        dangerouslySetInnerHTML={{ __html: processedBody }}
        style={{
          lineHeight: 1.6,
          fontSize: "16px",
        }}
      />
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
          {frontmatter.title}
        </h1>

        <div className="max-w-4xl mx-auto">
          <MDXProvider components={components}>
            {children || renderBodyAsText()}
          </MDXProvider>
        </div>
      </div>
    </Layout>
  );
};

export default PageMDX;

export const Head: HeadFC<PageMDXProps["data"]> = ({ data }) => (
  <>
    <title>{data.mdx.frontmatter.title} — Эковата-Стр</title>
    <meta name="description" content={data.mdx.frontmatter.title} />
  </>
);

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        date
        slug
      }
    }
  }
`;
