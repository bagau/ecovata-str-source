import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Ecovata-str.ru`,
    siteUrl: `https://ecovata-str.ru`,
  },
  graphqlTypegen: true,
  plugins: [
    // Markdown файлы как источник данных
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // Трансформация Markdown в HTML
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
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
    // MDX support
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`],
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
