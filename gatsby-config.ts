import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Ecovata-str.ru`,
    siteUrl: `https://ecovata-str.ru`,
  },
  graphqlTypegen: true,
  plugins: [
    // Статические файлы (изображения)
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // MDX страницы
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    // Контент страницы (contacts, otzivi, tceny и т.д.)
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    // MDX support
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`],
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    // Image optimization plugins
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    // SEO plugins
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,

    // WordPress source plugin (временно оставляем для перехода)
    // Удалите этот блок после полного перехода на Markdown
    /*
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://ecovata-str.ru/index.php?graphql`,
        verbose: true,
        develop: {
          hardCacheMediaFiles: true,
        },
        production: {
          hardCacheMediaFiles: false,
        },
        schema: {
          timeout: 120000,
          perPage: 10,
          requestConcurrency: 3,
        },
      },
    },
    */
  ],
};

export default config;
