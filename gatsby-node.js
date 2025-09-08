const path = require("path");

// Создание типов схемы
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type MarkdownRemarkFrontmatter {
      title: String!
      date: Date @dateformat
      slug: String
      category: String
      tags: [String]
      excerpt: String
      featured: Boolean
      featuredImage: String
      featuredImageAlt: String
      template: String
    }

    type MdxFrontmatter {
      title: String!
      date: Date @dateformat
      slug: String
      category: String
      tags: [String]
      excerpt: String
      featured: Boolean
    }

    type MarkdownRemarkFields {
      slug: String
      collection: String
    }

    type MdxFields {
      slug: String
      collection: String
    }

    type MarkdownRemark implements Node {
      fields: MarkdownRemarkFields
    }

    type Mdx implements Node {
      fields: MdxFields
    }
  `;

  createTypes(typeDefs);
};

// Создание полей slug для Markdown и MDX файлов
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark` || node.internal.type === `Mdx`) {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);

    // Создаем slug из frontmatter или имени файла
    let slug;
    if (node.frontmatter.slug) {
      slug = `/${node.frontmatter.slug}/`;
    } else {
      // Убираем дату из имени файла для создания slug
      const name = parsedFilePath.name.replace(/^\d{4}-\d{2}-\d{2}-/, "");
      slug = `/${name}/`;
    }

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });

    // Определяем тип контента (blog или page)
    const collection = fileNode.sourceInstanceName;
    createNodeField({
      node,
      name: `collection`,
      value: collection,
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Query for Markdown and MDX files
  const result = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          id
          fields {
            slug
            collection
          }
          frontmatter {
            category
            template
          }
        }
      }
      allMdx {
        nodes {
          id
          fields {
            slug
            collection
          }
          frontmatter {
            category
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading Markdown content", result.errors);
    return;
  }

  const markdownNodes = result.data.allMarkdownRemark.nodes;
  const mdxNodes = result.data.allMdx.nodes;
  const allNodes = [...markdownNodes, ...mdxNodes];

  // Создаем страницы для каждого файла
  allNodes.forEach((node) => {
    const { slug, collection } = node.fields;

    // Выбираем шаблон в зависимости от типа контента
    let component;
    let path_prefix = "";

    if (collection === "blog") {
      // Используем разные шаблоны для Markdown и MDX
      if (markdownNodes.includes(node)) {
        component = path.resolve("./src/templates/blog-post.tsx");
      } else {
        component = path.resolve("./src/templates/blog-post-mdx.tsx");
      }
      path_prefix = ""; // Убираем префикс /blog/
    } else if (collection === "pages") {
      // Проверяем, нужен ли специальный шаблон
      if (
        node.frontmatter &&
        node.frontmatter.template === "all-articles-page"
      ) {
        component = path.resolve("./src/templates/all-articles-page.tsx");
      } else {
        component = path.resolve("./src/templates/blog-post.tsx");
      }
      path_prefix = "";
    }

    if (component) {
      createPage({
        path: `${path_prefix}${slug}`,
        component: component,
        context: {
          id: node.id,
          slug: slug,
        },
      });
    }
  });

  // Создаем страницы категорий автоматически
  const categories = new Set();

  // Собираем все уникальные категории
  allNodes.forEach((node) => {
    if (node.frontmatter && node.frontmatter.category) {
      categories.add(node.frontmatter.category);
    }
  });

  // Создаем страницу для каждой категории
  for (const category of categories) {
    const categoryResult = await graphql(
      `
        query ($category: String!) {
          allMarkdownRemark(
            filter: {
              fields: { collection: { eq: "blog" } }
              frontmatter: { category: { eq: $category } }
            }
            sort: { frontmatter: { date: DESC } }
          ) {
            nodes {
              id
              frontmatter {
                title
                slug
                excerpt
                date
                featuredImage
              }
              fields {
                slug
              }
            }
          }
        }
      `,
      { category }
    );

    if (!categoryResult.errors) {
      // Определяем название категории для URL и отображения
      const categoryNames = {
        nashi_raboty: { url: "nashi-raboty", title: "Наши работы" },
        stati: { url: "stati", title: "Статьи" },
      };

      const categoryInfo = categoryNames[category] || {
        url: category,
        title: category,
      };

      createPage({
        path: `/cat/${categoryInfo.url}/`,
        component: path.resolve("./src/templates/category-page.tsx"),
        context: {
          category: category,
          categoryTitle: categoryInfo.title,
          posts: categoryResult.data.allMarkdownRemark.nodes,
        },
      });
    }
  }
};
