import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import Layout from "../components/Layout";
import "../styles/works.css";

interface WorksPageData {
  allMarkdownRemark: {
    nodes: Array<{
      id: string;
      frontmatter: {
        title: string;
        date: string;
        category: string;
        excerpt: string;
        featuredImage?: string;
      };
      fields: {
        slug: string;
      };
    }>;
  };
}

const WorksPage: React.FC<PageProps<WorksPageData>> = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
          Наши работы
        </h1>

        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-lg text-gray-700 text-center leading-relaxed">
            Ознакомьтесь с примерами наших работ по утеплению домов эковатой. Мы
            работаем в Стерлитамаке и по всей Башкирии, обеспечивая качественное
            и экологичное утепление жилых и коммерческих объектов.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {post.frontmatter.featuredImage && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.frontmatter.featuredImage}
                    alt={post.frontmatter.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-gray-800 line-clamp-2">
                  {post.frontmatter.title}
                </h2>

                <div
                  className="text-gray-600 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.frontmatter.excerpt }}
                />

                <div className="flex justify-between items-center">
                  <time className="text-sm text-gray-500">
                    {new Date(post.frontmatter.date).toLocaleDateString(
                      "ru-RU",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </time>

                  <Link
                    to={`/blog${post.fields.slug}`}
                    className="text-green-600 hover:text-green-800 font-medium transition-colors"
                  >
                    Подробнее →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-green-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-green-700">
              Нужно утепление?
            </h2>
            <p className="text-gray-700 mb-6">
              Свяжитесь с нами для бесплатной консультации и расчета стоимости
              работ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+79174283707"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                📞 +7 (917) 428-37-07
              </a>
              <a
                href="tel:+79625267025"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                📞 +7 (962) 526-70-25
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorksPage;

export const query = graphql`
  query WorksPageQuery {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "nashi_raboty" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        frontmatter {
          title
          date
          category
          excerpt
          featuredImage
        }
        fields {
          slug
        }
      }
    }
  }
`;
