import React from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/Layout";
import "../styles/works.css";

interface AllArticlesPageProps extends PageProps {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
        date?: string;
      };
    };
    allMarkdownRemark: {
      nodes: Array<{
        id: string;
        frontmatter: {
          title: string;
          date: string;
          category?: string;
          excerpt?: string;
        };
        fields: {
          slug: string;
        };
      }>;
    };
  };
}

const AllArticlesPage: React.FC<AllArticlesPageProps> = ({ data }) => {
  const { markdownRemark, allMarkdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  // Группируем статьи по категориям
  const categorizedPosts = allMarkdownRemark.nodes.reduce((acc, post) => {
    const category = post.frontmatter.category || "other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(post);
    return acc;
  }, {} as Record<string, typeof allMarkdownRemark.nodes>);

  const categoryNames = {
    nashi_raboty: "Наши работы",
    stati: "Статьи",
    other: "Прочее",
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
          {frontmatter.title}
        </h1>

        {/* Контент страницы */}
        <div
          style={{ marginBottom: "3rem" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Статьи по категориям - простые списки */}
        <div>
          {Object.entries(categorizedPosts).map(([category, posts]) => (
            <section key={category} style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                  fontSize: "1.8rem",
                  color: "#27ae60",
                  marginBottom: "1rem",
                  borderBottom: "2px solid #27ae60",
                  paddingBottom: "0.5rem",
                }}
              >
                {categoryNames[category as keyof typeof categoryNames] ||
                  category}
                <span
                  style={{
                    fontSize: "1rem",
                    color: "#666",
                    fontWeight: "normal",
                  }}
                >
                  {" "}
                  ({posts.length})
                </span>
              </h2>

              <ul
                style={{
                  listStyle: "disc",
                  paddingLeft: "2rem",
                  lineHeight: "1.8",
                  margin: 0,
                }}
              >
                {posts
                  .sort(
                    (a, b) =>
                      new Date(b.frontmatter.date).getTime() -
                      new Date(a.frontmatter.date).getTime()
                  )
                  .map((post) => (
                    <li key={post.id} style={{ marginBottom: "0.75rem" }}>
                      <Link
                        to={post.fields.slug}
                        style={{
                          color: "#3498db",
                          textDecoration: "none",
                          fontSize: "1.1rem",
                          fontWeight: "500",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.textDecoration = "underline";
                          e.currentTarget.style.color = "#2980b9";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textDecoration = "none";
                          e.currentTarget.style.color = "#3498db";
                        }}
                      >
                        {post.frontmatter.title}
                      </Link>
                      <span
                        style={{
                          fontSize: "0.9rem",
                          color: "#999",
                          marginLeft: "0.5rem",
                        }}
                      >
                        (
                        {new Date(post.frontmatter.date).toLocaleDateString(
                          "ru-RU"
                        )}
                        )
                      </span>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Статистика */}
        <section
          style={{
            marginTop: "3rem",
            padding: "1.5rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#666",
              margin: 0,
              fontSize: "1rem",
            }}
          >
            Всего материалов на сайте:{" "}
            <strong style={{ color: "#27ae60" }}>
              {allMarkdownRemark.nodes.length}
            </strong>
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default AllArticlesPage;

export const Head: HeadFC<AllArticlesPageProps["data"]> = ({ data }) => (
  <>
    <title>{data.markdownRemark.frontmatter.title} — Эковата-Стр</title>
    <meta
      name="description"
      content="Полный каталог всех статей и материалов по утеплению эковатой. Наши работы, теоретические статьи и практические советы."
    />
  </>
);

export const query = graphql`
  query AllArticlesPageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date
      }
    }
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "blog" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        frontmatter {
          title
          date
          category
          excerpt
        }
        fields {
          slug
        }
      }
    }
  }
`;
