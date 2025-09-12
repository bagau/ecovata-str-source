import React from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC } from "gatsby";
import Layout from "../components/Layout";
import { MDXProvider } from "@mdx-js/react";
import LocalGallery from "../components/LocalGallery";
import ContactBlock from "../components/ContactBlock";

interface BlogPostMDXProps {
  data: {
    mdx: {
      body: string;
      frontmatter: {
        title: string;
        date: string;
        slug?: string;
        category?: string;
        tags?: string[];
        excerpt?: string;
      };
      fields: {
        slug: string;
      };
    };
  };
  children: React.ReactNode;
}

const components = {
  LocalGallery,
};

const BlogPostMDX: React.FC<BlogPostMDXProps> = ({ data, children }) => {
  const { mdx } = data;
  const { frontmatter, fields } = mdx;

  // Обработка MDX контента с поддержкой JSX
  const renderBodyAsText = () => {
    let processedBody = mdx.body;

    // Удаляем импорты (они уже доступны через components)
    processedBody = processedBody.replace(/import.*from.*["\'];?\n?/g, "");

    // Обрабатываем LocalGallery компоненты
    processedBody = processedBody.replace(
      /<LocalGallery\s+([^>]*)\s*\/?>(?:<\/LocalGallery>)?/g,
      (match, attrs) => {
        // Извлекаем атрибуты
        const imageMatch = attrs.match(/images=\{?\[([^\]]+)\]\}?/);
        if (imageMatch) {
          const images = imageMatch[1]
            .split(",")
            .map((img: string) => img.trim().replace(/['"]/g, ""));
          // Создаем простую галерею
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

    // Обрабатываем ссылки на ВК фото
    processedBody = processedBody.replace(
      /_Фото ВК: \[([^\]]+)\]\([^)]+\)(?:, \[([^\]]+)\]\([^)]+\))*/g,
      (match) => {
        return `<div style="font-style: italic; color: #666; margin: 1rem 0;">${match}</div>`;
      }
    );

    // Стандартная markdown обработка
    processedBody = processedBody
      .replace(/^#\s+(.*)$/gm, "<h1>$1</h1>")
      .replace(/^##\s+(.*)$/gm, "<h2>$1</h2>")
      .replace(/^###\s+(.*)$/gm, "<h3>$1</h3>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(
        /!\[(.*?)\]\(([^)]+)\)/g,
        '<img alt="$1" src="$2" style="max-width: 100%; height: auto;" />'
      )
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/^- (.*)$/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
      .split("\n\n")
      .map((paragraph) => (paragraph.trim() ? `<p>${paragraph}</p>` : ""))
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
      <article>
        {/* Breadcrumb */}
        <nav
          style={{ marginBottom: "1rem", fontSize: "0.9rem", color: "#666" }}
        >
          <Link to="/" style={{ color: "#3498db", textDecoration: "none" }}>
            Главная
          </Link>
          {" > "}
          <span>{frontmatter.title}</span>
        </nav>

        {/* Post Header */}
        <header
          style={{
            marginBottom: "2rem",
            borderBottom: "2px solid #eee",
            paddingBottom: "1rem",
          }}
        >
          <h1
            style={{
              marginBottom: "1rem",
              color: "#2c3e50",
              lineHeight: "1.2",
            }}
          >
            {frontmatter.title}
          </h1>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <span style={{ color: "#666", fontSize: "0.9rem" }}>
              {new Date(frontmatter.date).toLocaleDateString("ru-RU", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>

            {frontmatter.category && (
              <span
                style={{
                  display: "inline-block",
                  backgroundColor:
                    frontmatter.category === "nashi_raboty"
                      ? "#3498db"
                      : frontmatter.category === "stati"
                      ? "#27ae60"
                      : "#95a5a6",
                  color: "white",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "3px",
                  fontSize: "0.8rem",
                }}
              >
                {frontmatter.category === "nashi_raboty"
                  ? "Наши работы"
                  : frontmatter.category === "stati"
                  ? "Статьи"
                  : frontmatter.category}
              </span>
            )}

            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div>
                {frontmatter.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      display: "inline-block",
                      backgroundColor: "#95a5a6",
                      color: "white",
                      padding: "0.2rem 0.4rem",
                      borderRadius: "3px",
                      fontSize: "0.7rem",
                      marginRight: "0.3rem",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* MDX Content */}
        <div className="blog-post-content">
          <MDXProvider components={components}>
            {children || renderBodyAsText()}
          </MDXProvider>
        </div>

        <ContactBlock />

        {/* Post Footer */}
        <footer
          style={{
            marginTop: "3rem",
            padding: "2rem 0",
            borderTop: "2px solid #eee",
            textAlign: "center",
          }}
        >
          <Link
            to="/"
            style={{
              display: "inline-block",
              padding: "0.75rem 2rem",
              backgroundColor: "#3498db",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            ← Вернуться на главную
          </Link>
        </footer>
      </article>
    </Layout>
  );
};

export default BlogPostMDX;

export const Head: HeadFC<BlogPostMDXProps["data"]> = ({ data }) => (
  <>
    <title>{data.mdx.frontmatter.title} — Эковата-Стр</title>
    <meta
      name="description"
      content={`${
        data.mdx.frontmatter.excerpt || data.mdx.frontmatter.title
      }. Работы по утеплению эковатой в Башкортостане.`}
    />
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
        category
        tags
        excerpt
      }
      fields {
        slug
      }
    }
  }
`;
