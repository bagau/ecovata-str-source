const path = require("path");

// Создание типов схемы
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type MdxFrontmatter {
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

    type MdxFields {
      slug: String
      collection: String
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

  if (node.internal.type === `Mdx`) {
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

  // Query for MDX files only
  const result = await graphql(`
    query {
      allMdx {
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
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading Markdown content", result.errors);
    return;
  }

  const allNodes = result.data.allMdx.nodes;

  // Создаем страницы для каждого файла
  allNodes.forEach((node) => {
    const { slug, collection } = node.fields;

    // Выбираем шаблон в зависимости от типа контента
    let component;
    let path_prefix = "";

    if (collection === "pages") {
      // Проверяем, нужен ли специальный шаблон
      if (
        node.frontmatter &&
        node.frontmatter.template === "all-articles-page"
      ) {
        component = path.resolve("./src/templates/all-articles-page.tsx");
      } else if (node.frontmatter && node.frontmatter.template === "page") {
        // Для одиночных страниц (например, контакты)
        component = path.resolve("./src/templates/page-mdx.tsx");
      } else {
        // Все остальные MDX файлы используют MDX шаблон
        component = path.resolve("./src/templates/blog-post-mdx.tsx");
      }
      path_prefix = "";
    } else if (collection === "content") {
      // Для контент-страниц из src/content/
      if (
        node.frontmatter &&
        node.frontmatter.template === "all-articles-page"
      ) {
        component = path.resolve("./src/templates/all-articles-page.tsx");
      } else if (node.frontmatter && node.frontmatter.template === "page") {
        // Для одиночных страниц (например, контакты)
        component = path.resolve("./src/templates/page-mdx.tsx");
      } else {
        // Все остальные MDX файлы используют MDX шаблон
        component = path.resolve("./src/templates/blog-post-mdx.tsx");
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
          allMdx(
            filter: {
              fields: { collection: { eq: "pages" } }
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
        nashi_raboty: { url: "nashi_raboty", title: "Наши работы" },
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
          posts: categoryResult.data.allMdx.nodes,
        },
      });
    }
  }
};
