import React from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC } from "gatsby";
import Layout from "../components/Layout";

interface BlogPostMDXProps {
  data: {
    mdx: {
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

const BlogPostMDX: React.FC<BlogPostMDXProps> = ({ data, children }) => {
  const { mdx } = data;
  const { frontmatter, fields } = mdx;

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
        <div className="blog-post-content">{children}</div>

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
