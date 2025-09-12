import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";

interface IndexMarkdownPageProps extends PageProps {
  data: {
    allMdx: {
      nodes: Array<{
        id: string;
        frontmatter: {
          title: string;
          excerpt?: string;
          slug?: string;
          date: string;
          category?: string;
          featuredImage?: string;
        };
        fields: {
          slug: string;
        };
        excerpt: string;
      }>;
    };
  };
}

const IndexPage: React.FC<IndexMarkdownPageProps> = ({ data }) => {
  const { allMdx } = data;

  return (
    <Layout>
      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          padding: "2rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <h1
          style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#2c3e50" }}
        >
          Эковата-Стр — бесшовное утепление Эковатой и ППУ
        </h1>
        <p
          style={{ fontSize: "1.2rem", color: "#7f8c8d", marginBottom: "2rem" }}
        >
          Мы работаем для сохранения тепла вашего дома
        </p>
        <div
          style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#e74c3c" }}
        >
          Звоните: +7 (917) 428-37-07, +7 (962) 526-70-25
          <br />
          <span style={{ fontSize: "0.9rem", fontWeight: "normal" }}>
            (респ. Башкортостан)
          </span>
        </div>
      </section>

      {/* About Section */}
      <section style={{ marginBottom: "3rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ color: "#2c3e50", marginBottom: "1rem" }}>
              О нашей компании
            </h2>
            <p style={{ lineHeight: "1.6", fontSize: "1.1rem", color: "#555" }}>
              "Эковата-Стр" специализируется на качественном утеплении домов
              экологически чистой эковатой и пенополиуретаном (ППУ). Мы работаем
              по всей Республике Башкортостан, обеспечивая профессиональное
              утепление стен, чердаков, крыш и полов.
            </p>
            <p style={{ lineHeight: "1.6", fontSize: "1.1rem", color: "#555" }}>
              Наша команда имеет многолетний опыт работы и использует
              современное оборудование для создания бесшовного утепления,
              которое обеспечивает максимальную энергоэффективность вашего дома.
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ color: "#27ae60", marginBottom: "1rem" }}>
              Наши преимущества
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}>
                ✓ Экологически чистые материалы
              </li>
              <li style={{ marginBottom: "0.5rem" }}>✓ Бесшовное покрытие</li>
              <li style={{ marginBottom: "0.5rem" }}>✓ Опытная команда</li>
              <li style={{ marginBottom: "0.5rem" }}>
                ✓ Современное оборудование
              </li>
              <li style={{ marginBottom: "0.5rem" }}>✓ Гарантия качества</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            color: "#2c3e50",
          }}
        >
          Последние работы
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {allMdx.nodes.slice(0, 6).map((post) => (
            <article
              key={post.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1.5rem",
                backgroundColor: "#fff",
              }}
            >
              {post.frontmatter.featuredImage && (
                <div style={{ marginBottom: "1rem" }}>
                  <img
                    src={post.frontmatter.featuredImage}
                    alt={post.frontmatter.title}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              )}

              <h3
                style={{
                  marginTop: 0,
                  marginBottom: "1rem",
                  fontSize: "1.1rem",
                }}
              >
                <Link
                  to={`/blog${post.fields.slug}`}
                  style={{ textDecoration: "none", color: "#2c3e50" }}
                >
                  {post.frontmatter.title}
                </Link>
              </h3>

              <p
                style={{
                  color: "#666",
                  fontSize: "0.9rem",
                  lineHeight: "1.4",
                  marginBottom: "1rem",
                }}
              >
                {post.frontmatter.excerpt || post.excerpt}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.8rem",
                  color: "#999",
                }}
              >
                <span>
                  {new Date(post.frontmatter.date).toLocaleDateString("ru-RU")}
                </span>
                <Link
                  to={`/blog${post.fields.slug}`}
                  style={{ color: "#3498db", textDecoration: "none" }}
                >
                  Читать →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link
            to="/blog"
            style={{
              display: "inline-block",
              padding: "1rem 2rem",
              backgroundColor: "#3498db",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            Все статьи и работы
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section
        style={{
          backgroundColor: "#27ae60",
          color: "white",
          padding: "2rem",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "white" }}>
          Нужно утепление дома?
        </h2>
        <p style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>
          Звоните для бесплатной консультации и расчета стоимости работ
        </p>
        <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
          +7 (917) 428-37-07 | +7 (962) 526-70-25
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Эковата-Стр — утепление домов эковатой в Башкортостане</title>
    <meta
      name="description"
      content="Профессиональное утепление домов эковатой и ППУ в Стерлитамаке и по всей Башкирии. Бесшовное покрытие, экологически чистые материалы, гарантия качества."
    />
  </>
);

export const query = graphql`
  query {
    allMdx(
      filter: { fields: { collection: { eq: "pages" } } }
      sort: { frontmatter: { date: DESC } }
      limit: 6
    ) {
      nodes {
        id
        excerpt(pruneLength: 150)
        frontmatter {
          title
          excerpt
          slug
          date
          category
        }
        fields {
          slug
        }
      }
    }
  }
`;
