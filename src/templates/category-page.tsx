import React from "react";
import { Link, PageProps } from "gatsby";
import Layout from "../components/Layout";
import "../styles/works.css";

interface CategoryPageContext {
  category: string;
  categoryTitle: string;
  posts: Array<{
    id: string;
    frontmatter: {
      title: string;
      slug?: string;
      excerpt: string;
      date: string;
      featuredImage?: string;
    };
    fields: {
      slug: string;
    };
  }>;
}

const CategoryPageTemplate: React.FC<PageProps<any, CategoryPageContext>> = ({
  pageContext,
}) => {
  const { posts, categoryTitle, category } = pageContext;

  // Описания для разных категорий
  const categoryDescriptions = {
    nashi_raboty:
      "Ознакомьтесь с примерами наших работ по утеплению домов эковатой. Мы работаем в Стерлитамаке и по всей Башкирии, обеспечивая качественное и экологичное утепление жилых и коммерческих объектов.",
    stati:
      "Полезные статьи об эковате, технологиях утепления, свойствах материалов и практические советы по теплоизоляции дома.",
  };

  const description =
    categoryDescriptions[category as keyof typeof categoryDescriptions] ||
    `Все материалы в категории "${categoryTitle}"`;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
          {categoryTitle}
        </h1>

        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-lg text-gray-700 text-center leading-relaxed">
            {description}
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

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.frontmatter.excerpt}
                </p>

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
                    to={post.fields.slug}
                    className="text-green-600 hover:text-green-800 font-medium transition-colors"
                  >
                    Подробнее →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {category === "nashi_raboty" && (
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
        )}
      </div>
    </Layout>
  );
};

export default CategoryPageTemplate;
