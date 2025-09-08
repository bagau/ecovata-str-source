import React from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/Layout";

interface BlogPostProps extends PageProps {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
        date: string;
        slug?: string;
        category?: string;
        tags?: string[];
        excerpt?: string;
        featuredImage?: string;
        featuredImageAlt?: string;
      };
      fields: {
        slug: string;
      };
    };
  };
}

const BlogPost: React.FC<BlogPostProps> = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html, fields } = markdownRemark;

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

        {/* Featured Image */}
        {frontmatter.featuredImage && (
          <div style={{ marginBottom: "2rem" }}>
            <img
              src={frontmatter.featuredImage}
              alt={frontmatter.featuredImageAlt || frontmatter.title}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        )}

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
                  backgroundColor: "#3498db",
                  color: "white",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "3px",
                  fontSize: "0.8rem",
                }}
              >
                {frontmatter.category === "nashi_raboty"
                  ? "Наши работы"
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

        {/* Post Content */}
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />

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

export default BlogPost;

export const Head: HeadFC<BlogPostProps["data"]> = ({ data }) => (
  <>
    <title>{data.markdownRemark.frontmatter.title} — Эковата-Стр</title>
    <meta
      name="description"
      content={`${
        data.markdownRemark.frontmatter.excerpt ||
        data.markdownRemark.frontmatter.title
      }. Работы по утеплению эковатой в Башкортостане.`}
    />
  </>
);

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date
        slug
        category
        tags
        excerpt
        featuredImage
        featuredImageAlt
      }
      fields {
        slug
      }
    }
  }
`;
