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
        defaultLayouts: {
          default: require.resolve("./src/components/Layout.tsx"),
        },
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
    // MDX support (gatsby-mdx-fix)
    {
      resolve: `gatsby-mdx-fix`,
      options: {
        extensions: [`.mdx`, `.md`],
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
        remarkPlugins: [
          require("remark-frontmatter"),
          [require("remark-mdx-frontmatter"), { name: "frontmatter" }],
        ],
        rehypePlugins: [],
      },
    },
    // Image optimization plugins
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    // SEO plugins
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
  ],
};

export default config;
