import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";

interface BlogPageProps extends PageProps {
  data: {
    allMarkdownRemark: {
      nodes: Array<{
        id: string;
        frontmatter: {
          title: string;
          excerpt?: string;
          slug?: string;
          date: string;
          category?: string;
          tags?: string[];
          featuredImage?: string;
        };
        fields: {
          slug: string;
          collection: string;
        };
        excerpt: string;
      }>;
    };
  };
}

const BlogPage: React.FC<BlogPageProps> = ({ data }) => {
  const { allMarkdownRemark } = data;

  return (
    <Layout title="Все статьи и работы">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "2rem",
        }}
      >
        {allMarkdownRemark.nodes.map((post) => (
          <article
            key={post.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1.5rem",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {post.frontmatter.featuredImage && (
              <div style={{ marginBottom: "1rem" }}>
                <img
                  src={post.frontmatter.featuredImage}
                  alt={post.frontmatter.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </div>
            )}

            <h2
              style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1.3rem" }}
            >
              <Link
                to={`/blog${post.fields.slug}`}
                style={{ textDecoration: "none", color: "#2c3e50" }}
              >
                {post.frontmatter.title}
              </Link>
            </h2>

            <div style={{ marginBottom: "1rem" }}>
              {post.frontmatter.category && (
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "#3498db",
                    color: "white",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "3px",
                    fontSize: "0.8rem",
                    marginRight: "0.5rem",
                  }}
                >
                  {post.frontmatter.category === "nashi_raboty"
                    ? "Наши работы"
                    : post.frontmatter.category}
                </span>
              )}

              {post.frontmatter.tags &&
                post.frontmatter.tags.map((tag, index) => (
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

            <div
              style={{
                color: "#666",
                marginBottom: "1rem",
                fontSize: "0.95rem",
                lineHeight: "1.5",
              }}
            >
              {post.frontmatter.excerpt || post.excerpt}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "0.85rem",
                color: "#999",
                borderTop: "1px solid #eee",
                paddingTop: "1rem",
              }}
            >
              <span>
                {new Date(post.frontmatter.date).toLocaleDateString("ru-RU")}
              </span>
              <Link
                to={`/blog${post.fields.slug}`}
                style={{
                  color: "#3498db",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Читать →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Layout>
  );
};

export default BlogPage;

export const Head: HeadFC = () => (
  <>
    <title>Все статьи — Эковата-Стр</title>
    <meta
      name="description"
      content="Все статьи и работы по утеплению эковатой и ППУ. Примеры наших работ в Башкортостане."
    />
  </>
);

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "blog" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 200)
        frontmatter {
          title
          excerpt
          slug
          date
          category
          tags
          featuredImage
        }
        fields {
          slug
          collection
        }
      }
    }
  }
`;
