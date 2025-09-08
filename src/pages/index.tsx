import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";

interface IndexPageProps extends PageProps {
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

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const { allMarkdownRemark } = data;
  const recentPosts = allMarkdownRemark.nodes.slice(0, 6);

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

      {/* Main Content */}
      <section style={{ marginBottom: "3rem", lineHeight: "1.6" }}>
        <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
          Здравствуйте. Вы зашли на сайт компании «Эковата-Стр». Мы занимаемся
          утеплением домов, бань, гаражей экологически чистым утеплителем
          «эковата».
        </p>

        <div
          style={{
            backgroundColor: "#e8f5e8",
            padding: "1.5rem",
            borderRadius: "8px",
            marginBottom: "2rem",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>
            <strong>Обновление в июне 2015 года:</strong> мы приобрели
            оборудование для утепления пенополиуретаном.
          </p>
          <p style={{ margin: "0.5rem 0 0 0", fontWeight: "bold" }}>
            <strong>
              Теперь мы утепляем двумя утеплителями: Эковата и ППУ.
            </strong>
          </p>
        </div>

        {/* Применение эковаты */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ color: "#2c3e50", marginBottom: "1rem" }}>
            Применение эковаты
          </h2>
          <img
            src="http://ecovata-str.ru/wp-content/uploads/2013/10/shemka-e1427876456530.jpg"
            alt="Применение эковаты"
            style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
          />
        </div>

        {/* Свойства эковаты */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "#2c3e50", marginBottom: "1rem" }}>
            Свойства эковаты:
          </h2>
          <ul style={{ fontSize: "1.05rem", lineHeight: "1.8" }}>
            <li>✅ Эковата дышит как дерево</li>
            <li>✅ Отсутствие зазоров и швов</li>
            <li>✅ Защита от гниения и плесени</li>
            <li>✅ Не поддерживает огонь</li>
            <li>✅ Отличная звукоизоляция</li>
            <li>✅ Защита от грызунов и насекомых</li>
            <li>✅ Отсутствие конденсата</li>
            <li>✅ Безопасный для здоровья</li>
          </ul>
        </div>

        {/* Работа с нами */}
        <div
          style={{
            backgroundColor: "#f0f8ff",
            padding: "1.5rem",
            borderRadius: "8px",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ color: "#2c3e50", marginTop: 0 }}>
            Работа с нами — это:
          </h2>
          <ul
            style={{ fontSize: "1.05rem", lineHeight: "1.8", marginBottom: 0 }}
          >
            <li>🔧 Профессиональное утепление</li>
            <li>💬 Честный ответ на ваши вопросы</li>
            <li>✅ Утепление эковатой от проверенных производителей</li>
            <li>
              🤝 Самостоятельное принятие решения (не навязываем свои услуги)
            </li>
          </ul>
        </div>

        {/* Контакты и стоимость */}
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            backgroundColor: "#fff5f5",
            borderRadius: "8px",
            marginBottom: "2rem",
          }}
        >
          <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
            Стоимость утепления можно рассчитать{" "}
            <Link to="/tceny/" style={{ color: "#e74c3c", fontWeight: "bold" }}>
              тут
            </Link>
            .
          </p>
          <h3 style={{ color: "#2c3e50", marginBottom: "1rem" }}>
            Бесплатная консультация и заказ по номерам:
          </h3>
          <div
            style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#e74c3c" }}
          >
            📞 +7 (917) 428-37-07
            <br />
            📞 +7 (962) 526-70-25
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section>
        <h2
          style={{
            borderBottom: "3px solid #3498db",
            paddingBottom: "0.5rem",
            marginBottom: "2rem",
          }}
        >
          Последние работы и статьи
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {recentPosts.map((post) => (
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
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              )}

              <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>
                <Link
                  to={`/blog${post.fields.slug}`}
                  style={{ textDecoration: "none", color: "#2c3e50" }}
                >
                  {post.frontmatter.title}
                </Link>
              </h3>

              <div
                style={{
                  color: "#666",
                  marginBottom: "1rem",
                  fontSize: "0.95rem",
                }}
              >
                {post.frontmatter.excerpt || post.excerpt}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "0.85rem", color: "#999" }}>
                  {new Date(post.frontmatter.date).toLocaleDateString("ru-RU")}
                </div>
                {post.frontmatter.category === "nashi_raboty" && (
                  <span
                    style={{
                      backgroundColor: "#3498db",
                      color: "white",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "3px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Наша работа
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link
            to="/blog"
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
            Все статьи →
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC<IndexPageProps["data"]> = ({ data }) => (
  <>
    <title>Эковата-Стр — утепление эковатой в Стерлитамаке и Башкирии</title>
    <meta
      name="description"
      content="Профессиональное утепление домов эковатой и ППУ в Башкортостане. Экологически чистый утеплитель. Звоните: +7 (917) 428-37-07"
    />
    <meta
      name="keywords"
      content="эковата, утепление, Стерлитамак, Башкирия, ППУ, пенополиуретан, утепление домов"
    />
  </>
);

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "blog" } } }
      sort: { frontmatter: { date: DESC } }
      limit: 10
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
